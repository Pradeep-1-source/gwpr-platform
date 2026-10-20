import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';
import { companyConfigService } from '../services/companyConfigService';

export const Footer: React.FC = () => {
  const config = companyConfigService.getConfig();

  return (
    <footer className="bg-[#FAF9F6] text-slate-600 border-t border-slate-200">
      {/* Top CTA Banner */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50/70 via-white to-slate-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Ready to accelerate your tech career or digitize your business?
            </h3>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Connect with GWPR specialists for enterprise web solutions, digital campaigns, or career certification cohorts.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/courses"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20"
            >
              Explore Courses
            </Link>
            <a
              href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
                'Hello GWPR team, I would like to enquire about your services and courses.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-md shadow-emerald-600/20"
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
                <h4 className="font-extrabold text-lg text-slate-900">GWPR PRIVATE LIMITED</h4>
                <p className="text-xs text-blue-600 font-semibold">Digital Services & Career Education</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              GWPR Private Limited delivers full-lifecycle website development, modern UI/UX design, digital marketing campaigns, and hands-on technical training for future-ready professionals.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-blue-600 shrink-0 mt-0.5" />
                <span>{config.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-blue-600 shrink-0" />
                <a href={`mailto:${config.contactEmail}`} className="hover:text-blue-600 transition-colors">
                  {config.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-blue-600 shrink-0" />
                <a href={`tel:${config.contactPhone}`} className="hover:text-blue-600 transition-colors">
                  {config.contactPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h5 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">Our Services</h5>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <Link to="/services" className="hover:text-blue-600 transition-colors">
                  Website Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 transition-colors">
                  E-commerce Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 transition-colors">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 transition-colors">
                  Search Engine Optimization (SEO)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 transition-colors">
                  Meta Ads & Performance Marketing
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 transition-colors">
                  Website Maintenance & SLA
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses Column */}
          <div>
            <h5 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">Technical Courses</h5>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <Link to="/courses" className="hover:text-blue-600 transition-colors">
                  Machine Learning (ML)
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-blue-600 transition-colors">
                  Full Stack Web Development
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-blue-600 transition-colors">
                  Artificial Intelligence (AI/ML)
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-blue-600 transition-colors">
                  Python & SQL Mastery
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-blue-600 transition-colors">
                  Java Full Stack Development
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-blue-600 transition-colors">
                  AWS Cloud Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links & Verification */}
          <div>
            <h5 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">Student & Portal</h5>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <Link to="/verify" className="hover:text-blue-600 transition-colors flex items-center gap-1.5 font-semibold text-blue-600">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>Verify Certificate</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-600 transition-colors">
                  Student Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-600 transition-colors">
                  Enrollment Registration
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600 transition-colors">
                  About GWPR
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-600 transition-colors">
                  Contact & Enquiry
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} GWPR Private Limited. All rights reserved.</p>
          <p>CIN: U72900KA2024PTC189234 | Built for Professional Excellence</p>
        </div>
      </div>
    </footer>
  );
};
