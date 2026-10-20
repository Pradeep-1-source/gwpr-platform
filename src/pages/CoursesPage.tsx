import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { courseService } from '../services/courseService';
import { enrollmentService } from '../services/enrollmentService';
import { authService } from '../services/authService';
import { CourseCard } from '../components/CourseCard';
import { CourseDetailModal } from '../components/CourseDetailModal';
import { Course, CourseLevel } from '../types';
import {
  Search,
  Filter,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  X,
  CheckCircle,
} from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState<Course[]>(courseService.getAllCourses());
  const [student, setStudent] = useState(authService.getCurrentStudent());

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [enrollToast, setEnrollToast] = useState<string | null>(null);

  useEffect(() => {
    const handleCoursesUpdate = () => {
      setCourses(courseService.getAllCourses());
    };
    const handleAuthChange = () => {
      setStudent(authService.getCurrentStudent());
    };
    window.addEventListener('gwpr_courses_updated', handleCoursesUpdate);
    window.addEventListener('gwpr_auth_change', handleAuthChange);
    return () => {
      window.removeEventListener('gwpr_courses_updated', handleCoursesUpdate);
      window.removeEventListener('gwpr_auth_change', handleAuthChange);
    };
  }, []);

  // Check URL query param to open course directly if specified
  useEffect(() => {
    const courseParam = searchParams.get('course');
    if (courseParam) {
      const found = courses.find((c) => c.id === courseParam);
      if (found) {
        setSelectedCourse(found);
        setModalOpen(true);
      }
    }
  }, [searchParams, courses]);

  const categories = [
    'All',
    'Software Engineering',
    'Data & AI',
    'Cloud & DevOps',
    'Digital Marketing',
    'Emerging Tech',
  ];

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        selectedCategory === 'All' || course.category === selectedCategory;

      const matchesLevel =
        selectedLevel === 'All' || course.level === selectedLevel;

      return matchesSearch && matchesCat && matchesLevel;
    });
  }, [courses, searchQuery, selectedCategory, selectedLevel]);

  const handleOpenCourse = (course: Course) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const handleEnroll = (courseId: string) => {
    if (!student) {
      navigate('/login?redirect=' + encodeURIComponent(`/courses?course=${courseId}`));
      return;
    }

    const res = enrollmentService.enrollStudent(student.id, courseId);
    if (res.success) {
      setEnrollToast(res.message);
      setModalOpen(false);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Toast Notification */}
      {enrollToast && (
        <div className="fixed top-24 right-4 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-4">
          <CheckCircle size={16} />
          <span>{enrollToast}</span>
        </div>
      )}

      {/* Header */}
      <section className="bg-gradient-to-b from-[#F1F5F9] via-[#FAF9F6] to-white text-slate-900 py-16 sm:py-20 border-b border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Sparkles size={14} />
            <span>Technical Training Curriculums</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-slate-900">
            Industry-Aligned Technical Courses & Certifications
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Gain in-demand skills through comprehensive module lessons, practical milestones, and receive a verifiable Certificate of Completion upon finishing.
          </p>
        </div>
      </section>

      {/* Course Search & Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by course title, skill (e.g. Python, React, AWS, SQL)..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category and Level Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-slate-100">
            {/* Category Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-400 mr-1 hidden sm:inline">Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Level Select */}
            <div className="flex items-center gap-2 self-start lg:self-auto">
              <span className="text-xs font-semibold text-slate-500">Level:</span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                {levels.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                      selectedLevel === lvl
                        ? 'bg-white text-blue-700 shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong className="text-slate-900">{filteredCourses.length}</strong> of {courses.length} courses
          </span>
          {(searchQuery || selectedCategory !== 'All' || selectedLevel !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedLevel('All');
              }}
              className="text-blue-600 hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onSelect={handleOpenCourse}
                onEnroll={handleEnroll}
                isEnrolled={
                  student
                    ? enrollmentService.isStudentEnrolled(student.id, course.id)
                    : false
                }
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">No courses match your criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or resetting category filters to browse all available technical programs.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedLevel('All');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
            >
              Show All Courses
            </button>
          </div>
        )}
      </section>

      {/* Modal */}
      <CourseDetailModal
        course={selectedCourse}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEnroll={handleEnroll}
        isEnrolled={
          selectedCourse && student
            ? enrollmentService.isStudentEnrolled(student.id, selectedCourse.id)
            : false
        }
        isLoggedIn={!!student}
      />
    </div>
  );
};
