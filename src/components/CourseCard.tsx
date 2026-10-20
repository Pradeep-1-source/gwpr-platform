import React from 'react';
import { Course } from '../types';
import { Clock, BarChart, Award, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onSelect: (course: Course) => void;
  onEnroll: (courseId: string) => void;
  isEnrolled?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onSelect,
  onEnroll,
  isEnrolled = false,
}) => {
  const totalLessons = course.syllabus.reduce((acc, mod) => acc + mod.lessons.length, 0);

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Intermediate':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Advanced':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Thumbnail Header */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#0B192C]/90 text-white backdrop-blur-xs border border-white/20">
            {course.category}
          </span>
          {course.featured && (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-500 text-amber-950 shadow-sm">
              Popular
            </span>
          )}
        </div>

        {/* Level & Duration Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white z-10 font-medium">
          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getLevelBadgeClass(course.level)}`}>
            {course.level}
          </span>
          <span className="flex items-center gap-1 text-[11px] bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
            <Clock size={12} className="text-cyan-400" />
            <span>{course.duration}</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <h3
            onClick={() => onSelect(course)}
            className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer"
          >
            {course.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>

          {/* Skills Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {course.skills.slice(0, 4).map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] rounded font-medium"
              >
                {skill}
              </span>
            ))}
            {course.skills.length > 4 && (
              <span className="text-[10px] text-slate-400 self-center font-medium">
                +{course.skills.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Certificate Eligibility Badge */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-blue-700 font-medium text-[11px]">
            <Award size={14} className="text-blue-600" />
            <span>Verifiable Certificate</span>
          </div>
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <BookOpen size={12} />
            <span>{totalLessons} Lessons</span>
          </span>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-1 flex items-center gap-2">
          <button
            onClick={() => onSelect(course)}
            className="flex-1 py-2 px-3 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
          >
            Syllabus
          </button>
          
          {isEnrolled ? (
            <button
              onClick={() => (window.location.href = '/dashboard')}
              className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <CheckCircle2 size={13} />
              <span>Enrolled</span>
            </button>
          ) : (
            <button
              onClick={() => onEnroll(course.id)}
              className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm shadow-blue-600/20 transition-all"
            >
              <span>Enroll Now</span>
              <ArrowRight size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
