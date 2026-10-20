import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  BookOpen,
  Award,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  ExternalLink,
  Download,
} from 'lucide-react';
import { enrollmentService } from '../services/enrollmentService';
import { courseService } from '../services/courseService';
import { certificateService } from '../services/certificateService';
import { authService } from '../services/authService';
import { Enrollment, Course, Lesson, Certificate } from '../types';
import { CertificatePDFGenerator } from '../components/CertificatePDFGenerator';

export const CourseLearningPage: React.FC = () => {
  const { enrollmentId } = useParams<{ enrollmentId: string }>();
  const navigate = useNavigate();
  const student = authService.getCurrentStudent();

  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  const [certModalOpen, setCertModalOpen] = useState(false);
  const [currentCert, setCurrentCert] = useState<Certificate | null>(null);

  useEffect(() => {
    if (!student) {
      navigate('/login');
      return;
    }

    if (enrollmentId) {
      const enr = enrollmentService.getEnrollmentById(enrollmentId);
      if (enr) {
        setEnrollment(enr);
        const c = courseService.getCourseById(enr.courseId);
        if (c) {
          setCourse(c);
          if (c.syllabus.length > 0 && c.syllabus[0].lessons.length > 0) {
            setActiveLesson(c.syllabus[0].lessons[0]);
          }
        }
      } else {
        navigate('/dashboard');
      }
    }
  }, [enrollmentId, student, navigate]);

  const handleToggleLesson = (lessonId: string) => {
    if (!enrollment) return;
    const isCompleted = enrollment.completedLessons.includes(lessonId);
    const res = enrollmentService.updateLessonProgress(enrollment.id, lessonId, !isCompleted);
    if (res.success && res.enrollment) {
      setEnrollment(res.enrollment);
      if (res.enrollment.progress === 100) {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const handleFastTrackComplete = () => {
    if (!enrollment) return;
    const res = enrollmentService.markAllLessonsComplete(enrollment.id);
    if (res.success && res.enrollment) {
      setEnrollment(res.enrollment);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5 },
      });
    }
  };

  const handleResetProgress = () => {
    if (!enrollment) return;
    const res = enrollmentService.resetEnrollmentProgress(enrollment.id);
    if (res.success && res.enrollment) {
      setEnrollment(res.enrollment);
    }
  };

  const handleGenerateCertificate = () => {
    if (!enrollment || enrollment.progress < 100) return;
    const res = certificateService.generateCertificate(enrollment);
    if (res.success && res.certificate) {
      setCurrentCert(res.certificate);
      setCertModalOpen(true);
    } else {
      alert(res.message);
    }
  };

  if (!enrollment || !course) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-slate-500 text-sm">Loading course curriculum...</p>
      </div>
    );
  }

  const isCurrentCompleted = activeLesson
    ? enrollment.completedLessons.includes(activeLesson.id)
    : false;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Learning Bar */}
      <header className="bg-white/95 backdrop-blur-md text-slate-800 border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </Link>
            <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />
            <h1 className="text-sm sm:text-base font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
              {course.title}
            </h1>
          </div>

          {/* Right Progress & Certificate CTA */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[11px] text-slate-500 font-medium">
                Progress: <strong className="text-blue-600 font-bold">{enrollment.progress}%</strong>
              </span>
              <div className="w-32 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1 border border-slate-200">
                <div
                  className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${enrollment.progress}%` }}
                />
              </div>
            </div>

            {enrollment.progress === 100 ? (
              <button
                onClick={handleGenerateCertificate}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/30 transition-all animate-pulse"
              >
                <Download size={14} />
                <span>Download Certificate</span>
              </button>
            ) : (
              <button
                onClick={handleFastTrackComplete}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-sm transition-all"
                title="Mark all lessons as complete to finish course"
              >
                <CheckCircle2 size={14} />
                <span>Make Complete</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace: Sidebar Syllabus + Active Lesson */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Modules & Lesson Nav */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-blue-600" />
                <h3 className="font-bold text-sm text-slate-900">Curriculum Syllabus</h3>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {enrollment.completedLessons.length} of{' '}
                {course.syllabus.reduce((acc, m) => acc + m.lessons.length, 0)} Done
              </span>
            </div>

            {/* Mobile/Tablet Progress Bar */}
            <div className="md:hidden space-y-1">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Course Progress</span>
                <span className="font-bold text-blue-600">{enrollment.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all"
                  style={{ width: `${enrollment.progress}%` }}
                />
              </div>
            </div>

            {/* Modules Accordion */}
            <div className="space-y-3">
              {course.syllabus.map((module, mIdx) => (
                <div key={module.id} className="rounded-xl border border-slate-200 overflow-hidden">
                  <div className="p-3 bg-slate-50 border-b border-slate-200">
                    <h4 className="text-xs font-bold text-slate-900">{module.title}</h4>
                  </div>
                  <div className="divide-y divide-slate-100 p-1">
                    {module.lessons.map((lesson, lIdx) => {
                      const isDone = enrollment.completedLessons.includes(lesson.id);
                      const isSelected = activeLesson?.id === lesson.id;

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLesson(lesson)}
                          className={`w-full text-left p-2.5 rounded-lg flex items-center justify-between gap-2 text-xs transition-colors ${
                            isSelected
                              ? 'bg-blue-50 text-blue-900 font-semibold border border-blue-200'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {isDone ? (
                              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                            ) : (
                              <Circle size={16} className="text-slate-300 shrink-0" />
                            )}
                            <span className="truncate">{lesson.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono shrink-0">
                            {lesson.duration}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Complete Course Action */}
            <div className="pt-3 border-t border-slate-100">
              {enrollment.progress === 100 ? (
                <button
                  onClick={handleGenerateCertificate}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <Download size={14} />
                  <span>Download Certificate</span>
                </button>
              ) : (
                <button
                  onClick={handleFastTrackComplete}
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <CheckCircle2 size={15} />
                  <span>Make Course Complete</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Active Lesson Content */}
        <div className="lg:col-span-8">
          {activeLesson ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Lesson Header */}
              <div className="border-b border-slate-200 pb-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                    Lesson Overview
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                    <Clock size={13} />
                    <span>Estimated time: {activeLesson.duration}</span>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {activeLesson.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">{activeLesson.description}</p>
              </div>

              {/* Lesson Body Resource / Theory */}
              <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <BookOpen size={16} className="text-blue-600" />
                    <span>Conceptual Framework & Core Principles</span>
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {activeLesson.content}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
                  <h4 className="font-bold text-blue-950 text-sm">Practical Milestone Assignment</h4>
                  <p className="text-blue-900/80 text-xs leading-relaxed">
                    Review the code patterns associated with this unit, implement the module assignment in your local development environment, and verify test assertions.
                  </p>
                </div>
              </div>

              {/* Lesson Completion Action Button */}
              <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => handleToggleLesson(activeLesson.id)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all ${
                    isCurrentCompleted
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20'
                  }`}
                >
                  <CheckCircle2 size={16} />
                  <span>
                    {isCurrentCompleted ? 'Lesson Completed ✓ (Click to Undo)' : 'Mark Lesson as Complete'}
                  </span>
                </button>

                {enrollment.progress === 100 ? (
                  <button
                    onClick={handleGenerateCertificate}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/25 transition-all animate-pulse"
                  >
                    <Download size={15} />
                    <span>Download Certificate</span>
                  </button>
                ) : (
                  <button
                    onClick={handleFastTrackComplete}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    <CheckCircle2 size={15} className="text-cyan-400" />
                    <span>Make Course Complete</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
              Select a lesson from the syllabus on the left to begin learning.
            </div>
          )}
        </div>

      </div>

      {/* Certificate Modal */}
      {currentCert && (
        <CertificatePDFGenerator
          certificate={currentCert}
          isOpen={certModalOpen}
          onClose={() => setCertModalOpen(false)}
        />
      )}
    </div>
  );
};
