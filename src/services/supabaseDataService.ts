import { getSupabase } from './supabaseClient';
import { Course, DemoStudent, Enrollment, Certificate, CompanyConfig } from '../types';
import {
  INITIAL_COURSES,
  INITIAL_DEMO_STUDENTS,
  INITIAL_ENROLLMENTS,
  INITIAL_CERTIFICATES,
  INITIAL_COMPANY_CONFIG,
} from '../data/initialData';

// Helper to map DB row to Course
function mapRowToCourse(row: any): Course {
  return {
    id: row.id,
    title: row.title,
    shortDescription: row.short_description,
    description: row.description,
    category: row.category,
    level: row.level,
    duration: row.duration,
    thumbnail: row.thumbnail,
    badgeColor: row.badge_color || 'bg-blue-600',
    skills: Array.isArray(row.skills) ? row.skills : [],
    syllabus: Array.isArray(row.syllabus) ? row.syllabus : [],
    learningOutcomes: Array.isArray(row.learning_outcomes) ? row.learning_outcomes : [],
    certificateEligible: row.certificate_eligible ?? true,
    featured: row.featured ?? false,
  };
}

// Helper to map Course to DB row
function mapCourseToRow(course: Course): any {
  return {
    id: course.id,
    title: course.title,
    short_description: course.shortDescription,
    description: course.description,
    category: course.category,
    level: course.level,
    duration: course.duration,
    thumbnail: course.thumbnail,
    badge_color: course.badgeColor,
    skills: course.skills,
    syllabus: course.syllabus,
    learning_outcomes: course.learningOutcomes,
    certificate_eligible: course.certificateEligible,
    featured: course.featured || false,
  };
}

// Helper to map DB row to Certificate
function mapRowToCertificate(row: any): Certificate {
  return {
    id: row.id,
    studentId: row.student_id,
    studentName: row.student_name,
    courseId: row.course_id,
    courseTitle: row.course_title,
    enrollmentId: row.enrollment_id || '',
    completionDate: row.completion_date,
    issueDate: row.issue_date,
    verificationStatus: row.verification_status as any,
    signatoryName: row.signatory_name,
    signatoryTitle: row.signatory_title,
    companyName: row.company_name,
    verificationUrl: row.verification_url,
  };
}

export const supabaseDataService = {
  // --- COURSES ---
  async getCourses(): Promise<Course[] | null> {
    const supabase = getSupabase();
    if (!supabase) return null;
    try {
      const { data, error } = await supabase.from('courses').select('*').order('created_at', { ascending: true });
      if (error || !data) return null;
      return data.map(mapRowToCourse);
    } catch {
      return null;
    }
  },

  async upsertCourse(course: Course): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;
    try {
      const { error } = await supabase.from('courses').upsert(mapCourseToRow(course));
      return !error;
    } catch {
      return false;
    }
  },

  async deleteCourse(id: string): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;
    try {
      const { error } = await supabase.from('courses').delete().eq('id', id);
      return !error;
    } catch {
      return false;
    }
  },

  // --- CERTIFICATES ---
  async getCertificates(): Promise<Certificate[] | null> {
    const supabase = getSupabase();
    if (!supabase) return null;
    try {
      const { data, error } = await supabase.from('certificates').select('*').order('created_at', { ascending: false });
      if (error || !data) return null;
      return data.map(mapRowToCertificate);
    } catch {
      return null;
    }
  },

  async getCertificateById(id: string): Promise<Certificate | null> {
    const supabase = getSupabase();
    if (!supabase) return null;
    try {
      const cleanId = id.trim().toUpperCase();
      const { data, error } = await supabase.from('certificates').select('*').ilike('id', cleanId).maybeSingle();
      if (error || !data) return null;
      return mapRowToCertificate(data);
    } catch {
      return null;
    }
  },

  async saveCertificate(cert: Certificate): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;
    try {
      const { error } = await supabase.from('certificates').upsert({
        id: cert.id,
        student_id: cert.studentId,
        student_name: cert.studentName,
        course_id: cert.courseId,
        course_title: cert.courseTitle,
        enrollment_id: cert.enrollmentId,
        completion_date: cert.completionDate,
        issue_date: cert.issueDate,
        verification_status: cert.verificationStatus,
        signatory_name: cert.signatoryName,
        signatory_title: cert.signatoryTitle,
        company_name: cert.companyName,
        verification_url: cert.verificationUrl,
      });
      return !error;
    } catch {
      return false;
    }
  },

  // --- STUDENTS ---
  async getStudents(): Promise<DemoStudent[] | null> {
    const supabase = getSupabase();
    if (!supabase) return null;
    try {
      const { data, error } = await supabase.from('students').select('*').order('created_at', { ascending: false });
      if (error || !data) return null;
      return data.map((row) => ({
        id: row.id,
        fullName: row.full_name,
        email: row.email,
        mobile: row.mobile,
        avatarUrl: row.avatar_url,
        createdAt: row.created_at,
      }));
    } catch {
      return null;
    }
  },

  async saveStudent(student: DemoStudent): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;
    try {
      const { error } = await supabase.from('students').upsert({
        id: student.id,
        full_name: student.fullName,
        email: student.email,
        mobile: student.mobile,
        avatar_url: student.avatarUrl,
        created_at: student.createdAt,
      });
      return !error;
    } catch {
      return false;
    }
  },

  // --- ENROLLMENTS ---
  async getEnrollments(): Promise<Enrollment[] | null> {
    const supabase = getSupabase();
    if (!supabase) return null;
    try {
      const { data, error } = await supabase.from('enrollments').select('*').order('enrollment_date', { ascending: false });
      if (error || !data) return null;
      return data.map((row) => ({
        id: row.id,
        studentId: row.student_id,
        courseId: row.course_id,
        enrollmentDate: row.enrollment_date,
        progress: row.progress,
        status: row.status as any,
        completedLessons: Array.isArray(row.completed_lessons) ? row.completed_lessons : [],
        completionDate: row.completion_date,
      }));
    } catch {
      return null;
    }
  },

  async saveEnrollment(enr: Enrollment): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;
    try {
      const { error } = await supabase.from('enrollments').upsert({
        id: enr.id,
        student_id: enr.studentId,
        course_id: enr.courseId,
        enrollment_date: enr.enrollmentDate,
        progress: enr.progress,
        status: enr.status,
        completed_lessons: enr.completedLessons,
        completion_date: enr.completionDate || null,
      });
      return !error;
    } catch {
      return false;
    }
  },

  // --- ENQUIRIES ---
  async submitEnquiry(enquiry: { fullName: string; email: string; mobile: string; interest: string; message: string }): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;
    try {
      const { error } = await supabase.from('enquiries').insert({
        full_name: enquiry.fullName,
        email: enquiry.email,
        mobile: enquiry.mobile,
        interest: enquiry.interest,
        message: enquiry.message,
      });
      return !error;
    } catch {
      return false;
    }
  },

  // --- SEED ALL INITIAL DATA TO SUPABASE (1-CLICK SYNC) ---
  async seedAllToSupabase(): Promise<{ success: boolean; message: string; count: number }> {
    const supabase = getSupabase();
    if (!supabase) {
      return { success: false, message: 'Supabase client is not connected.', count: 0 };
    }

    try {
      // 1. Seed courses
      const courseRows = INITIAL_COURSES.map(mapCourseToRow);
      const { error: courseErr } = await supabase.from('courses').upsert(courseRows);
      if (courseErr) throw new Error(`Courses sync error: ${courseErr.message}`);

      // 2. Seed student
      const studentRows = INITIAL_DEMO_STUDENTS.map((s) => ({
        id: s.id,
        full_name: s.fullName,
        email: s.email,
        mobile: s.mobile,
        avatar_url: s.avatarUrl,
        created_at: s.createdAt,
      }));
      const { error: stdErr } = await supabase.from('students').upsert(studentRows);
      if (stdErr) throw new Error(`Students sync error: ${stdErr.message}`);

      // 3. Seed enrollments
      const enrRows = INITIAL_ENROLLMENTS.map((e) => ({
        id: e.id,
        student_id: e.studentId,
        course_id: e.courseId,
        enrollment_date: e.enrollmentDate,
        progress: e.progress,
        status: e.status,
        completed_lessons: e.completedLessons,
        completion_date: e.completionDate || null,
      }));
      const { error: enrErr } = await supabase.from('enrollments').upsert(enrRows);
      if (enrErr) throw new Error(`Enrollments sync error: ${enrErr.message}`);

      // 4. Seed certificates
      const certRows = INITIAL_CERTIFICATES.map((c) => ({
        id: c.id,
        student_id: c.studentId,
        student_name: c.studentName,
        course_id: c.courseId,
        course_title: c.courseTitle,
        enrollment_id: c.enrollmentId,
        completion_date: c.completionDate,
        issue_date: c.issueDate,
        verification_status: c.verificationStatus,
        signatory_name: c.signatoryName,
        signatory_title: c.signatoryTitle,
        company_name: c.companyName,
        verification_url: c.verificationUrl,
      }));
      const { error: certErr } = await supabase.from('certificates').upsert(certRows);
      if (certErr) throw new Error(`Certificates sync error: ${certErr.message}`);

      return {
        success: true,
        message: `Successfully synchronized ${courseRows.length} courses, ${studentRows.length} students, and ${certRows.length} certificates to Supabase!`,
        count: courseRows.length + studentRows.length + certRows.length,
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Sync failed: ${err.message || 'Unknown database error'}`,
        count: 0,
      };
    }
  },
};
