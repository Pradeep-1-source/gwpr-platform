import React, { useState } from 'react';
import { Info, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrototypeNotice: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs sm:text-sm py-2 px-4 shadow-sm border-b border-blue-500/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-500/30 text-blue-200 border border-blue-400/30">
            PROTOTYPE NOTICE
          </span>
          <p className="text-slate-200">
            This is an interactive frontend demo for <strong className="text-white">GWPR Private Limited</strong>. Data is stored in your browser's LocalStorage. Cross-device certificate verification will connect to a production backend upon deployment.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/verify/GWPR-CERT-2026-A7K92X"
            className="hidden md:inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 underline font-medium"
          >
            <span>Try Sample Verification</span>
            <ExternalLink size={12} />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
            aria-label="Dismiss notice"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
