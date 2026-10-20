import { createClient, SupabaseClient } from '@supabase/supabase-js';

const STORAGE_KEY = 'gwpr_supabase_config_v1';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export function getStoredSupabaseConfig(): SupabaseConfig {
  // 1. Check environment variables
  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  // 2. Check localStorage (allows user to configure from UI live)
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.url && parsed.anonKey) {
        return { url: parsed.url.trim(), anonKey: parsed.anonKey.trim() };
      }
    }
  } catch (err) {
    console.warn('Error reading stored Supabase config:', err);
  }

  return { url: envUrl.trim(), anonKey: envKey.trim() };
}

export function saveSupabaseConfig(url: string, anonKey: string): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ url: url.trim(), anonKey: anonKey.trim() })
    );
    // Reset client instance
    supabaseInstance = null;
    window.dispatchEvent(new Event('gwpr_supabase_config_changed'));
  } catch (err) {
    console.error('Error saving Supabase config:', err);
  }
}

export function clearSupabaseConfig(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    supabaseInstance = null;
    window.dispatchEvent(new Event('gwpr_supabase_config_changed'));
  } catch (err) {
    console.error('Error clearing Supabase config:', err);
  }
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;

  const config = getStoredSupabaseConfig();
  if (config.url && config.anonKey && config.url.startsWith('http')) {
    try {
      supabaseInstance = createClient(config.url, config.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
      return supabaseInstance;
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return null;
}

export function isSupabaseConnected(): boolean {
  return getSupabase() !== null;
}

export async function testSupabaseConnection(): Promise<{ connected: boolean; message: string; details?: any }> {
  const client = getSupabase();
  if (!client) {
    return {
      connected: false,
      message: 'Supabase URL or Anon Key is missing. Configure them in Admin -> Supabase Database Settings or in .env.',
    };
  }

  try {
    // Attempt a lightweight query against courses or students
    const { data, error } = await client.from('courses').select('id').limit(1);
    if (error) {
      // Table might not be created yet, let's test basic auth/ping
      if (error.code === '42P01') {
        return {
          connected: true,
          message: 'Connected to Supabase project! Note: Tables have not been created yet. Run the SQL schema script in Supabase SQL Editor.',
          details: error,
        };
      }
      return {
        connected: false,
        message: `Supabase query error: ${error.message} (Code: ${error.code})`,
        details: error,
      };
    }
    return {
      connected: true,
      message: `Successfully connected to Supabase! Database responded with ${data?.length || 0} existing records.`,
      details: data,
    };
  } catch (err: any) {
    return {
      connected: false,
      message: `Connection failed: ${err?.message || 'Network error'}`,
    };
  }
}
