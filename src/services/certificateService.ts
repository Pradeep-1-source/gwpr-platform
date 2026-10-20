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

  // Decode and cache certificate data from QR payload if present
  decodePayload(payload: string): Certificate | null {
    try {
      const json = decodeURIComponent(atob(payload));
      const data = JSON.parse(json);
      if (!data.id) return null;

      const cert: Certificate = {
        id: data.id,
        studentId: data.studentId || 'std-verified',
        studentName: data.name || data.studentName || 'Student Recipient',
        courseId: data.courseId || 'course-verified',
        courseTitle: data.course || data.courseTitle || 'GWPR Certified Program',
        enrollmentId: data.enrollmentId || 'enr-verified',
        completionDate: data.completionDate || data.date || 'Completed',
        issueDate: data.issueDate || data.completionDate || 'Issued',
        verificationStatus: (data.status as any) || 'Valid',
        signatoryName: data.signatoryName || 'Dr. Rajesh Vardhan',
        signatoryTitle: data.signatoryTitle || 'Head of Academics & Technical Certifications',
        companyName: data.companyName || 'GWPR Private Limited',
        verificationUrl: typeof window !== 'undefined' ? window.location.href.split('?')[0] : '',
      };

      // Cache locally on this device so subsequent searches by ID immediately work
      const all = this.getAllCertificates();
      if (!all.some((c) => c.id.toUpperCase() === cert.id.toUpperCase())) {
        setItem(KEYS.CERTIFICATES, [cert, ...all]);
        window.dispatchEvent(new Event('gwpr_certificates_updated'));
      }
      return cert;
    } catch (e) {
      console.warn('Error parsing certificate QR payload:', e);
      return null;
    }
  },

  // Async verification querying Supabase Cloud Database first, then payload, then LocalStorage
  async verifyCertificate(id: string, payload?: string): Promise<Certificate | undefined> {
    if (!id) return undefined;
    const cleanId = id.trim().toUpperCase();

    // 1. If encoded QR payload is provided, decode and cache
    if (payload) {
      const fromPayload = this.decodePayload(payload);
      if (fromPayload && fromPayload.id.toUpperCase() === cleanId) {
        return fromPayload;
      }
    }

    // 2. Try Supabase cloud database (universal cross-device verification from any phone/laptop)
    try {
      const fromSupabase = await supabaseDataService.getCertificateById(cleanId);
      if (fromSupabase) {
        // Cache locally for offline/fast future lookups
        const all = this.getAllCertificates();
        if (!all.some((c) => c.id.toUpperCase() === fromSupabase.id.toUpperCase())) {
          setItem(KEYS.CERTIFICATES, [fromSupabase, ...all]);
        }
        return fromSupabase;
      }
    } catch (e) {
      console.warn('Supabase certificate check error, falling back to local records:', e);
    }

    // 3. Fallback to LocalStorage
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

    // Encode verification payload for cross-device QR scanning
    const payloadObject = {
      id: certId,
      name: student.fullName,
      course: course.title,
      completionDate: formattedDate,
      issueDate: formattedDate,
      signatoryName: config.signatoryName || 'Dr. Rajesh Vardhan',
      signatoryTitle: config.signatoryTitle || 'Head of Academics & Technical Certifications',
      companyName: config.companyName || 'GWPR Private Limited',
      status: 'Valid',
    };
    const encodedPayload = btoa(encodeURIComponent(JSON.stringify(payloadObject)));

    // Verification URL pointing to configurable base URL with QR payload
    const baseUrl = (typeof window !== 'undefined' && window.location.origin) ? window.location.origin : config.baseUrl.replace(/\/$/, '');
    const verificationUrl = `${baseUrl}/verify/${certId}?d=${encodedPayload}`;

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
