import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  BookOpen,
  Award,
  Users,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Search,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Layers,
  Save,
  Phone,
  Mail,
  Building,
  Database,
  Cloud,
  Copy,
  Check,
  RefreshCw,
} from 'lucide-react';
import { courseService } from '../services/courseService';
import { enrollmentService } from '../services/enrollmentService';
import { certificateService } from '../services/certificateService';
import { authService } from '../services/authService';
import { companyConfigService } from '../services/companyConfigService';
import {
  getStoredSupabaseConfig,
  saveSupabaseConfig,
  clearSupabaseConfig,
  testSupabaseConnection,
  isSupabaseConnected,
} from '../services/supabaseClient';
import { supabaseDataService } from '../services/supabaseDataService';
import { Course, Enrollment, Certificate, DemoStudent, CompanyConfig } from '../types';
import { ResetDataModal } from '../components/ResetDataModal';

export const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'enrollments' | 'certificates' | 'students' | 'config' | 'supabase'>('overview');
  
  const [courses, setCourses] = useState<Course[]>(courseService.getAllCourses());
  const [enrollments, setEnrollments] = useState<Enrollment[]>(enrollmentService.getAllEnrollments());
  const [certificates, setCertificates] = useState<Certificate[]>(certificateService.getAllCertificates());
  const [students, setStudents] = useState<DemoStudent[]>(authService.getAllStudents());
  const [config, setConfig] = useState<CompanyConfig>(companyConfigService.getConfig());

  // Supabase Database Connection State
  const initialSbConfig = getStoredSupabaseConfig();
  const [sbUrl, setSbUrl] = useState(initialSbConfig.url);
  const [sbAnonKey, setSbAnonKey] = useState(initialSbConfig.anonKey);
  const [isSbActive, setIsSbActive] = useState(isSupabaseConnected());
  const [sbTesting, setSbTesting] = useState(false);
  const [sbTestResult, setSbTestResult] = useState<{ connected: boolean; message: string } | null>(null);
  const [sbSyncing, setSbSyncing] = useState(false);
  const [sbSyncMessage, setSbSyncMessage] = useState<string | null>(null);
  const [sqlCopied, setSqlCopied] = useState(false);

  // Search queries
  const [certSearch, setCertSearch] = useState('');
  const [courseSearch, setCourseSearch] = useState('');

  // Course Add/Edit Modal
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formCategory, setFormCategory] = useState<Course['category']>('Software Engineering');
  const [formLevel, setFormLevel] = useState<Course['level']>('Intermediate');
  const [formDuration, setFormDuration] = useState('8 Weeks');
  const [formSkills, setFormSkills] = useState('');

  // Config save status
  const [configSaved, setConfigSaved] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const refreshAll = () => {
    setCourses(courseService.getAllCourses());
    setEnrollments(enrollmentService.getAllEnrollments());
    setCertificates(certificateService.getAllCertificates());
    setStudents(authService.getAllStudents());
    setConfig(companyConfigService.getConfig());
  };

  useEffect(() => {
    refreshAll();
  }, []);

  const handleOpenAddCourse = () => {
    setEditingCourseId(null);
    setFormTitle('');
    setFormDesc('');
    setFormCategory('Software Engineering');
    setFormLevel('Beginner');
    setFormDuration('8 Weeks');
    setFormSkills('HTML, CSS, JavaScript, React');
    setCourseModalOpen(true);
  };

  const handleOpenEditCourse = (course: Course) => {
    setEditingCourseId(course.id);
    setFormTitle(course.title);
    setFormDesc(course.shortDescription);
    setFormCategory(course.category);
    setFormLevel(course.level);
    setFormDuration(course.duration);
    setFormSkills(course.skills.join(', '));
    setCourseModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = formSkills.split(',').map((s) => s.trim()).filter(Boolean);

    if (editingCourseId) {
      courseService.updateCourse(editingCourseId, {
        title: formTitle,
        shortDescription: formDesc,
        category: formCategory,
        level: formLevel,
        duration: formDuration,
        skills: skillsArray,
      });
    } else {
      courseService.addCourse({
        title: formTitle,
        shortDescription: formDesc,
        description: formDesc,
        category: formCategory,
        level: formLevel,
        duration: formDuration,
        skills: skillsArray,
        badgeColor: 'bg-blue-600',
        certificateEligible: true,
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
        learningOutcomes: ['Understand key architectural concepts', 'Complete hands-on assignments'],
        syllabus: [
          {
            id: 'm1',
            title: 'Module 1: Core Foundations',
            description: 'Introduction and fundamental concepts.',
            lessons: [
              { id: 'l1', title: 'Lesson 1: Getting Started', duration: '45 mins', description: 'Overview and setup.', content: 'Welcome to this newly added track.' }
            ]
          }
        ]
      });
    }

    setCourseModalOpen(false);
    refreshAll();
  };

  const handleDeleteCourse = (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove "${title}" from the demo catalog?`)) {
      courseService.deleteCourse(id);
      refreshAll();
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    companyConfigService.updateConfig(config);
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 2500);
  };

  // --- SUPABASE ACTIONS ---
  const handleSaveSupabase = async (e: React.FormEvent) => {
    e.preventDefault();
    saveSupabaseConfig(sbUrl, sbAnonKey);
    setIsSbActive(isSupabaseConnected());
    setSbTesting(true);
    const res = await testSupabaseConnection();
    setSbTestResult(res);
    setSbTesting(false);
  };

  const handleTestSupabase = async () => {
    setSbTesting(true);
    setSbTestResult(null);
    const res = await testSupabaseConnection();
    setSbTestResult(res);
    setIsSbActive(res.connected);
    setSbTesting(false);
  };

  const handleDisconnectSupabase = () => {
    clearSupabaseConfig();
    setSbUrl('');
    setSbAnonKey('');
    setIsSbActive(false);
    setSbTestResult(null);
    setSbSyncMessage(null);
  };

  const handleSyncInitialData = async () => {
    setSbSyncing(true);
    setSbSyncMessage(null);
    const res = await supabaseDataService.seedAllToSupabase();
    setSbSyncMessage(res.message);
    setSbSyncing(false);
  };

  const handleCopySql = () => {
    const sqlText = `-- GWPR Private Limited Schema
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT NOT NULL,
  duration TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  badge_color TEXT NOT NULL DEFAULT 'bg-blue-600',
  skills JSONB NOT NULL DEFAULT '[]'::jsonb,
  syllabus JSONB NOT NULL DEFAULT '[]'::jsonb,
  learning_outcomes JSONB NOT NULL DEFAULT '[]'::jsonb,
  certificate_eligible BOOLEAN NOT NULL DEFAULT TRUE,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.students (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  mobile TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.enrollments (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  enrollment_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  progress INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Enrolled',
  completed_lessons JSONB NOT NULL DEFAULT '[]'::jsonb,
  completion_date TIMESTAMPTZ,
  CONSTRAINT unique_student_course UNIQUE (student_id, course_id)
);

CREATE TABLE IF NOT EXISTS public.certificates (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  course_title TEXT NOT NULL,
  enrollment_id TEXT REFERENCES public.enrollments(id) ON DELETE SET NULL,
  completion_date TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  verification_status TEXT NOT NULL DEFAULT 'Valid',
  signatory_name TEXT NOT NULL,
  signatory_title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  verification_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.enquiries (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  interest TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Public can view certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public can insert enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Full access courses" ON public.courses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access certificates" ON public.certificates FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access students" ON public.students FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access enrollments" ON public.enrollments FOR ALL USING (true) WITH CHECK (true);
`;
    navigator.clipboard.writeText(sqlText);
    setSqlCopied(true);
    setTimeout(() => setSqlCopied(false), 2500);
  };

  const filteredCerts = certificates.filter(
    (c) =>
      c.id.toLowerCase().includes(certSearch.toLowerCase()) ||
      c.studentName.toLowerCase().includes(certSearch.toLowerCase()) ||
      c.courseTitle.toLowerCase().includes(certSearch.toLowerCase())
  );

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.category.toLowerCase().includes(courseSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Banner */}
      <section className="bg-[#0B192C] text-white py-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
                <ShieldAlert size={14} />
                <span>Unsecured Frontend Prototype Demo Mode</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                Admin Demonstration Workspace
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Manage demo courses, inspect LocalStorage enrollments, search issued certificates, and configure branding.
              </p>
            </div>

            <button
              onClick={() => setResetModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold border border-slate-700 transition-colors self-start md:self-auto"
            >
              <RotateCcw size={15} />
              <span>Reset All Demo Data</span>
            </button>
          </div>
        </div>
      </section>

      {/* Workspace Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Overview & Stats
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'courses'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Course Catalogue ({courses.length})
          </button>

          <button
            onClick={() => setActiveTab('enrollments')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'enrollments'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Demo Enrollments ({enrollments.length})
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'certificates'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Issued Certificates ({certificates.length})
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'students'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Demo Students ({students.length})
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'config'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Company & Cert Settings
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'supabase'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:text-slate-900 border border-emerald-300 hover:bg-emerald-50/50'
            }`}
          >
            <Database size={14} className={activeTab === 'supabase' ? 'text-white' : 'text-emerald-600'} />
            <span>Supabase Database</span>
            <span
              className={`w-2 h-2 rounded-full ${
                isSbActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-300'
              }`}
            />
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 font-medium">Courses in Catalog</span>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">{courses.length}</p>
                <span className="text-[11px] text-blue-600 font-medium">Across 5 technology categories</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 font-medium">Demo Enrollments</span>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">{enrollments.length}</p>
                <span className="text-[11px] text-emerald-600 font-medium">Active in browser storage</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 font-medium">Completed Courses</span>
                <p className="text-3xl font-extrabold text-emerald-600 mt-1">
                  {enrollments.filter((e) => e.status === 'Completed').length}
                </p>
                <span className="text-[11px] text-slate-400">100% curriculum completion</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 font-medium">Certificates Issued</span>
                <p className="text-3xl font-extrabold text-cyan-600 mt-1">{certificates.length}</p>
                <span className="text-[11px] text-slate-400">With unique QR codes</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Prototype Architecture Overview</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                This administrative view demonstrates how courses, enrollments, and certificate registries are configured. When moving to production on Vercel with a backend, role-based access control (RBAC), multi-tenant schemas, and secured server-side verification APIs can be attached directly to this schema.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: COURSE CATALOGUE MANAGEMENT */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                  placeholder="Filter courses..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <button
                onClick={handleOpenAddCourse}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs"
              >
                <Plus size={16} />
                <span>Add New Course</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-800 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3.5">Course Title</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Level</th>
                      <th className="p-3.5">Duration</th>
                      <th className="p-3.5">Lessons</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCourses.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50">
                        <td className="p-3.5 font-bold text-slate-900">{c.title}</td>
                        <td className="p-3.5">{c.category}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700">
                            {c.level}
                          </span>
                        </td>
                        <td className="p-3.5">{c.duration}</td>
                        <td className="p-3.5">
                          {c.syllabus.reduce((acc, m) => acc + m.lessons.length, 0)}
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditCourse(c)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(c.id, c.title)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DEMO ENROLLMENTS */}
        {activeTab === 'enrollments' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-800 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5">Enrollment ID</th>
                    <th className="p-3.5">Student ID</th>
                    <th className="p-3.5">Course</th>
                    <th className="p-3.5">Progress</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {enrollments.map((enr) => {
                    const c = courses.find((item) => item.id === enr.courseId);
                    return (
                      <tr key={enr.id} className="hover:bg-slate-50">
                        <td className="p-3.5 font-mono font-bold text-slate-900">{enr.id}</td>
                        <td className="p-3.5 font-mono text-[11px]">{enr.studentId}</td>
                        <td className="p-3.5 font-medium">{c ? c.title : enr.courseId}</td>
                        <td className="p-3.5">
                          <span className="font-bold text-slate-900">{enr.progress}%</span>
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              enr.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-blue-50 text-blue-700'
                            }`}
                          >
                            {enr.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-400">
                          {new Date(enr.enrollmentDate).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ISSUED CERTIFICATES */}
        {activeTab === 'certificates' && (
          <div className="space-y-4">
            <div className="relative max-w-sm">
              <Search size={16} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={certSearch}
                onChange={(e) => setCertSearch(e.target.value)}
                placeholder="Search certificate ID or recipient..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-800 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3.5">Certificate ID</th>
                      <th className="p-3.5">Recipient</th>
                      <th className="p-3.5">Course Program</th>
                      <th className="p-3.5">Issue Date</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCerts.map((cert) => (
                      <tr key={cert.id} className="hover:bg-slate-50">
                        <td className="p-3.5 font-mono font-bold text-blue-900">{cert.id}</td>
                        <td className="p-3.5 font-semibold text-slate-900">{cert.studentName}</td>
                        <td className="p-3.5">{cert.courseTitle}</td>
                        <td className="p-3.5">{cert.completionDate}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700 font-semibold">
                            {cert.verificationStatus}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <a
                            href={`/verify/${cert.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600 hover:underline font-semibold"
                          >
                            <span>Open Route</span>
                            <ExternalLink size={12} />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: DEMO STUDENTS */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-800 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5">Student ID</th>
                    <th className="p-3.5">Full Name</th>
                    <th className="p-3.5">Email</th>
                    <th className="p-3.5">Mobile</th>
                    <th className="p-3.5">Registered On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((std) => (
                    <tr key={std.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-mono text-[11px]">{std.id}</td>
                      <td className="p-3.5 font-bold text-slate-900">{std.fullName}</td>
                      <td className="p-3.5">{std.email}</td>
                      <td className="p-3.5">{std.mobile}</td>
                      <td className="p-3.5 text-slate-400">
                        {new Date(std.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: COMPANY & BRANDING CONFIGURATION */}
        {activeTab === 'config' && (
          <div className="max-w-2xl bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">Certificate & Company Details</h3>
              <p className="text-xs text-slate-500">
                These settings update certificate template headings, authorized signatures, and contact endpoints across the website.
              </p>
            </div>

            {configSaved && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Configuration changes saved successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveConfig} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={config.companyName}
                  onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Legal Name & CIN</label>
                <input
                  type="text"
                  required
                  value={config.legalName}
                  onChange={(e) => setConfig({ ...config, legalName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Signatory Name</label>
                  <input
                    type="text"
                    required
                    value={config.signatoryName}
                    onChange={(e) => setConfig({ ...config, signatoryName: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Signatory Title</label>
                  <input
                    type="text"
                    required
                    value={config.signatoryTitle}
                    onChange={(e) => setConfig({ ...config, signatoryTitle: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Email</label>
                  <input
                    type="email"
                    required
                    value={config.contactEmail}
                    onChange={(e) => setConfig({ ...config, contactEmail: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Number (e.g. 918049201800)</label>
                  <input
                    type="text"
                    required
                    value={config.whatsappNumber}
                    onChange={(e) => setConfig({ ...config, whatsappNumber: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Base Verification Domain URL</label>
                <input
                  type="text"
                  required
                  value={config.baseUrl}
                  onChange={(e) => setConfig({ ...config, baseUrl: e.target.value })}
                  placeholder="https://your-domain.vercel.app"
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Encoded into certificate QR codes. Can be replaced with your live Vercel URL upon deployment.
                </span>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 7: SUPABASE CLOUD DATABASE CONFIGURATION & SYNC */}
        {activeTab === 'supabase' && (
          <div className="space-y-8 max-w-3xl">
            {/* Status Card */}
            <div className={`p-6 rounded-3xl border shadow-sm transition-all ${
              isSbActive
                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-950'
                : 'bg-white border-slate-200 text-slate-800'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    isSbActive ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <Database size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        isSbActive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'
                      }`} />
                      <h3 className="font-bold text-base text-slate-900">
                        {isSbActive ? 'Connected to Supabase Cloud Database' : 'LocalStorage Demo Mode (Supabase Disconnected)'}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isSbActive
                        ? 'Universal certificate QR verification & cloud data persistence active.'
                        : 'Connect your Supabase project to enable cloud database synchronization across all devices.'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleTestSupabase}
                  disabled={sbTesting || !sbUrl}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs disabled:opacity-50"
                >
                  <RefreshCw size={14} className={sbTesting ? 'animate-spin' : ''} />
                  <span>{sbTesting ? 'Testing...' : 'Test Connection'}</span>
                </button>
              </div>

              {/* Test Result Message */}
              {sbTestResult && (
                <div className={`mt-4 p-3.5 rounded-xl text-xs flex items-start gap-2.5 border ${
                  sbTestResult.connected
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-red-50 text-red-800 border-red-200'
                }`}>
                  {sbTestResult.connected ? <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-emerald-600" /> : <ShieldAlert size={16} className="shrink-0 mt-0.5 text-red-600" />}
                  <span className="leading-relaxed">{sbTestResult.message}</span>
                </div>
              )}
            </div>

            {/* Supabase Connection Credentials Form */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Supabase Project Credentials</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Get these from your Supabase Dashboard: <strong>Project Settings → API</strong>.
                </p>
              </div>

              <form onSubmit={handleSaveSupabase} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Supabase Project URL
                  </label>
                  <input
                    type="url"
                    required
                    value={sbUrl}
                    onChange={(e) => setSbUrl(e.target.value)}
                    placeholder="https://your-project-id.supabase.co"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Also configurable via <code className="bg-slate-100 px-1 py-0.5 rounded">VITE_SUPABASE_URL</code> in <code className="bg-slate-100 px-1 py-0.5 rounded">.env</code>.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Supabase Anon / Public Key
                  </label>
                  <input
                    type="password"
                    required
                    value={sbAnonKey}
                    onChange={(e) => setSbAnonKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Also configurable via <code className="bg-slate-100 px-1 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code> in <code className="bg-slate-100 px-1 py-0.5 rounded">.env</code>.
                  </span>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                  {isSbActive && (
                    <button
                      type="button"
                      onClick={handleDisconnectSupabase}
                      className="text-xs text-red-600 hover:text-red-700 font-semibold"
                    >
                      Disconnect Supabase
                    </button>
                  )}

                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/30 transition-all"
                    >
                      Save & Connect
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* 1-Click Initial Data Synchronization */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">1-Click Seed Data Migration</h3>
                  <p className="text-xs text-slate-500 mt-0.5 max-w-xl leading-relaxed">
                    Populate your Supabase cloud database with all 11 course curriculums, demo student Aarav Sharma, initial enrollments, and sample certificate <strong>GWPR-CERT-2026-A7K92X</strong>.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSyncInitialData}
                  disabled={sbSyncing || !isSbActive}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/25 transition-all disabled:opacity-50 shrink-0"
                >
                  <Cloud size={16} className={sbSyncing ? 'animate-bounce' : ''} />
                  <span>{sbSyncing ? 'Synchronizing...' : 'Sync All Data to Supabase'}</span>
                </button>
              </div>

              {sbSyncMessage && (
                <div className="p-3.5 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 text-xs flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                  <span>{sbSyncMessage}</span>
                </div>
              )}
            </div>

            {/* SQL Migration Script Box */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Supabase SQL Schema Script</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Run this script once in your Supabase project's <strong>SQL Editor</strong> to create tables & policies.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopySql}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors"
                >
                  {sqlCopied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  <span>{sqlCopied ? 'Copied to Clipboard!' : 'Copy SQL Schema'}</span>
                </button>
              </div>

              <div className="relative">
                <pre className="bg-slate-950 text-slate-200 text-[11px] p-4 rounded-xl font-mono overflow-x-auto max-h-48 border border-slate-800 leading-relaxed">
{`-- 1. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT NOT NULL,
  duration TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  badge_color TEXT NOT NULL DEFAULT 'bg-blue-600',
  skills JSONB NOT NULL DEFAULT '[]'::jsonb,
  syllabus JSONB NOT NULL DEFAULT '[]'::jsonb,
  learning_outcomes JSONB NOT NULL DEFAULT '[]'::jsonb,
  certificate_eligible BOOLEAN NOT NULL DEFAULT TRUE,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. CERTIFICATES TABLE (Universal Public QR Verification)
CREATE TABLE IF NOT EXISTS public.certificates (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  student_name TEXT NOT NULL,
  course_id TEXT NOT NULL,
  course_title TEXT NOT NULL,
  enrollment_id TEXT,
  completion_date TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  verification_status TEXT NOT NULL DEFAULT 'Valid',
  signatory_name TEXT NOT NULL,
  signatory_title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  verification_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. STUDENTS & ENROLLMENTS & ENQUIRIES TABLES
CREATE TABLE IF NOT EXISTS public.students (id TEXT PRIMARY KEY, full_name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, mobile TEXT NOT NULL, avatar_url TEXT, created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS public.enrollments (id TEXT PRIMARY KEY, student_id TEXT NOT NULL, course_id TEXT NOT NULL, enrollment_date TIMESTAMPTZ DEFAULT NOW(), progress INTEGER DEFAULT 0, status TEXT DEFAULT 'Enrolled', completed_lessons JSONB DEFAULT '[]'::jsonb, completion_date TIMESTAMPTZ);
CREATE TABLE IF NOT EXISTS public.enquiries (id BIGSERIAL PRIMARY KEY, full_name TEXT NOT NULL, email TEXT NOT NULL, mobile TEXT NOT NULL, interest TEXT NOT NULL, message TEXT, created_at TIMESTAMPTZ DEFAULT NOW());

-- ENABLE RLS & PUBLIC POLICIES
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Public view certs" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public insert enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);`}
                </pre>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <span>The complete schema file is also saved at</span>
                <code className="text-blue-700 bg-blue-50 px-1 py-0.5 rounded">d:\inter cer\supabase_schema.sql</code>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Add / Edit Course Modal */}
      {courseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-700">
            <div className="bg-[#0B192C] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-sm sm:text-base">
                {editingCourseId ? 'Edit Course Details' : 'Add New Course to Catalog'}
              </h3>
              <button onClick={() => setCourseModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Data & AI">Data & AI</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Emerging Tech">Emerging Tech</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Level</label>
                  <select
                    value={formLevel}
                    onChange={(e) => setFormLevel(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Duration</label>
                <input
                  type="text"
                  required
                  value={formDuration}
                  onChange={(e) => setFormDuration(e.target.value)}
                  placeholder="e.g. 10 Weeks"
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  required
                  value={formSkills}
                  onChange={(e) => setFormSkills(e.target.value)}
                  placeholder="React, TypeScript, CSS"
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCourseModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Modal */}
      <ResetDataModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onSuccess={refreshAll}
      />
    </div>
  );
};
