import React, { useState } from 'react';
import { INITIAL_SERVICES } from '../data/initialData';
import { ServiceCard } from '../components/ServiceCard';
import { EnquiryModal } from '../components/EnquiryModal';
import { Sparkles, MessageSquare, PhoneCall, CheckCircle } from 'lucide-react';
import { companyConfigService } from '../services/companyConfigService';

export const ServicesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Website Development');
  const config = companyConfigService.getConfig();

  const categories = ['All', 'Development', 'Design', 'Marketing', 'Maintenance'];

  const filteredServices =
    activeCategory === 'All'
      ? INITIAL_SERVICES
      : INITIAL_SERVICES.filter((s) => s.category === activeCategory);

  const handleEnquire = (title: string) => {
    setSelectedService(title);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-[#0B192C] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-cyan-400 border border-cyan-500/30">
            <Sparkles size={14} />
            <span>Enterprise Services</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-white">
            Digital Engineering & Performance Marketing Services
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            High-velocity web development, scalable e-commerce infrastructure, user experience design, and data-driven client acquisition funnels tailored for businesses.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing {filteredServices.length} of {INITIAL_SERVICES.length} Enterprise Solutions
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEnquire={handleEnquire}
            />
          ))}
        </div>

        {/* Custom Project CTA Box */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-[#0B192C] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Need a Custom Technical Architecture or SLA?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Discuss your tech stack, system requirements, or monthly support retainer directly with a GWPR solution architect.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleEnquire('Custom Enterprise Requirement')}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md"
            >
              Request Proposal
            </button>
            <a
              href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
                'Hello GWPR team, I would like to schedule a discussion regarding digital services.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md"
            >
              <MessageSquare size={16} />
              <span>WhatsApp Consultation</span>
            </a>
          </div>
        </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        serviceOrCourseTitle={selectedService}
      />
    </div>
  );
};
