import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ExternalLink,
  MessageSquare,
  Award,
  Globe,
  CheckCircle2,
} from 'lucide-react';
import { companyConfigService } from '../services/companyConfigService';

export const Footer: React.FC = () => {
  const config = companyConfigService.getConfig();

  return (
    <footer className="bg-[#0B192C] text-slate-300 border-t border-slate-800">
      {/* Top CTA Banner */}
      <div className="border-b border-slate-800/80 bg-gradient-to-r from-blue-950/60 via-[#0B192C] to-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Ready to accelerate your tech career or digitize your business?
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Connect with GWPR specialists for enterprise web solutions, digital campaigns, or career certification cohorts.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/courses"
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/30"
            >
              Explore Courses
            </Link>
            <a
              href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
                'Hello GWPR team, I would like to enquire about your services and courses.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-md shadow-emerald-600/30"
            >
              <MessageSquare size={16} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-[#0B192C] rounded-[10px] flex items-center justify-center p-1.5">
                  <img src="/gwpr-logo.svg" alt="GWPR Logo" className="w-full h-full object-contain" />
                </div>
              </div>
              <div>
                <h4 className="font-extrabold text-lg text-white">GWPR PRIVATE LIMITED</h4>
                <p className="text-xs text-cyan-400 font-medium">Digital Services & Career Education</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              GWPR Private Limited delivers full-lifecycle website development, modern UI/UX design, digital marketing campaigns, and hands-on technical training for future-ready professionals.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                <span>{config.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-cyan-400 shrink-0" />
                <a href={`mailto:${config.contactEmail}`} className="hover:text-white transition-colors">
                  {config.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-cyan-400 shrink-0" />
                <a href={`tel:${config.contactPhone}`} className="hover:text-white transition-colors">
                  {config.contactPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h5 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Our Services</h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/services" className="hover:text-cyan-400 transition-colors">
                  Website Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-400 transition-colors">
                  E-commerce Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-400 transition-colors">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-400 transition-colors">
                  Search Engine Optimization (SEO)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-400 transition-colors">
                  Meta Ads & Performance Marketing
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-400 transition-colors">
                  Website Maintenance & SLA
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses Column */}
          <div>
            <h5 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Technical Courses</h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/courses" className="hover:text-cyan-400 transition-colors">
                  Machine Learning (ML)
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-cyan-400 transition-colors">
                  Full Stack Web Development
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-cyan-400 transition-colors">
                  Artificial Intelligence (AI/ML)
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-cyan-400 transition-colors">
                  Python & SQL Mastery
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-cyan-400 transition-colors">
                  Java Full Stack Development
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-cyan-400 transition-colors">
                  AWS Cloud Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links & Verification */}
          <div>
            <h5 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Student & Portal</h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/verify" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>Verify Certificate</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-cyan-400 transition-colors">
                  Student Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-cyan-400 transition-colors">
                  Enrollment Registration
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">
                  About GWPR
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact & Enquiry
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-amber-400/80 hover:text-amber-400 transition-colors">
                  Admin Demo Panel
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500 leading-relaxed flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center md:text-left max-w-3xl">
            <strong>Prototype Disclaimer:</strong> This portal is a frontend demonstration using browser LocalStorage. No guaranteed job placement, government recognition, or third-party accreditation is claimed or fabricated. Universal certificate verification requires backend database synchronization.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] bg-slate-800 text-slate-400 border border-slate-700">
              Frontend Demo Prototype
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} GWPR Private Limited. All rights reserved.</p>
          <p>CIN: U72900KA2024PTC189234 | Built for Professional Excellence</p>
        </div>
      </div>
    </footer>
  );
};
