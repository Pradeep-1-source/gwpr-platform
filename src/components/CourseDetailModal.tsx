import React from 'react';
import { Course } from '../types';
import {
  X,
  Clock,
  BarChart,
  Award,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onEnroll: (courseId: string) => void;
  isEnrolled: boolean;
  isLoggedIn: boolean;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  isOpen,
  onClose,
  onEnroll,
  isEnrolled,
  isLoggedIn,
}) => {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-700 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with Course Thumbnail background */}
        <div className="relative bg-[#0B192C] text-white p-6 sm:p-8 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover filter blur-sm scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/80 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-300 hover:text-white p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors z-20"
          >
            <X size={20} />
          </button>

          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                {course.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                <BarChart size={12} />
                <span>{course.level} Level</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                <Clock size={12} />
                <span>{course.duration}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {course.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {course.description}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 bg-slate-50">
          
          {/* Certificate Eligibility Callout */}
          <div className="bg-gradient-to-r from-blue-900/10 via-cyan-900/10 to-indigo-900/10 border border-blue-200 rounded-xl p-4 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Award size={22} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Official Certificate Eligibility</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Complete all {course.syllabus.reduce((acc, m) => acc + m.lessons.length, 0)} interactive module lessons to unlock your verifiable GWPR Certificate of Completion with a unique QR code.
              </p>
            </div>
          </div>

          {/* Skills Covered */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <Sparkles size={16} className="text-blue-600" />
              <span>Key Technologies & Competencies</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white text-slate-800 text-xs font-medium rounded-lg border border-slate-200 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Learning Outcomes */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <GraduationCap size={16} className="text-blue-600" />
              <span>Target Learning Outcomes</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {course.learningOutcomes.map((outcome, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-slate-200 shadow-xs"
                >
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 leading-snug">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Comprehensive Syllabus Breakdown */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <BookOpen size={16} className="text-blue-600" />
              <span>Curriculum & Syllabus Breakdown</span>
            </h4>
            <div className="space-y-4">
              {course.syllabus.map((module, mIdx) => (
                <div key={module.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="p-4 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm">{module.title}</h5>
                      <p className="text-xs text-slate-500">{module.description}</p>
                    </div>
                    <span className="text-xs text-slate-500 font-medium bg-white px-2.5 py-1 rounded border border-slate-200">
                      {module.lessons.length} Lessons
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 p-2">
                    {module.lessons.map((lesson, lIdx) => (
                      <div key={lesson.id} className="py-2.5 px-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold">
                            {lIdx + 1}
                          </span>
                          <span className="font-medium text-slate-800">{lesson.title}</span>
                        </div>
                        <span className="text-slate-400 font-mono text-[11px] shrink-0">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            {isEnrolled ? (
              <span className="text-emerald-600 font-semibold flex items-center gap-1.5">
                <CheckCircle2 size={16} />
                <span>You are already enrolled in this course</span>
              </span>
            ) : (
              <span>Instant enrollment to demo career portal</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              Close
            </button>
            {isEnrolled ? (
              <button
                onClick={() => {
                  onClose();
                  window.location.href = '/dashboard';
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all"
              >
                <span>Continue Course</span>
                <ChevronRight size={15} />
              </button>
            ) : (
              <button
                onClick={() => onEnroll(course.id)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-md shadow-blue-500/25 transition-all"
              >
                <span>Enroll in Course</span>
                <ChevronRight size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
