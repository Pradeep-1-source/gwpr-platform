import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Certificate } from '../types';
import { CertificateTemplate } from './CertificateTemplate';
import {
  Download,
  Printer,
  Copy,
  Check,
  ExternalLink,
  X,
  ShieldCheck,
  Camera,
  Award,
} from 'lucide-react';

interface CertificatePDFGeneratorProps {
  certificate: Certificate;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificatePDFGenerator: React.FC<CertificatePDFGeneratorProps> = ({
  certificate,
  isOpen,
  onClose,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(certificate.verificationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(certificate.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    try {
      setDownloading(true);
      const element = document.getElementById('certificate-modal-render');
      if (!element) {
        throw new Error('Certificate element not found');
      }

      // Render element to canvas at high scale for crisp vector-like text
      const canvas = await html2canvas(element, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');

      // Create landscape A4 PDF: 297mm x 210mm
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      pdf.save(`${certificate.id}_${certificate.studentName.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error('Error generating certificate PDF:', err);
      alert('Unable to generate PDF automatically. You can use the "Print Certificate" option to save as PDF.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[95vh] border border-slate-700 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar */}
        <div className="bg-[#0B192C] text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-cyan-400 shadow-inner">
              <Award size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base">Certificate Issued</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                  Verified
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">ID: {certificate.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/30 transition-all disabled:opacity-50"
            >
              <Download size={14} />
              <span>{downloading ? 'Downloading...' : 'Download PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Credentials & Verification Banner (ID, Scanner, Link) */}
        <div className="bg-slate-900 text-slate-200 px-5 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Certificate ID */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Certificate ID:</span>
            <span className="font-mono font-bold text-white bg-slate-800 px-2 py-1 rounded border border-slate-700">
              {certificate.id}
            </span>
            <button
              onClick={handleCopyId}
              className="p-1 hover:text-cyan-400 text-slate-400 transition-colors"
              title="Copy Certificate ID"
            >
              {copiedId ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
          </div>

          {/* Verification Link & Scanner */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs transition-colors"
            >
              {copiedLink ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Verify Link'}</span>
            </button>

            <a
              href={certificate.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-cyan-300 border border-cyan-500/30 font-medium text-xs transition-colors"
            >
              <ShieldCheck size={14} />
              <span>Verify Online</span>
              <ExternalLink size={12} />
            </a>

            <a
              href="/verify"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-medium text-xs transition-colors"
              title="Open QR Scanner"
            >
              <Camera size={14} />
              <span>Verify Scanner</span>
            </a>
          </div>
        </div>

        {/* Scrollable Certificate View Area */}
        <div className="p-4 sm:p-6 overflow-y-auto bg-slate-100 flex items-center justify-center">
          <div className="w-full flex justify-center">
            <CertificateTemplate certificate={certificate} id="certificate-modal-render" />
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="bg-white px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck size={15} className="text-emerald-600" />
            <span>Official digital credential with cryptographic QR verification</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
            >
              <Printer size={15} />
              <span>Print Certificate</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30 transition-all disabled:opacity-50"
            >
              <Download size={15} />
              <span>{downloading ? 'Generating PDF...' : 'Download PDF (A4)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
