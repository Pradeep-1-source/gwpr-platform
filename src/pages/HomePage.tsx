import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Award,
  Laptop,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Layers,
  Search,
  Code2,
  Target,
  MessageSquare,
  FileCheck,
  Send,
  Zap,
} from 'lucide-react';
import { courseService } from '../services/courseService';
import { enrollmentService } from '../services/enrollmentService';
import { authService } from '../services/authService';
import { INITIAL_SERVICES } from '../data/initialData';
import { CourseCard } from '../components/CourseCard';
import { CourseDetailModal } from '../components/CourseDetailModal';
import { ServiceCard } from '../components/ServiceCard';
import { EnquiryModal } from '../components/EnquiryModal';
import { Course } from '../types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const allCourses = courseService.getAllCourses();
  const featuredCourses = allCourses.filter((c) => c.featured);
  const student = authService.getCurrentStudent();

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquirySubject, setEnquirySubject] = useState('Website Development Services');
  const [verifyInput, setVerifyInput] = useState('');
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  const handleOpenCourse = (course: Course) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const handleEnroll = (courseId: string) => {
    if (!student) {
      navigate('/login?redirect=' + encodeURIComponent(`/courses`));
      return;
    }
    const res = enrollmentService.enrollStudent(student.id, courseId);
    if (res.success) {
      navigate('/dashboard');
    } else {
      alert(res.message);
    }
  };

  const handleOpenEnquiry = (subject: string) => {
    setEnquirySubject(subject);
    setEnquiryModalOpen(true);
  };

  const handleQuickVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyInput.trim()) {
      navigate(`/verify/${encodeURIComponent(verifyInput.trim().toUpperCase())}`);
    } else {
      navigate('/verify');
    }
  };

  const faqs = [
    {
      q: 'What programs and services does GWPR Private Limited offer?',
      a: 'GWPR Private Limited operates two core verticals: (1) Technical Training & Career Certification cohorts covering Software Engineering, Data & AI, Cloud Computing, and Digital Marketing; and (2) Digital Transformation Services including bespoke Website Development, E-commerce Platforms, UI/UX Design, and Performance Marketing.',
    },
    {
      q: 'How does the certificate verification system work?',
      a: 'Every student who completes an eligible course curriculum receives a digital Certificate of Completion with a unique ID (e.g. GWPR-CERT-2026-A7K92X) and a scannable QR code. Anyone can verify credential authenticity on our public verification portal.',
    },
    {
      q: 'Are the certificates accredited by universities or government bodies?',
      a: 'GWPR certificates represent completion of GWPR Private Limited corporate and practical training programs. As transparently stated across this platform, these are proprietary company training credentials and do not claim university degrees or government accreditations.',
    },
    {
      q: 'Can corporate businesses hire GWPR for custom website and marketing solutions?',
      a: 'Yes. Our digital services division builds custom web applications, optimizes SEO, manages Meta Ad campaigns, and provides dedicated monthly maintenance contracts.',
    },
    {
      q: 'How do I mark course lessons completed in the Student Career Portal?',
      a: 'After enrolling in any course via the portal, navigate to your Student Dashboard and click "Continue Course". You can review syllabus modules, complete lessons interactively, and unlock your certificate upon reaching 100% completion.',
    },
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0B192C] text-white pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden border-b border-slate-800">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline and CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-cyan-400 border border-cyan-500/30">
                <Sparkles size={14} className="text-cyan-400" />
                <span>GWPR Private Limited — Corporate & Student Career Portal</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-serif">
                Build Skills. Earn Certifications.{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                  Shape Your Career.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                GWPR Private Limited empowers students and professionals with industry-focused technical training, career development programs, digital marketing, and website development services.
              </p>

              {/* Hero Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5"
                >
                  <BookOpen size={18} />
                  <span>Explore Courses</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to={student ? '/dashboard' : '/login'}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all hover:-translate-y-0.5 shadow-sm"
                >
                  <GraduationCap size={18} className="text-cyan-400" />
                  <span>{student ? 'Student Dashboard' : 'Student Login'}</span>
                </Link>

                <Link
                  to="/verify"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-transparent hover:bg-white/5 text-cyan-300 font-semibold text-sm border border-cyan-500/40 transition-colors"
                >
                  <ShieldCheck size={18} className="text-emerald-400" />
                  <span>Verify Certificate</span>
                </Link>
              </div>

              {/* Honest Metric Highlights (Real to platform capabilities) */}
              <div className="pt-8 border-t border-slate-800 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">11 Tracks</div>
                  <div className="text-xs text-slate-400 mt-0.5">Software, Cloud & AI</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">Verifiable</div>
                  <div className="text-xs text-slate-400 mt-0.5">QR Code Validation</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">9 Services</div>
                  <div className="text-xs text-slate-400 mt-0.5">Enterprise Solutions</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card (Interactive Portal Preview) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/95 p-6 border border-slate-700/80 shadow-2xl backdrop-blur-xl space-y-5">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-cyan-400">
                      <Award size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">GWPR Career Portal</h4>
                      <p className="text-[11px] text-cyan-400">Live Interactive Learning & Credentialing</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Active Cohort
                  </span>
                </div>

                {/* Simulated Student Progress Widget */}
                <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">Machine Learning (ML)</span>
                    <span className="text-emerald-400 font-bold">100% Completed</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full w-full rounded-full" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>6 of 6 Lessons Completed</span>
                    <span className="text-cyan-300 font-medium">Eligible for Certificate</span>
                  </div>
                </div>

                {/* Instant Verification Mini-Card */}
                <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-white rounded">
                      <ShieldCheck size={28} className="text-[#0B192C]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">ID: GWPR-CERT-2026-A7K92X</span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">Student: Aarav Sharma</p>
                    </div>
                  </div>
                  <Link
                    to="/verify/GWPR-CERT-2026-A7K92X"
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-cyan-300 font-medium text-xs border border-cyan-500/30 transition-colors"
                  >
                    <span>Test Instant Verification</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

                {/* Bottom Quick Feature Badges */}
                <div className="flex items-center justify-around text-center text-xs text-slate-400 pt-1">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <span>Self-Paced</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <span>Real Projects</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <span>PDF & Print</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ABOUT GWPR PRIVATE LIMITED SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                <Sparkles size={14} />
                <span>About GWPR Private Limited</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Architecting Modern Digital Solutions & Engineering High-Calibre Tech Talent
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                GWPR Private Limited is a registered private technology entity dedicated to bridging the divide between academic foundations and industrial deployment realities.
              </p>

              <p className="text-sm text-slate-600 leading-relaxed">
                Whether partnering with growing enterprises to build custom web applications, launch high-yield digital ad campaigns, or guiding aspiring developers through practical software engineering roadmaps, our focus is uncompromising engineering rigor and tangible outcomes.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Our Mission</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To deliver reliable, high-performance web solutions and practical, project-based technical education that directly prepares candidates for modern technology environments.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Our Vision</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To emerge as a trusted corporate partner for digital engineering and a premier learning portal recognized for transparent, verifiable technical competencies.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  <span>Learn more about our methodology</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-900 to-[#0B192C] text-white p-6 rounded-2xl shadow-md space-y-3">
                  <Code2 size={28} className="text-cyan-400" />
                  <h4 className="font-bold text-base">Practical-First Focus</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Every module integrates realistic code repositories, exercises, and deployment patterns over passive theory.
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
                  <ShieldCheck size={28} className="text-emerald-600" />
                  <h4 className="font-bold text-base text-slate-900">Verifiable Credentials</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tamper-evident certificate IDs and dynamic QR codes for employers and client reference checks.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
                  <Laptop size={28} className="text-blue-600" />
                  <h4 className="font-bold text-base text-slate-900">Digital Solutions</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Full-spectrum web engineering, e-commerce architectures, UI/UX prototyping, and performance SEO.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-md space-y-3">
                  <Target size={28} className="text-amber-400" />
                  <h4 className="font-bold text-base">Honest Transparency</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Clear demarcation of skills, realistic timelines, and no deceptive placement guarantees.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. POPULAR COURSES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200">
              <BookOpen size={14} />
              <span>Career Development Programs</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Featured Technical Training Cohorts
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Curated by industry practitioners with real-world syllabus modules, practical exercises, and verifiable digital certificates.
            </p>
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-semibold hover:bg-slate-50 transition-all self-start md:self-auto"
          >
            <span>View All 11 Courses</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelect={handleOpenCourse}
              onEnroll={handleEnroll}
              isEnrolled={student ? enrollmentService.isStudentEnrolled(student.id, course.id) : false}
            />
          ))}
        </div>
      </section>

      {/* 4. OUR SERVICES SECTION */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/60 px-3 py-1 rounded-full">
              Enterprise Digital Solutions
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Comprehensive Services for Growing Businesses
            </h2>
            <p className="text-sm text-slate-600">
              From responsive frontend applications to targeted acquisition campaigns and 24/7 web maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INITIAL_SERVICES.slice(0, 6).map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onEnquire={handleOpenEnquiry}
              />
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B192C] hover:bg-slate-800 text-white font-semibold text-xs shadow-md transition-all"
            >
              <span>Explore All 9 Enterprise Services</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. HOW OUR LEARNING PORTAL WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Learning Methodology
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How Our Student Career Portal Works
          </h2>
          <p className="text-sm text-slate-600">
            A seamless, structured pathway from initial enrollment through module completion and verifiable credential issuance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3 relative hover:-translate-y-1 transition-transform">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
              01
            </div>
            <h4 className="font-bold text-slate-900 text-base">Select & Enroll</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Browse our course catalogue, create your student profile, and receive a unique enrollment tracking ID.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3 relative hover:-translate-y-1 transition-transform">
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
              02
            </div>
            <h4 className="font-bold text-slate-900 text-base">Interactive Learning</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Progress through structured modules, reviewing lesson guides, practical code assignments, and quizzes.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3 relative hover:-translate-y-1 transition-transform">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
              03
            </div>
            <h4 className="font-bold text-slate-900 text-base">Complete Milestones</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Track your progress in the Student Dashboard. Reaching 100% completion unlocks official certificate generation.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3 relative hover:-translate-y-1 transition-transform">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
              04
            </div>
            <h4 className="font-bold text-slate-900 text-base">Verify & Export</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Preview your landscape A4 certificate, export high-res PDF, print, and share your unique QR verification link.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CERTIFICATE VERIFICATION HIGHLIGHT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0B192C] via-[#102A43] to-[#0B192C] rounded-3xl p-8 sm:p-12 text-white border border-slate-700 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck size={14} />
              <span>Tamper-Resistant Credential Verification</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Instantly Verify Any GWPR Certificate
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Employers, hiring managers, and students can authenticate credentials by entering the unique Certificate ID or scanning the embedded QR code.
            </p>

            {/* Quick Search Form */}
            <form onSubmit={handleQuickVerify} className="flex flex-col sm:flex-row gap-3 pt-2 max-w-xl">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={verifyInput}
                  onChange={(e) => setVerifyInput(e.target.value)}
                  placeholder="Enter ID: e.g. GWPR-CERT-2026-A7K92X"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono uppercase"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all shrink-0"
              >
                <span>Verify Now</span>
                <ArrowRight size={15} />
              </button>
            </form>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="text-cyan-300 font-medium">Try Sample ID:</span>
              <button
                type="button"
                onClick={() => setVerifyInput('GWPR-CERT-2026-A7K92X')}
                className="underline hover:text-white font-mono bg-slate-800/80 px-2 py-1 rounded border border-slate-700"
              >
                GWPR-CERT-2026-A7K92X
              </button>
              <span>•</span>
              <Link to="/verify" className="text-emerald-400 hover:underline flex items-center gap-1 font-medium">
                <span>Open QR Camera Scanner</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Clear information about GWPR Private Limited training programs, certificates, and services.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = faqOpenIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:text-blue-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Modals */}
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

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        serviceOrCourseTitle={enquirySubject}
      />
    </div>
  );
};
