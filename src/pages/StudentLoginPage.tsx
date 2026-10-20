import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
} from 'lucide-react';
import { authService } from '../services/authService';

export const StudentLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
            Sign in to access your course syllabus, assignments, and certificates.
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
              placeholder="e.g. yourname@example.com"
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
                placeholder="Enter your password"
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

        {/* Bottom register link */}
        <div className="text-center pt-2 text-xs text-slate-500 border-t border-slate-100">
          <span>New student? </span>
          <Link to="/register" className="text-blue-600 hover:underline font-semibold">
            Register for an account
          </Link>
        </div>
      </div>
    </div>
  );
};
