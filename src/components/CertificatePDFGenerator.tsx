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
        <div className="bg-[#FAF9F6] text-slate-900 px-5 py-3.5 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 shadow-inner">
              <Award size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900">Certificate Issued</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase">
                  Verified
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">ID: {certificate.id}</p>
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
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/50 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Credentials & Verification Banner (ID, Scanner, Link) */}
        <div className="bg-white text-slate-800 px-5 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Certificate ID */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Certificate ID:</span>
            <span className="font-mono font-bold text-slate-900 bg-[#FAF9F6] px-2 py-1 rounded border border-slate-300">
              {certificate.id}
            </span>
            <button
              onClick={handleCopyId}
              className="p-1 hover:text-blue-600 text-slate-500 transition-colors"
              title="Copy Certificate ID"
            >
              {copiedId ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            </button>
          </div>

          {/* Verification Link & Scanner */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF9F6] hover:bg-slate-100 text-slate-800 border border-slate-300 font-medium text-xs transition-colors"
            >
              {copiedLink ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Verify Link'}</span>
            </button>

            <a
              href={certificate.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-medium text-xs transition-colors"
            >
              <ShieldCheck size={14} />
              <span>Verify Online</span>
              <ExternalLink size={12} />
            </a>

            <a
              href="/verify"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-medium text-xs transition-colors"
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
