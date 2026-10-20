import { Certificate, Enrollment } from '../types';
import { getItem, setItem, KEYS } from './localStorageService';
import { INITIAL_CERTIFICATES, INITIAL_COMPANY_CONFIG } from '../data/initialData';
import { courseService } from './courseService';
import { authService } from './authService';
import { supabaseDataService } from './supabaseDataService';

function generateRandomAlphaNum(length: number): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const certificateService = {
  getAllCertificates(): Certificate[] {
    return getItem<Certificate[]>(KEYS.CERTIFICATES, INITIAL_CERTIFICATES);
  },

  getCertificatesByStudent(studentId: string): Certificate[] {
    const certs = this.getAllCertificates();
    return certs.filter((c) => c.studentId === studentId);
  },

  getCertificateById(id: string): Certificate | undefined {
    if (!id) return undefined;
    const cleanId = id.trim().toUpperCase();
    const certs = this.getAllCertificates();
    return certs.find((c) => c.id.toUpperCase() === cleanId);
  },

  // Async verification querying Supabase Cloud Database first, falling back to LocalStorage
  async verifyCertificate(id: string): Promise<Certificate | undefined> {
    if (!id) return undefined;
    const cleanId = id.trim().toUpperCase();

    // 1. Try Supabase cloud database (allows universal cross-device verification from any phone/laptop)
    try {
      const fromSupabase = await supabaseDataService.getCertificateById(cleanId);
      if (fromSupabase) {
        return fromSupabase;
      }
    } catch (e) {
      console.warn('Supabase certificate check error, falling back to local records:', e);
    }

    // 2. Fallback to LocalStorage
    return this.getCertificateById(cleanId);
  },

  getCertificateForCourse(studentId: string, courseId: string): Certificate | undefined {
    const certs = this.getAllCertificates();
    return certs.find((c) => c.studentId === studentId && c.courseId === courseId);
  },

  generateCertificate(enrollment: Enrollment): { success: boolean; certificate?: Certificate; message: string } {
    if (enrollment.progress < 100 || enrollment.status !== 'Completed') {
      return {
        success: false,
        message: 'Certificate generation requires 100% course completion. Please finish all lessons first.',
      };
    }

    // Check if certificate was already issued for this student & course
    const existing = this.getCertificateForCourse(enrollment.studentId, enrollment.courseId);
    if (existing) {
      return {
        success: true,
        certificate: existing,
        message: 'A certificate has already been generated for this course completion.',
      };
    }

    const course = courseService.getCourseById(enrollment.courseId);
    const students = authService.getAllStudents();
    const student = students.find((s) => s.id === enrollment.studentId);

    if (!course || !student) {
      return {
        success: false,
        message: 'Unable to locate course or student profile records.',
      };
    }

    const config = getItem(KEYS.CONFIG, INITIAL_COMPANY_CONFIG);
    const currentYear = new Date().getFullYear();
    const uniqueSuffix = generateRandomAlphaNum(6);
    const certId = `GWPR-CERT-${currentYear}-${uniqueSuffix}`;

    // Format readable completion date
    const dateObj = enrollment.completionDate ? new Date(enrollment.completionDate) : new Date();
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    // Verification URL pointing to configurable base URL
    const baseUrl = config.baseUrl.replace(/\/$/, '');
    const verificationUrl = `${baseUrl}/verify/${certId}`;

    const newCertificate: Certificate = {
      id: certId,
      studentId: student.id,
      studentName: student.fullName,
      courseId: course.id,
      courseTitle: course.title,
      enrollmentId: enrollment.id,
      completionDate: formattedDate,
      issueDate: formattedDate,
      verificationStatus: 'Valid',
      signatoryName: config.signatoryName || 'Dr. Rajesh Vardhan',
      signatoryTitle: config.signatoryTitle || 'Head of Academics & Technical Certifications',
      companyName: config.companyName || 'GWPR Private Limited',
      verificationUrl,
    };

    const all = this.getAllCertificates();
    setItem(KEYS.CERTIFICATES, [newCertificate, ...all]);
    window.dispatchEvent(new Event('gwpr_certificates_updated'));

    // Asynchronous background sync to Supabase
    supabaseDataService.saveCertificate(newCertificate).catch((err) => {
      console.warn('Background Supabase certificate save failed:', err);
    });

    return {
      success: true,
      certificate: newCertificate,
      message: `Certificate ${newCertificate.id} successfully generated!`,
    };
  },

  updateCertificateStatus(id: string, status: 'Valid' | 'Revoked'): boolean {
    const all = this.getAllCertificates();
    const index = all.findIndex((c) => c.id === id);
    if (index === -1) return false;

    all[index].verificationStatus = status;
    setItem(KEYS.CERTIFICATES, all);
    window.dispatchEvent(new Event('gwpr_certificates_updated'));

    // Sync status change to Supabase
    supabaseDataService.saveCertificate(all[index]).catch(console.warn);
    return true;
  },
};
