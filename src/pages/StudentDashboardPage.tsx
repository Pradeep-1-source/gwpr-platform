import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  LogOut,
  User,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Download,
  Search,
} from 'lucide-react';
import { authService } from '../services/authService';
import { enrollmentService } from '../services/enrollmentService';
import { courseService } from '../services/courseService';
import { certificateService } from '../services/certificateService';
import { Enrollment, Course, Certificate, DemoStudent } from '../types';
import { CertificatePDFGenerator } from '../components/CertificatePDFGenerator';

export const StudentDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState<DemoStudent | null>(authService.getCurrentStudent());
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [courses, setCourses] = useState<Course[]>(courseService.getAllCourses());

  const [activeTab, setActiveTab] = useState<'enrollments' | 'certificates' | 'profile'>('enrollments');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [certModalOpen, setCertModalOpen] = useState(false);

  // Profile Edit State
  const [editName, setEditName] = useState('');
  const [editMobile, setEditMobile] = useState('');
  const [profileSaved, setProfileSaved] = useState(false);

  const loadData = () => {
    const current = authService.getCurrentStudent();
    if (!current) {
      navigate('/login');
      return;
    }
    setStudent(current);
    setEditName(current.fullName);
    setEditMobile(current.mobile);
    const userEnrollments = enrollmentService.getEnrollmentsByStudent(current.id);
    setEnrollments(userEnrollments);
    const userCertificates = certificateService.getCertificatesByStudent(current.id);
    setCertificates(userCertificates);
  };

  useEffect(() => {
    loadData();

    const handleUpdates = () => loadData();
    window.addEventListener('gwpr_enrollments_updated', handleUpdates);
    window.addEventListener('gwpr_certificates_updated', handleUpdates);
    window.addEventListener('gwpr_auth_change', handleUpdates);

    return () => {
      window.removeEventListener('gwpr_enrollments_updated', handleUpdates);
      window.removeEventListener('gwpr_certificates_updated', handleUpdates);
      window.removeEventListener('gwpr_auth_change', handleUpdates);
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const handleGenerateCertificate = (enrollment: Enrollment) => {
    const res = certificateService.generateCertificate(enrollment);
    if (res.success && res.certificate) {
      setSelectedCert(res.certificate);
      setCertModalOpen(true);
      loadData();
    } else {
      alert(res.message);
    }
  };

  const handleViewCert = (cert: Certificate) => {
    setSelectedCert(cert);
    setCertModalOpen(true);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;
    authService.updateProfile(student.id, {
      fullName: editName.trim(),
      mobile: editMobile.trim(),
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  if (!student) return null;

  const completedCount = enrollments.filter((e) => e.status === 'Completed').length;
  const inProgressCount = enrollments.filter((e) => e.status !== 'Completed').length;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Banner / Student Welcome */}
      <section className="bg-[#0B192C] text-white py-10 sm:py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={student.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt={student.fullName}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/50 shadow-md"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {student.fullName}
                  </h1>
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-500/20 text-cyan-300 px-2 py-0.5 rounded border border-blue-400/30">
                    Student ID: {student.id.substring(0, 10)}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{student.email} • {student.mobile}</p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3">
              <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 block">Enrolled</span>
                <strong className="text-lg text-white font-bold">{enrollments.length}</strong>
              </div>
              <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 block">Completed</span>
                <strong className="text-lg text-emerald-400 font-bold">{completedCount}</strong>
              </div>
              <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 block">Certificates</span>
                <strong className="text-lg text-cyan-400 font-bold">{certificates.length}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('enrollments')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'enrollments'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <BookOpen size={15} />
              <span>My Enrollments ({enrollments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'certificates'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Award size={15} />
              <span>My Certificates ({certificates.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'profile'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <User size={15} />
              <span>Profile Settings</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs"
            >
              <span>+ Enroll in New Course</span>
            </Link>
          </div>
        </div>

        {/* TAB 1: ENROLLMENTS */}
        {activeTab === 'enrollments' && (
          <div className="space-y-6">
            {enrollments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrollments.map((enr) => {
                  const course = courseService.getCourseById(enr.courseId);
                  const isCompleted = enr.progress === 100 || enr.status === 'Completed';
                  const cert = certificates.find((c) => c.enrollmentId === enr.id || c.courseId === enr.courseId);

                  return (
                    <div
                      key={enr.id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow"
                    >
                      <div className="space-y-3">
                        {/* Course & Status Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 uppercase">
                              ID: {enr.id}
                            </span>
                            <h3 className="font-bold text-base text-slate-900 line-clamp-1">
                              {course ? course.title : enr.courseId}
                            </h3>
                          </div>

                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 ${
                              isCompleted
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}
                          >
                            {enr.status}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs text-slate-600">
                            <span>Curriculum Progress</span>
                            <span className="font-bold text-slate-900">{enr.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                isCompleted
                                  ? 'bg-emerald-500'
                                  : 'bg-gradient-to-r from-blue-600 to-cyan-500'
                              }`}
                              style={{ width: `${enr.progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Lessons completed count */}
                        <div className="text-[11px] text-slate-500 flex items-center justify-between">
                          <span>{enr.completedLessons.length} lessons finished</span>
                          <span>Enrolled: {new Date(enr.enrollmentDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                        <Link
                          to={`/learning/${enr.id}`}
                          className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                        >
                          <span>{isCompleted ? 'Review Course' : 'Continue Course'}</span>
                          <ChevronRight size={14} />
                        </Link>

                        {isCompleted && (
                          <button
                            onClick={() => {
                              if (cert) {
                                handleViewCert(cert);
                              } else {
                                handleGenerateCertificate(enr);
                              }
                            }}
                            className="inline-flex items-center gap-1 py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 text-xs font-semibold transition-colors"
                            title="Certificate of Completion"
                          >
                            <Award size={14} className="text-amber-600" />
                            <span>{cert ? 'View Cert' : 'Get Cert'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">No course enrollments yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Explore our industry-aligned course catalogue and enroll in technical tracks to start learning.
                </p>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md"
                >
                  <span>Browse Available Courses</span>
                  <ChevronRight size={15} />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CERTIFICATES */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            {certificates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 size={13} />
                          <span>Status: {cert.verificationStatus}</span>
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          Issued: {cert.issueDate}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-lg text-slate-900">{cert.courseTitle}</h4>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">ID: {cert.id}</p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                        <p>
                          Recipient: <strong className="text-slate-900">{cert.studentName}</strong>
                        </p>
                        <p>
                          Signatory: <strong className="text-slate-900">{cert.signatoryName}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <Link
                        to={`/verify/${cert.id}`}
                        className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:underline font-semibold"
                      >
                        <ShieldCheck size={14} />
                        <span>Public Verification Link</span>
                      </Link>

                      <button
                        onClick={() => handleViewCert(cert)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-sm transition-colors"
                      >
                        <Download size={14} />
                        <span>Download Certificate</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
                <Award className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">No certificates earned yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Complete 100% of any enrolled course to unlock your official Certificate of Completion with a unique QR code.
                </p>
                <button
                  onClick={() => setActiveTab('enrollments')}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs"
                >
                  View My Enrollments
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PROFILE SETTINGS */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">Student Profile Information</h3>
              <p className="text-xs text-slate-500">
                Update the name displayed on your certificates and your contact information.
              </p>
            </div>

            {profileSaved && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Profile details updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name (Appears on Certificate)
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={student.email}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 bg-slate-100 text-slate-500 rounded-xl cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={editMobile}
                  onChange={(e) => setEditMobile(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700"
                >
                  <LogOut size={14} />
                  <span>Logout from Session</span>
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30 transition-all"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <CertificatePDFGenerator
          certificate={selectedCert}
          isOpen={certModalOpen}
          onClose={() => setCertModalOpen(false)}
        />
      )}
    </div>
  );
};
