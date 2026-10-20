import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, ShieldCheck } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 text-center bg-slate-50">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-2xl font-black font-serif">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            The page you requested does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            <Home size={15} />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/courses"
            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            <Search size={15} />
            <span>Browse Courses</span>
          </Link>
          <Link
            to="/verify"
            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
          >
            <ShieldCheck size={15} />
            <span>Verify Certificate</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
