import { CompanyConfig } from '../types';
import { getItem, setItem, KEYS } from './localStorageService';
import { INITIAL_COMPANY_CONFIG } from '../data/initialData';

export const companyConfigService = {
  getConfig(): CompanyConfig {
    const config = getItem<CompanyConfig>(KEYS.CONFIG, INITIAL_COMPANY_CONFIG);
    // dynamically ensure baseUrl matches current window if not customized
    if (typeof window !== 'undefined' && (!config.baseUrl || config.baseUrl.includes('localhost'))) {
      config.baseUrl = window.location.origin;
    }
    return config;
  },

  updateConfig(updates: Partial<CompanyConfig>): CompanyConfig {
    const current = this.getConfig();
    const updated = { ...current, ...updates };
    setItem(KEYS.CONFIG, updated);
    window.dispatchEvent(new Event('gwpr_config_updated'));
    return updated;
  },

  resetConfig(): CompanyConfig {
    setItem(KEYS.CONFIG, INITIAL_COMPANY_CONFIG);
    window.dispatchEvent(new Event('gwpr_config_updated'));
    return INITIAL_COMPANY_CONFIG;
  },
};
