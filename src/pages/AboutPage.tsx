import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Target,
  Award,
  BookOpen,
  Laptop,
  CheckCircle2,
  ArrowRight,
  Users,
  Code2,
  Workflow,
} from 'lucide-react';
import { companyConfigService } from '../services/companyConfigService';

export const AboutPage: React.FC = () => {
  const config = companyConfigService.getConfig();

  return (
    <div className="space-y-16 pb-20">
      {/* Page Header */}
      <section className="bg-[#0B192C] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-cyan-400 border border-cyan-500/30">
            <Sparkles size={14} />
            <span>About Us</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-white">
            Engineering Digital Systems & Empowering Tech Professionals
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            GWPR Private Limited is a modern technology organisation operating at the intersection of enterprise software engineering, digital transformation, and practical technical career development.
          </p>
        </div>
      </section>

      {/* Company Intro & Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Company Introduction & Identity
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Founded to provide dependable, high-calibre digital solutions and transparent skill training, <strong>GWPR Private Limited</strong> serves two fundamental customer groups: enterprises requiring scalable digital presence, and ambitious individuals seeking career advancement.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              We reject passive theoretical lectures. Technology is best understood through active implementation, continuous iteration, and architectural feedback. Our courses reflect this conviction through hands-on exercises, structured modules, and verifiable credentials.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Target size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Our Mission</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To empower organizations with high-performing digital systems and provide learners with industry-relevant, practical education backed by verifiable digital credentials.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
                  <Workflow size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Our Vision</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To be an ethical, premier technology company renowned for engineering craftsmanship, honest mentorship, and transparent skill verification.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B192C] to-slate-900 text-white p-8 rounded-3xl border border-slate-700 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck size={22} className="text-cyan-400" />
              <span>Core Company Commitments</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Zero Fabricated Claims</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    We maintain absolute transparency regarding our curriculum, company credentials, and prototype features.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Production-Grade Standards</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Our digital services adopt modern tools like React, TypeScript, and cloud-native architecture.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Verifiable Learning Credentials</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Every certificate includes unique IDs and dynamic QR codes for public validation.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700 text-xs text-slate-400">
              <p>Corporate CIN: U72900KA2024PTC189234</p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Pillars Grid */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/60 px-3 py-1 rounded-full">
              Dual Verticals
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              What We Do at GWPR Private Limited
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vertical 1 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <Laptop size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">1. Digital Transformation Services</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We design and build bespoke web platforms, e-commerce systems, conversion-driven landing funnels, and search engine optimization campaigns. We also provide ongoing service level agreements (SLAs) for security patches and maintenance.
              </p>
              <div className="pt-2">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  <span>Explore Digital Services</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Vertical 2 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center shadow-md">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">2. Technical Training & Career Development</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We equip students and working professionals with industry-relevant competencies across Machine Learning, Full Stack Web Development, Python, SQL, Cloud Computing, and Power BI, followed by verifiable certificate issuance.
              </p>
              <div className="pt-2">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 hover:text-cyan-700"
                >
                  <span>Explore Course Catalogue</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
