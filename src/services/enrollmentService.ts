import { Enrollment } from '../types';
import { getItem, setItem, KEYS } from './localStorageService';
import { INITIAL_ENROLLMENTS } from '../data/initialData';
import { courseService } from './courseService';

export const enrollmentService = {
  getAllEnrollments(): Enrollment[] {
    return getItem<Enrollment[]>(KEYS.ENROLLMENTS, INITIAL_ENROLLMENTS);
  },

  getEnrollmentsByStudent(studentId: string): Enrollment[] {
    const enrollments = this.getAllEnrollments();
    return enrollments.filter((e) => e.studentId === studentId);
  },

  getEnrollmentById(id: string): Enrollment | undefined {
    const enrollments = this.getAllEnrollments();
    return enrollments.find((e) => e.id === id);
  },

  isStudentEnrolled(studentId: string, courseId: string): boolean {
    const enrollments = this.getAllEnrollments();
    return enrollments.some((e) => e.studentId === studentId && e.courseId === courseId);
  },

  enrollStudent(studentId: string, courseId: string): { success: boolean; enrollment?: Enrollment; message: string } {
    if (!studentId || !courseId) {
      return { success: false, message: 'Invalid student or course ID.' };
    }

    if (this.isStudentEnrolled(studentId, courseId)) {
      return { success: false, message: 'You are already enrolled in this course.' };
    }

    const course = courseService.getCourseById(courseId);
    if (!course) {
      return { success: false, message: 'Course does not exist.' };
    }

    // Generate unique readable Enrollment ID: ENR-2026-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newEnrollment: Enrollment = {
      id: `ENR-${new Date().getFullYear()}-${randomSuffix}`,
      studentId,
      courseId,
      enrollmentDate: new Date().toISOString(),
      progress: 0,
      status: 'Enrolled',
      completedLessons: [],
    };

    const all = this.getAllEnrollments();
    setItem(KEYS.ENROLLMENTS, [newEnrollment, ...all]);
    window.dispatchEvent(new Event('gwpr_enrollments_updated'));

    return {
      success: true,
      enrollment: newEnrollment,
      message: `Successfully enrolled in ${course.title}! Enrollment ID: ${newEnrollment.id}`,
    };
  },

  updateLessonProgress(enrollmentId: string, lessonId: string, markComplete: boolean): { success: boolean; enrollment?: Enrollment; message: string } {
    const all = this.getAllEnrollments();
    const index = all.findIndex((e) => e.id === enrollmentId);
    if (index === -1) {
      return { success: false, message: 'Enrollment record not found.' };
    }

    const current = all[index];
    const course = courseService.getCourseById(current.courseId);
    if (!course) {
      return { success: false, message: 'Course record not found.' };
    }

    // Calculate total lessons in course
    const totalLessons = course.syllabus.reduce((acc, mod) => acc + mod.lessons.length, 0);

    let completed = new Set(current.completedLessons);
    if (markComplete) {
      completed.add(lessonId);
    } else {
      completed.delete(lessonId);
    }

    const completedCount = completed.size;
    const progress = totalLessons > 0 ? Math.min(100, Math.round((completedCount / totalLessons) * 100)) : 100;
    
    let status = current.status;
    let completionDate = current.completionDate;

    if (progress === 100) {
      status = 'Completed';
      if (!completionDate) {
        completionDate = new Date().toISOString();
      }
    } else if (progress > 0) {
      status = 'In Progress';
      completionDate = undefined;
    } else {
      status = 'Enrolled';
      completionDate = undefined;
    }

    const updated: Enrollment = {
      ...current,
      completedLessons: Array.from(completed),
      progress,
      status,
      completionDate,
    };

    all[index] = updated;
    setItem(KEYS.ENROLLMENTS, all);
    window.dispatchEvent(new Event('gwpr_enrollments_updated'));

    return {
      success: true,
      enrollment: updated,
      message: progress === 100 ? 'Course completed! You are now eligible to generate your certificate.' : `Lesson updated. Course progress: ${progress}%`,
    };
  },

  // Prototype fast-track mechanism to mark all lessons complete for demo purposes
  markAllLessonsComplete(enrollmentId: string): { success: boolean; enrollment?: Enrollment; message: string } {
    const all = this.getAllEnrollments();
    const index = all.findIndex((e) => e.id === enrollmentId);
    if (index === -1) {
      return { success: false, message: 'Enrollment record not found.' };
    }

    const current = all[index];
    const course = courseService.getCourseById(current.courseId);
    if (!course) {
      return { success: false, message: 'Course record not found.' };
    }

    const allLessonIds = course.syllabus.flatMap((m) => m.lessons.map((l) => l.id));

    const updated: Enrollment = {
      ...current,
      completedLessons: allLessonIds,
      progress: 100,
      status: 'Completed',
      completionDate: current.completionDate || new Date().toISOString(),
    };

    all[index] = updated;
    setItem(KEYS.ENROLLMENTS, all);
    window.dispatchEvent(new Event('gwpr_enrollments_updated'));

    return {
      success: true,
      enrollment: updated,
      message: 'Demo Fast-Track: Course marked as 100% completed. Certificate generation unlocked!',
    };
  },

  resetEnrollmentProgress(enrollmentId: string): { success: boolean; enrollment?: Enrollment } {
    const all = this.getAllEnrollments();
    const index = all.findIndex((e) => e.id === enrollmentId);
    if (index === -1) return { success: false };

    const updated: Enrollment = {
      ...all[index],
      completedLessons: [],
      progress: 0,
      status: 'Enrolled',
      completionDate: undefined,
    };

    all[index] = updated;
    setItem(KEYS.ENROLLMENTS, all);
    window.dispatchEvent(new Event('gwpr_enrollments_updated'));
    return { success: true, enrollment: updated };
  }
};
