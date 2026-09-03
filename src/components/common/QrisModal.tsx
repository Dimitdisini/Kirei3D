'use client';

import { X, QrCode, CheckCircle, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QrisModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  label: string;
  onConfirmSuccess: () => void;
}

export default function QrisModal({
  isOpen,
  onClose,
  amount,
  label,
  onConfirmSuccess,
}: QrisModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    confetti({ particleCount: 80, spread: 70 });
    onConfirmSuccess();
    alert(
      'Terima kasih! Bukti pembagian QRIS kamu telah dicatat. Kami akan segera memverifikasi dan memproses pesananmu.'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl z-10 text-center animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto mb-3 flex items-center justify-center">
          <QrCode className="w-6 h-6" />
        </div>

        <h3 className="font-cute text-xl font-bold text-slate-900 mb-1">Pembayaran Instant QRIS</h3>
        <p className="text-xs text-slate-500 mb-4">{label}</p>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-4">
          <div className="text-[11px] text-slate-400 font-cute font-bold mb-1">TOTAL PEMBAYARAN</div>
          <div className="text-2xl font-cute font-bold text-emerald-600">
            Rp {amount.toLocaleString('id-ID')}
          </div>
        </div>

        {/* QR CODE DISPLAY */}
        <div className="bg-white p-3 border-2 border-dashed border-slate-300 rounded-2xl inline-block mb-4">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020101021126580014ID.LINKAJA.WWW01189360091100085443210215ID10200384729100303UMI51440014ID.VIRTUAL.PAY5204581253033605802ID5908KIREI3D6013JAKARTA%20SELATAN61051219062070703A016304C91A"
            alt="QRIS Code Kirei3D"
            className="w-44 h-44 object-contain mx-auto"
          />
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-cute mb-5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Mendukung BCA, Mandiri, GoPay, OVO, ShopeePay & QRIS All Bank</span>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-cute font-bold text-sm shadow-md flex items-center justify-center gap-2 btn-bouncy"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Saya Sudah Transfer QRIS</span>
        </button>
      </div>
    </div>
  );
}
