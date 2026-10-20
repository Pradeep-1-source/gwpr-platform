import { Course } from '../types';
import { getItem, setItem, KEYS } from './localStorageService';
import { INITIAL_COURSES } from '../data/initialData';

export const courseService = {
  getAllCourses(): Course[] {
    return getItem<Course[]>(KEYS.COURSES, INITIAL_COURSES);
  },

  getCourseById(id: string): Course | undefined {
    const courses = this.getAllCourses();
    return courses.find((c) => c.id === id);
  },

  addCourse(newCourse: Omit<Course, 'id'> & { id?: string }): { success: boolean; course?: Course; message: string } {
    const courses = this.getAllCourses();
    const id = newCourse.id || newCourse.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    if (courses.some((c) => c.id === id)) {
      return { success: false, message: 'A course with this identifier or title already exists.' };
    }

    const course: Course = {
      ...newCourse,
      id,
    };

    setItem(KEYS.COURSES, [course, ...courses]);
    window.dispatchEvent(new Event('gwpr_courses_updated'));
    return { success: true, course, message: 'Course added to catalog successfully.' };
  },

  updateCourse(id: string, updates: Partial<Course>): { success: boolean; message: string } {
    const courses = this.getAllCourses();
    const index = courses.findIndex((c) => c.id === id);
    if (index === -1) {
      return { success: false, message: 'Course not found.' };
    }

    courses[index] = { ...courses[index], ...updates };
    setItem(KEYS.COURSES, courses);
    window.dispatchEvent(new Event('gwpr_courses_updated'));
    return { success: true, message: 'Course details updated successfully.' };
  },

  deleteCourse(id: string): { success: boolean; message: string } {
    const courses = this.getAllCourses();
    const filtered = courses.filter((c) => c.id !== id);
    if (filtered.length === courses.length) {
      return { success: false, message: 'Course not found.' };
    }

    setItem(KEYS.COURSES, filtered);
    window.dispatchEvent(new Event('gwpr_courses_updated'));
    return { success: true, message: 'Course deleted from catalog.' };
  },

  resetToDefaults(): void {
    setItem(KEYS.COURSES, INITIAL_COURSES);
    window.dispatchEvent(new Event('gwpr_courses_updated'));
  }
};
