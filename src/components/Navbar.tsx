import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  ShieldCheck,
  User,
  LogOut,
  GraduationCap,
  Sparkles,
  Layers,
  Phone,
  BookOpen,
  Info,
} from 'lucide-react';
import { authService } from '../services/authService';
import { DemoStudent } from '../types';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [student, setStudent] = useState<DemoStudent | null>(authService.getCurrentStudent());
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      setStudent(authService.getCurrentStudent());
    };
    window.addEventListener('gwpr_auth_change', handleAuthChange);
    return () => window.removeEventListener('gwpr_auth_change', handleAuthChange);
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Courses', path: '/courses' },
    { name: 'Career Portal', path: student ? '/dashboard' : '/login' },
    { name: 'Verify Certificate', path: '/verify' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B192C]/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-900 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#0B192C] rounded-[10px] flex items-center justify-center p-1.5">
                <img src="/gwpr-logo.svg" alt="GWPR Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                GWPR <span className="text-cyan-400 font-semibold text-sm sm:text-base">PVT LTD</span>
              </span>
              <span className="text-[10px] tracking-wider text-slate-400 uppercase font-medium">
                Tech & Career Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'text-cyan-400 bg-white/5 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Verify Quick Button */}
            <Link
              to="/verify"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition-all hover:border-cyan-400/50 shadow-sm"
              title="Verify Course Certificate"
            >
              <ShieldCheck size={15} className="text-cyan-400" />
              <span>Verify Cert</span>
            </Link>

            {/* Auth Button: Login vs Student Dashboard */}
            {student ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all"
                >
                  <img
                    src={student.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={student.fullName}
                    className="w-5 h-5 rounded-full object-cover ring-1 ring-white/50"
                  />
                  <span className="max-w-[110px] truncate">{student.fullName}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-xs font-semibold rounded-lg text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Student Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-md shadow-blue-500/20 transition-all"
                >
                  <GraduationCap size={15} />
                  <span>Register</span>
                </Link>
              </div>
            )}

            {/* Admin Demo Badge Link */}
            <Link
              to="/admin"
              className="text-[11px] font-medium text-slate-400 hover:text-amber-400 bg-slate-900/60 px-2.5 py-1.5 rounded border border-slate-700/60 hover:border-amber-500/40 transition-colors"
              title="Admin Demo Workspace"
            >
              Admin Demo
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/verify"
              className="p-2 text-cyan-400 hover:bg-slate-800 rounded-lg"
              title="Verify Certificate"
            >
              <ShieldCheck size={20} />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B192C] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-blue-600/20 text-cyan-400 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            {student ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 bg-slate-800/60 rounded-lg">
                  <img
                    src={student.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={student.fullName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold text-white truncate">{student.fullName}</p>
                    <p className="text-xs text-slate-400 truncate">{student.email}</p>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-blue-600 text-white font-medium text-sm shadow"
                >
                  Go to Student Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-slate-800 text-red-400 hover:bg-slate-700 font-medium text-sm"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center py-2.5 px-3 rounded-lg bg-slate-800 text-white font-medium text-sm text-center border border-slate-700"
                >
                  Student Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center py-2.5 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium text-sm text-center"
                >
                  Register
                </Link>
              </div>
            )}

            <div className="pt-2 flex justify-between items-center text-xs text-slate-400">
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>Demo Admin Portal</span>
              </Link>
              <span className="text-[10px] text-slate-500">v1.0 Demo Mode</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
