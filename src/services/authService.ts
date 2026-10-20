import { DemoStudent } from '../types';
import { getItem, setItem, removeItem, KEYS } from './localStorageService';

export interface RegisterPayload {
  fullName: string;
  email: string;
  mobile: string;
  password?: string;
  confirmPassword?: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  student?: DemoStudent;
}

export const authService = {
  getCurrentStudent(): DemoStudent | null {
    return getItem<DemoStudent | null>(KEYS.CURRENT_USER, null);
  },

  getAllStudents(): DemoStudent[] {
    return getItem<DemoStudent[]>(KEYS.STUDENTS, []);
  },

  register(payload: RegisterPayload): AuthResponse {
    const trimmedEmail = payload.email.trim().toLowerCase();
    const trimmedName = payload.fullName.trim();
    const trimmedMobile = payload.mobile.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMobile) {
      return { success: false, message: 'All required fields must be filled out.' };
    }

    if (payload.password && payload.confirmPassword && payload.password !== payload.confirmPassword) {
      return { success: false, message: 'Passwords do not match.' };
    }

    const students = this.getAllStudents();
    const existing = students.find((s) => s.email.toLowerCase() === trimmedEmail);

    if (existing) {
      return { success: false, message: 'A student account with this email already exists in demo storage.' };
    }

    const newStudent: DemoStudent = {
      id: `std_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      fullName: trimmedName,
      email: trimmedEmail,
      mobile: trimmedMobile,
      createdAt: new Date().toISOString(),
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(trimmedName)}&backgroundColor=0b192c,0066ff`,
    };

    // Store in demo student directory (NO passwords stored in LocalStorage for security!)
    setItem(KEYS.STUDENTS, [...students, newStudent]);
    // Create demo active session
    setItem(KEYS.CURRENT_USER, newStudent);
    window.dispatchEvent(new Event('gwpr_auth_change'));

    return {
      success: true,
      message: 'Demo registration successful! Welcome to the GWPR Student Career Portal.',
      student: newStudent,
    };
  },

  login(payload: LoginPayload): AuthResponse {
    const trimmedEmail = payload.email.trim().toLowerCase();
    if (!trimmedEmail) {
      return { success: false, message: 'Please enter your email address.' };
    }

    const students = this.getAllStudents();
    let student = students.find((s) => s.email.toLowerCase() === trimmedEmail);

    // If logging in with the pre-seeded demo account or any existing student:
    if (!student) {
      // In demo mode, if student doesn't exist, we can prompt or create a demo user if desired,
      // but according to prompt requirements, validate properly:
      return {
        success: false,
        message: 'No student found with this email. Please register or use the demo login credentials.',
      };
    }

    setItem(KEYS.CURRENT_USER, student);
    window.dispatchEvent(new Event('gwpr_auth_change'));

    return {
      success: true,
      message: `Welcome back, ${student.fullName}!`,
      student,
    };
  },

  // Helper for quick one-click demo student login
  loginDemoStudent(): AuthResponse {
    const students = this.getAllStudents();
    const demoStudent = students[0];
    if (demoStudent) {
      setItem(KEYS.CURRENT_USER, demoStudent);
      window.dispatchEvent(new Event('gwpr_auth_change'));
      return { success: true, message: `Logged in as Demo Student: ${demoStudent.fullName}`, student: demoStudent };
    }
    return { success: false, message: 'Demo student not found in storage.' };
  },

  logout(): void {
    removeItem(KEYS.CURRENT_USER);
    window.dispatchEvent(new Event('gwpr_auth_change'));
  },

  updateProfile(studentId: string, updates: Partial<Pick<DemoStudent, 'fullName' | 'mobile'>>): boolean {
    const students = this.getAllStudents();
    const index = students.findIndex((s) => s.id === studentId);
    if (index === -1) return false;

    const updated = { ...students[index], ...updates };
    students[index] = updated;
    setItem(KEYS.STUDENTS, students);

    const current = this.getCurrentStudent();
    if (current && current.id === studentId) {
      setItem(KEYS.CURRENT_USER, updated);
      window.dispatchEvent(new Event('gwpr_auth_change'));
    }
    return true;
  },

  // Admin demo session helpers
  isAdminAuthenticated(): boolean {
    return getItem<boolean>(KEYS.ADMIN_AUTH, false);
  },

  setAdminAuthenticated(auth: boolean): void {
    setItem(KEYS.ADMIN_AUTH, auth);
    window.dispatchEvent(new Event('gwpr_admin_change'));
  },
};
