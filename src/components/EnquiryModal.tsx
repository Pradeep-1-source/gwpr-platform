import React, { useState } from 'react';
import { X, Send, MessageSquare, CheckCircle, ShieldCheck } from 'lucide-react';
import { companyConfigService } from '../services/companyConfigService';

import { supabaseDataService } from '../services/supabaseDataService';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceOrCourseTitle?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  serviceOrCourseTitle = 'General Enquiry',
}) => {
  const config = companyConfigService.getConfig();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await supabaseDataService.submitEnquiry({
        fullName,
        email,
        mobile,
        interest: serviceOrCourseTitle,
        message,
      });
    } catch (err) {
      console.warn('Supabase enquiry error:', err);
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = `Hello GWPR Team, I am inquiring regarding: ${serviceOrCourseTitle}. My name is ${fullName || 'a prospective client'}.`;
    window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName('');
    setEmail('');
    setMobile('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-700 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#0B192C] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
              Enquiry & Consultation
            </span>
            <h3 className="font-bold text-base sm:text-lg text-white">
              {serviceOrCourseTitle}
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle size={32} />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Enquiry Received!</h4>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Thank you, <strong>{fullName}</strong>. Your enquiry has been received. Our team will get in touch with you shortly. You may also connect with us directly via WhatsApp.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-600/30"
              >
                <MessageSquare size={16} />
                <span>Chat via WhatsApp</span>
              </button>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="bg-blue-50 border border-blue-200/80 rounded-lg p-3 text-xs text-blue-900 flex items-start gap-2">
              <ShieldCheck size={16} className="text-blue-600 shrink-0 mt-0.5" />
              <span>
                Enquiries are routed to GWPR specialists. You can also chat directly via WhatsApp below.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Project or Training Scope
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Briefly describe your requirements, timeline, or questions..."
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-emerald-500 text-emerald-700 hover:bg-emerald-50 text-xs font-semibold transition-colors"
              >
                <MessageSquare size={15} />
                <span>Quick WhatsApp</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30 transition-all"
                >
                  <Send size={14} />
                  <span>Submit Enquiry</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
