import React from 'react';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';
import { resetAllDemoData } from '../services/localStorageService';

interface ResetDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ResetDataModal: React.FC<ResetDataModalProps> = ({ isOpen, onClose, onSuccess }) => {
  if (!isOpen) return null;

  const handleReset = () => {
    resetAllDemoData();
    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-700 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-amber-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertTriangle size={20} />
            <h3 className="font-bold text-base">Reset Demo Data</h3>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Are you sure you want to restore the prototype database to its default factory state?
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 space-y-1.5">
            <p className="font-semibold">This will reset:</p>
            <ul className="list-disc list-inside space-y-0.5 text-slate-700">
              <li>Restore 11 standard course curriculums</li>
              <li>Reset demo student account (Aarav Sharma)</li>
              <li>Re-seed sample completed Machine Learning certificate (<code>GWPR-CERT-2026-A7K92X</code>)</li>
              <li>Clear any custom created enrollments and demo sessions</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <RotateCcw size={14} />
            <span>Confirm Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
