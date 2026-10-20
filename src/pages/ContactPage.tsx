import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  CheckCircle2,
  ShieldAlert,
  Clock,
  Sparkles,
} from 'lucide-react';
import { companyConfigService } from '../services/companyConfigService';

import { supabaseDataService } from '../services/supabaseDataService';

export const ContactPage: React.FC = () => {
  const config = companyConfigService.getConfig();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [interest, setInterest] = useState('Website Development');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Insert into Supabase database (and fallback if offline)
    try {
      await supabaseDataService.submitEnquiry({
        fullName,
        email,
        mobile,
        interest,
        message,
      });
    } catch (err) {
      console.warn('Supabase enquiry error:', err);
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = `Hello GWPR Team, I am inquiring regarding: ${interest}. Name: ${fullName || 'A client'}.`;
    window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-[#0B192C] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-cyan-400 border border-cyan-500/30">
            <Sparkles size={14} />
            <span>Connect with GWPR</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-white">
            Contact & Consultation Enquiry
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Have questions about digital transformation services, cohort admissions, or enterprise training programs? Reach out to our team.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Registered Office & Contact</h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Office Address</h4>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{config.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Admissions & Business Email</h4>
                    <a href={`mailto:${config.contactEmail}`} className="text-blue-600 hover:underline">
                      {config.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Direct Telephone</h4>
                    <a href={`tel:${config.contactPhone}`} className="text-slate-900 hover:text-blue-600">
                      {config.contactPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Operating Hours</h4>
                    <p className="text-slate-600 mt-0.5">Monday to Friday: 9:30 AM – 6:30 PM IST</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-600/25"
                >
                  <MessageSquare size={16} />
                  <span>Start WhatsApp Conversation</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Send an Enquiry Message</h2>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-950">Message Simulated & Received</h3>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                    Thank you, <strong>{fullName}</strong>. Since this is an initial frontend prototype, this demonstration does not transmit data over an active SMTP/mail server. To initiate an actual live conversation with the team right now, please use WhatsApp:
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={handleWhatsApp}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md"
                    >
                      <MessageSquare size={15} />
                      <span>Chat on WhatsApp</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Area of Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <optgroup label="Enterprise Digital Services">
                        <option value="Website Development">Website Development</option>
                        <option value="E-commerce Development">E-commerce Development</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Digital Marketing & SEO">Digital Marketing & SEO</option>
                        <option value="Meta Ads & Lead Generation">Meta Ads & Lead Generation</option>
                        <option value="Website Maintenance SLA">Website Maintenance SLA</option>
                      </optgroup>
                      <optgroup label="Technical Training & Cohorts">
                        <option value="Machine Learning (ML)">Machine Learning (ML)</option>
                        <option value="Full Stack Web Development">Full Stack Web Development</option>
                        <option value="AI / ML Advanced">Artificial Intelligence & ML</option>
                        <option value="AWS Cloud Architecture">AWS Cloud Architecture</option>
                        <option value="Python & SQL Programs">Python & SQL Programs</option>
                        <option value="Java Full Stack Development">Java Full Stack Development</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Message / Project Details
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please tell us about your project requirements, target goals, or training questions..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      <ShieldAlert size={14} className="text-amber-500 shrink-0" />
                      <span>Frontend demo simulation disclaimer applies.</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/30 transition-all"
                    >
                      <Send size={15} />
                      <span>Submit Enquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
