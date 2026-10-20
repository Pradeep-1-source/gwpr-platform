import { Course, DemoStudent, Enrollment, Certificate, CompanyConfig } from '../types';
import {
  INITIAL_COURSES,
  INITIAL_DEMO_STUDENTS,
  INITIAL_ENROLLMENTS,
  INITIAL_CERTIFICATES,
  INITIAL_COMPANY_CONFIG,
} from '../data/initialData';

const KEYS = {
  COURSES: 'gwpr_courses_v1',
  STUDENTS: 'gwpr_students_v1',
  ENROLLMENTS: 'gwpr_enrollments_v1',
  CERTIFICATES: 'gwpr_certificates_v1',
  CONFIG: 'gwpr_config_v1',
  CURRENT_USER: 'gwpr_current_user_v1',
  ADMIN_AUTH: 'gwpr_admin_auth_v1',
};

// Safe LocalStorage helpers with try/catch
export function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`LocalStorage read error for ${key}:`, err);
    return fallback;
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`LocalStorage write error for ${key}:`, err);
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(`LocalStorage remove error for ${key}:`, err);
  }
}

// Initializer to ensure storage has valid seed data on first launch
export function initializeStorageIfEmpty(): void {
  if (!localStorage.getItem(KEYS.COURSES)) {
    setItem(KEYS.COURSES, INITIAL_COURSES);
  }
  if (!localStorage.getItem(KEYS.STUDENTS)) {
    setItem(KEYS.STUDENTS, INITIAL_DEMO_STUDENTS);
  }
  if (!localStorage.getItem(KEYS.ENROLLMENTS)) {
    setItem(KEYS.ENROLLMENTS, INITIAL_ENROLLMENTS);
  }
  if (!localStorage.getItem(KEYS.CERTIFICATES)) {
    setItem(KEYS.CERTIFICATES, INITIAL_CERTIFICATES);
  }
  if (!localStorage.getItem(KEYS.CONFIG)) {
    setItem(KEYS.CONFIG, INITIAL_COMPANY_CONFIG);
  }
}

// Reset all demo data to default clean state
export function resetAllDemoData(): void {
  setItem(KEYS.COURSES, INITIAL_COURSES);
  setItem(KEYS.STUDENTS, INITIAL_DEMO_STUDENTS);
  setItem(KEYS.ENROLLMENTS, INITIAL_ENROLLMENTS);
  setItem(KEYS.CERTIFICATES, INITIAL_CERTIFICATES);
  setItem(KEYS.CONFIG, INITIAL_COMPANY_CONFIG);
  // Keep or log out user
  removeItem(KEYS.CURRENT_USER);
  removeItem(KEYS.ADMIN_AUTH);
  window.dispatchEvent(new Event('gwpr_storage_updated'));
}

export { KEYS };
