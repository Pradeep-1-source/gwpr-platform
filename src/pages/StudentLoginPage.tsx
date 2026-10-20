import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  LogIn,
  GraduationCap,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { authService } from '../services/authService';

export const StudentLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const [email, setEmail] = useState('aarav.sharma@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = authService.login({ email, password });
    if (res.success) {
      navigate(redirect);
    } else {
      setError(res.message);
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = () => {
    const res = authService.loginDemoStudent();
    if (res.success) {
      navigate(redirect);
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5 mx-auto shadow-md">
            <div className="w-full h-full bg-[#0B192C] rounded-[14px] flex items-center justify-center p-2">
              <img src="/gwpr-logo.svg" alt="GWPR Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-serif">
            Student Career Portal Login
          </h2>
          <p className="text-xs text-slate-500">
            Sign in to access your enrollments, course lessons, and certificates.
          </p>
        </div>

        {/* Demo Mode Notice Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-blue-950">
            <ShieldAlert size={15} className="text-blue-600" />
            <span>Frontend Demo Session</span>
          </div>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            Passwords are validated for demo simulation only and are never saved to disk. Use the pre-filled credentials or create a new student account.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. aarav.sharma@example.com"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
          >
            <LogIn size={16} />
            <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
          </button>
        </form>

        {/* Quick Demo One-Click Fill */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-slate-200"
          >
            <Sparkles size={14} className="text-blue-600" />
            <span>One-Click Login as Demo Student (Aarav Sharma)</span>
          </button>
        </div>

        {/* Bottom register link */}
        <div className="text-center pt-2 text-xs text-slate-500 border-t border-slate-100">
          <span>New student? </span>
          <Link to="/register" className="text-blue-600 hover:underline font-semibold">
            Create a demo account
          </Link>
        </div>
      </div>
    </div>
  );
};
