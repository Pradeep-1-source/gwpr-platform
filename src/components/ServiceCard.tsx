import React from 'react';
import { ServiceItem } from '../types';
import {
  Globe,
  ShoppingCart,
  Palette,
  TrendingUp,
  Search,
  Share2,
  Target,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
  onEnquire: (serviceTitle: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe size={24} className="text-blue-500" />,
  ShoppingCart: <ShoppingCart size={24} className="text-cyan-500" />,
  Palette: <Palette size={24} className="text-purple-500" />,
  TrendingUp: <TrendingUp size={24} className="text-emerald-500" />,
  Search: <Search size={24} className="text-amber-500" />,
  Share2: <Share2 size={24} className="text-indigo-500" />,
  Target: <Target size={24} className="text-rose-500" />,
  Users: <Users size={24} className="text-teal-500" />,
  ShieldCheck: <ShieldCheck size={24} className="text-blue-600" />,
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onEnquire }) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden">
      {/* Top Accent Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="space-y-4">
        {/* Icon & Category */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-blue-50 border border-slate-200/80 group-hover:border-blue-200 flex items-center justify-center transition-colors">
            {iconMap[service.iconName] || <Sparkles size={24} className="text-blue-500" />}
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
            {service.category}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {service.title}
          </h3>
          <p className="text-xs font-semibold text-cyan-700 mt-0.5">{service.tagline}</p>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">{service.description}</p>

        {/* Feature List */}
        <div className="pt-2 space-y-1.5 border-t border-slate-100">
          {service.features.map((feat, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="pt-6">
        <button
          onClick={() => onEnquire(service.title)}
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 group-hover:bg-blue-600 text-white text-xs font-semibold shadow-sm transition-all duration-200"
        >
          <span>Enquire Now</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
