import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Camera, AlertCircle, RefreshCw, X, CheckCircle, ShieldAlert } from 'lucide-react';

interface QRCodeScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (decodedText: string) => void;
}

export const QRCodeScanner: React.FC<QRCodeScannerProps> = ({
  isOpen,
  onClose,
  onScanSuccess,
}) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const elementId = 'gwpr-html5-qr-reader';

  useEffect(() => {
    if (!isOpen) return;

    let html5QrCode: Html5Qrcode | null = null;

    const startScanner = async () => {
      try {
        setErrorMsg(null);
        setPermissionDenied(false);

        // Check if camera is available
        const devices = await Html5Qrcode.getCameras().catch((err) => {
          throw new Error('Camera permission denied or camera device not found.');
        });

        if (!devices || devices.length === 0) {
          throw new Error('No camera found on this device.');
        }

        html5QrCode = new Html5Qrcode(elementId, {
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
          verbose: false,
        });
        scannerRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            // Success handler
            if (html5QrCode && html5QrCode.isScanning) {
              html5QrCode.stop().then(() => {
                onScanSuccess(decodedText);
              }).catch(() => {
                onScanSuccess(decodedText);
              });
            } else {
              onScanSuccess(decodedText);
            }
          },
          (errorMessage) => {
            // Ignore scan frame mismatches
          }
        );

        setIsScanning(true);
      } catch (err: any) {
        console.warn('QR Camera scan error:', err);
        const msg = err?.message || 'Unable to access camera.';
        setErrorMsg(msg);
        if (msg.toLowerCase().includes('permission') || msg.toLowerCase().includes('denied')) {
          setPermissionDenied(true);
        }
      }
    };

    // Small delay to ensure DOM element is mounted
    const timer = setTimeout(() => {
      startScanner();
    }, 300);

    return () => {
      clearTimeout(timer);
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch((e) => console.log('Stop scanner cleanup:', e));
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-700 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#0B192C] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Camera size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">Scan Certificate QR Code</h3>
              <p className="text-xs text-slate-400">Position the QR code within the frame</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Camera Viewport Area */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white relative min-h-[300px] flex flex-col items-center justify-center">
          <div id={elementId} className="w-full rounded-xl overflow-hidden shadow-inner max-h-[320px]" />

          {/* Loading or Permission Error States */}
          {errorMsg && (
            <div className="absolute inset-4 bg-slate-900/95 flex flex-col items-center justify-center text-center p-6 space-y-3 rounded-xl border border-red-500/30">
              <ShieldAlert className="text-amber-400 w-12 h-12" />
              <h4 className="font-bold text-slate-200 text-sm">Camera Unavailable</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{errorMsg}</p>
              <div className="pt-2 flex flex-col gap-2 w-full max-w-[220px]">
                <button
                  onClick={() => {
                    setErrorMsg(null);
                    window.location.reload();
                  }}
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
                >
                  <RefreshCw size={14} />
                  <span>Retry Camera</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
                >
                  Enter Certificate ID Manually
                </button>
              </div>
            </div>
          )}

          {!errorMsg && !isScanning && (
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 bg-slate-900">
              <RefreshCw className="animate-spin text-cyan-400 w-8 h-8" />
              <p className="text-xs text-slate-400">Initializing camera feed...</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-600">
            Having trouble? You can also type or paste the Certificate ID directly into the manual verification search bar.
          </p>
        </div>
      </div>
    </div>
  );
};
