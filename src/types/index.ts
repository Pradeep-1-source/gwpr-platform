export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  description: string;
  content: string;
}

export interface SyllabusModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: 'Software Engineering' | 'Data & AI' | 'Cloud & DevOps' | 'Digital Marketing' | 'Emerging Tech';
  level: CourseLevel;
  duration: string;
  thumbnail: string;
  badgeColor: string;
  skills: string[];
  syllabus: SyllabusModule[];
  learningOutcomes: string[];
  certificateEligible: boolean;
  featured?: boolean;
}

export interface DemoStudent {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  createdAt: string;
  avatarUrl?: string;
}

export type EnrollmentStatus = 'Enrolled' | 'In Progress' | 'Completed';

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: string;
  progress: number; // 0 to 100
  status: EnrollmentStatus;
  completedLessons: string[];
  completionDate?: string;
}

export interface Certificate {
  id: string; // e.g. GWPR-CERT-2026-A7K92X
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  enrollmentId: string;
  completionDate: string;
  issueDate: string;
  verificationStatus: 'Valid' | 'Revoked';
  signatoryName: string;
  signatoryTitle: string;
  companyName: string;
  verificationUrl: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  iconName: string;
  category: 'Development' | 'Design' | 'Marketing' | 'Maintenance';
}

export interface CompanyConfig {
  companyName: string;
  legalName: string;
  tagline: string;
  signatoryName: string;
  signatoryTitle: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  address: string;
  baseUrl: string;
}
