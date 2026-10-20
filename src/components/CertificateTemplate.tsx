import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Certificate } from '../types';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CertificateTemplateProps {
  certificate: Certificate;
  id?: string;
}

export const CertificateTemplate: React.FC<CertificateTemplateProps> = ({
  certificate,
  id = 'certificate-print-area',
}) => {
  return (
    <div
      id={id}
      className="relative w-full max-w-[1050px] aspect-[1.414/1] bg-white text-slate-900 mx-auto shadow-2xl rounded-sm overflow-hidden select-none border-8 border-[#0B192C]"
      style={{
        boxSizing: 'border-box',
      }}
    >
      {/* Outer Decorative Gold Inset Border */}
      <div className="absolute inset-3 border-2 border-[#D4AF37] pointer-events-none z-10"></div>
      <div className="absolute inset-4 border border-[#D4AF37]/40 pointer-events-none z-10"></div>

      {/* Decorative Corner Ornaments */}
      <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none z-10" />
      <div className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none z-10" />
      <div className="absolute bottom-5 left-5 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none z-10" />
      <div className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none z-10" />

      {/* Subtle Background Watermark Crest */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none">
        <img src="/gwpr-logo.svg" alt="Watermark" className="w-[450px] h-[450px] object-contain" />
      </div>

      {/* Top Banner Ribbon Background */}
      <div className="h-4 bg-gradient-to-r from-[#0B192C] via-[#1E3E62] to-[#0B192C] w-full" />

      {/* Certificate Content Container */}
      <div className="px-10 sm:px-14 py-8 sm:py-10 flex flex-col justify-between h-[calc(100%-16px)] relative z-20">
        
        {/* Header: Company Emblem & Title */}
        <div className="text-center space-y-1 sm:space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#0B192C] p-1.5 shadow-md flex items-center justify-center border border-[#D4AF37]/50">
              <img src="/gwpr-logo.svg" alt="GWPR" className="w-full h-full object-contain" />
            </div>
            <div className="text-left">
              <h2 className="text-xl sm:text-2xl font-black tracking-widest text-[#0B192C] font-serif uppercase">
                {certificate.companyName}
              </h2>
              <p className="text-[10px] sm:text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Corporate Training & Professional Certification Division
              </p>
            </div>
          </div>

          <div className="pt-3">
            <span className="inline-block text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#D4AF37] bg-[#0B192C] px-5 py-1 rounded shadow">
              Certificate of Completion
            </span>
          </div>
        </div>

        {/* Body Text */}
        <div className="text-center space-y-3 sm:space-y-4 my-auto py-2">
          <p className="text-xs sm:text-sm font-medium text-slate-600 tracking-wide">
            This is proudly and formally presented to
          </p>

          {/* Student Name */}
          <div className="relative inline-block px-6">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#0B192C] tracking-wide font-serif pb-1">
              {certificate.studentName}
            </h1>
            <div className="w-3/4 mx-auto h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
          </div>

          {/* Course Completion Statement */}
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            for successfully satisfying all curriculum requirements, practical assignments, and technical milestones for the program in
          </p>

          {/* Course Name */}
          <div className="inline-block bg-blue-50/80 px-6 py-2 rounded-lg border border-blue-200/80">
            <h3 className="text-lg sm:text-2xl font-bold text-blue-900 tracking-tight font-serif">
              {certificate.courseTitle}
            </h3>
          </div>

          {/* Completion Date & Unique ID Line */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 pt-1">
            <span>
              Date of Completion: <strong className="text-slate-900">{certificate.completionDate}</strong>
            </span>
            <span className="text-slate-300">•</span>
            <span>
              Certificate ID:{' '}
              <strong className="text-blue-950 font-mono tracking-wider font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                {certificate.id}
              </strong>
            </span>
          </div>
        </div>

        {/* Footer Area: QR Code, Gold Seal, Signatory */}
        <div className="pt-4 border-t border-slate-200 flex items-end justify-between gap-4">
          
          {/* Left: QR Code & Verification URL */}
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-white border-2 border-slate-300 rounded shadow-sm">
              <QRCodeSVG
                value={certificate.verificationUrl}
                size={68}
                level="M"
                includeMargin={false}
              />
            </div>
            <div className="text-left space-y-0.5 max-w-[200px]">
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 size={13} />
                <span>Verified Credential</span>
              </div>
              <p className="text-[9px] text-slate-500 leading-tight">
                Scan QR or visit to verify:
              </p>
              <p className="text-[8px] font-mono text-blue-700 break-all font-medium">
                {certificate.verificationUrl}
              </p>
            </div>
          </div>

          {/* Center: Gold Foil-Style Emblem Seal */}
          <div className="hidden sm:flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#B8860B] via-[#FFD700] to-[#DAA520] p-1 shadow-lg flex items-center justify-center border-2 border-white">
              <div className="w-full h-full rounded-full border border-amber-800/40 flex flex-col items-center justify-center text-center p-1 bg-gradient-to-b from-[#DAA520] to-[#B8860B] text-amber-950 font-bold">
                <Award size={18} className="text-amber-950" />
                <span className="text-[7px] tracking-tighter uppercase font-black">GWPR SEAL</span>
              </div>
            </div>
            <span className="text-[8px] text-slate-400 mt-1 uppercase font-semibold">Authentic Credential</span>
          </div>

          {/* Right: Signature & Signatory Designation */}
          <div className="text-center w-48 sm:w-56 space-y-1">
            <div className="h-10 flex items-center justify-center">
              {/* Elegant Realistic Digital Signature Display */}
              <span
                className="text-2xl sm:text-3xl text-blue-950 font-serif italic"
                style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive, serif" }}
              >
                {certificate.signatoryName}
              </span>
            </div>
            <div className="w-full h-[1.5px] bg-slate-400 mx-auto"></div>
            <p className="text-[11px] sm:text-xs font-bold text-slate-900">{certificate.signatoryName}</p>
            <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium leading-tight">
              {certificate.signatoryTitle}
            </p>
            <p className="text-[8px] text-slate-400 uppercase tracking-wider">{certificate.companyName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
