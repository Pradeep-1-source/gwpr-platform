import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  Camera,
  CheckCircle2,
  XCircle,
  Award,
  Calendar,
  User,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Info,
  Download,
} from 'lucide-react';
import { certificateService } from '../services/certificateService';
import { Certificate } from '../types';
import { QRCodeScanner } from '../components/QRCodeScanner';
import { CertificatePDFGenerator } from '../components/CertificatePDFGenerator';

export const CertificateVerificationPage: React.FC = () => {
  const { certificateId } = useParams<{ certificateId?: string }>();
  const navigate = useNavigate();

  const [inputCertId, setInputCertId] = useState(certificateId || '');
  const [searchedId, setSearchedId] = useState<string | null>(certificateId || null);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);

  const [isVerifying, setIsVerifying] = useState(false);
  const [sourceNote, setSourceNote] = useState<string | null>(null);

  const verifyCertificateId = async (idToVerify: string) => {
    const clean = idToVerify.trim().toUpperCase();
    setSearchedId(clean);
    setSearchAttempted(true);

    if (!clean) {
      setCertificate(null);
      return;
    }

    setIsVerifying(true);
    try {
      const found = await certificateService.verifyCertificate(clean);
      setCertificate(found || null);
    } catch {
      setCertificate(null);
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    if (certificateId) {
      setInputCertId(certificateId);
      verifyCertificateId(certificateId);
    }
  }, [certificateId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCertId.trim()) {
      navigate(`/verify/${encodeURIComponent(inputCertId.trim().toUpperCase())}`);
    }
  };

  const handleScanSuccess = (decodedText: string) => {
    setScannerOpen(false);
    // Extract certificate ID if full URL is scanned
    let extractedId = decodedText.trim();
    if (extractedId.includes('/verify/')) {
      const parts = extractedId.split('/verify/');
      extractedId = parts[parts.length - 1];
    }
    setInputCertId(extractedId);
    navigate(`/verify/${encodeURIComponent(extractedId.toUpperCase())}`);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="bg-[#0B192C] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck size={16} />
            <span>Official Credential Verification System</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-white">
            Verify GWPR Certificate Authenticity
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Validate the integrity and completion status of credentials issued by GWPR Private Limited for students, recruiters, and employers.
          </p>
        </div>
      </section>

      {/* Main Verification Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search & Scan Box */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-xs sm:text-sm font-bold text-slate-900">
              Enter Certificate ID or Scan QR Code
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={inputCertId}
                  onChange={(e) => setInputCertId(e.target.value)}
                  placeholder="e.g. GWPR-CERT-2026-A7K92X"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono uppercase text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setScannerOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                  title="Scan using device camera"
                >
                  <Camera size={16} className="text-blue-600" />
                  <span className="hidden sm:inline">Scan QR</span>
                </button>

                <button
                  type="submit"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/30 transition-all"
                >
                  <ShieldCheck size={16} />
                  <span>Verify Certificate</span>
                </button>
              </div>
            </div>
          </form>

          {/* Quick Demo Pre-fills */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500 border-t border-slate-100">
            <span className="font-medium text-slate-700">Quick Test Records:</span>
            <button
              onClick={() => {
                setInputCertId('GWPR-CERT-2026-A7K92X');
                navigate('/verify/GWPR-CERT-2026-A7K92X');
              }}
              className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 font-mono text-[11px] font-semibold transition-colors"
            >
              GWPR-CERT-2026-A7K92X (Valid)
            </button>
            <button
              onClick={() => {
                setInputCertId('GWPR-FAKE-2026-INVALID');
                navigate('/verify/GWPR-FAKE-2026-INVALID');
              }}
              className="px-2.5 py-1 rounded-md bg-red-50 text-red-700 hover:bg-red-100 font-mono text-[11px] font-semibold transition-colors"
            >
              GWPR-FAKE-2026-INVALID (Invalid)
            </button>
          </div>
        </div>

        {/* VERIFICATION RESULT STATE */}
        {searchAttempted && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            {certificate ? (
              /* VALID CERTIFICATE FOUND */
              <div className="bg-white rounded-3xl border-2 border-emerald-500/40 p-6 sm:p-8 shadow-xl space-y-6 overflow-hidden relative">
                
                {/* Result Status Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
                      <CheckCircle2 size={26} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                          {certificate.verificationStatus === 'Valid' ? 'Verified Credential' : 'Revoked'}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">ID: {certificate.id}</span>
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                        Authentic Certificate Found
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => setCertModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B192C] hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
                  >
                    <Download size={14} />
                    <span>View & Download PDF</span>
                  </button>
                </div>

                {/* Certificate Meta Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider block">
                      Student Name
                    </span>
                    <p className="text-base font-bold text-slate-900">{certificate.studentName}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider block">
                      Course Curriculum
                    </span>
                    <p className="text-base font-bold text-slate-900">{certificate.courseTitle}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider block">
                      Completion Date
                    </span>
                    <p className="text-sm font-bold text-slate-900">{certificate.completionDate}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider block">
                      Issuing Entity
                    </span>
                    <p className="text-sm font-bold text-slate-900">{certificate.companyName}</p>
                  </div>
                </div>

                {/* Signatory & Issuance Verification Note */}
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-900">
                  <div className="flex items-center gap-2">
                    <Award size={18} className="text-emerald-700" />
                    <span>
                      Authorized Signatory: <strong>{certificate.signatoryName}</strong> ({certificate.signatoryTitle})
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold font-mono">
                    Audit Status: MATCHED
                  </span>
                </div>
              </div>
            ) : (
              /* NOT FOUND STATE */
              <div className="bg-white rounded-3xl border-2 border-red-200 p-8 sm:p-10 shadow-sm text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                  <XCircle size={32} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900">Certificate Not Found</h3>
                  <p className="text-xs text-slate-500 font-mono">Searched ID: "{searchedId}"</p>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  No matching record exists in the current prototype records. Please double-check the identifier entered or ensure the certificate was generated in this browser session.
                </p>

                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setInputCertId('GWPR-CERT-2026-A7K92X');
                      navigate('/verify/GWPR-CERT-2026-A7K92X');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-xs hover:bg-blue-500"
                  >
                    Test with Sample Valid ID
                  </button>
                  <Link
                    to="/contact"
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200"
                  >
                    Contact Registrar
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Honest Prototype Notice on Cross-Device Verification */}
        <div className="bg-slate-100 rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <Info size={16} className="text-blue-600 shrink-0" />
            <span>Frontend Prototype Architecture Note:</span>
          </div>
          <p className="leading-relaxed">
            In this frontend-only prototype version, verification queries against your browser's LocalStorage records and pre-seeded demonstration data. A cross-device verification architecture (allowing a phone to verify a certificate generated on a separate PC) will be enabled when connected to a cloud API database on Vercel.
          </p>
        </div>

      </section>

      {/* Camera QR Scanner Modal */}
      <QRCodeScanner
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />

      {/* Certificate Preview/Export Modal */}
      {certificate && (
        <CertificatePDFGenerator
          certificate={certificate}
          isOpen={certModalOpen}
          onClose={() => setCertModalOpen(false)}
        />
      )}
    </div>
  );
};
