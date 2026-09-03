'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Truck, ArrowLeft, Crown, Search, CheckCircle2, Clock, Printer, PackageCheck } from 'lucide-react';

interface MockOrder {
  id: string;
  customer: string;
  item: string;
  statusStep: number; // 1 to 5
  eta: string;
  printer: string;
  trackingNo: string;
}

const MOCK_DATABASE: Record<string, MockOrder> = {
  'K3D-9842': {
    id: 'K3D-9842',
    customer: 'Aurel A.',
    item: 'Miniatur Chibi Custom (Sakura Pink) + Paint Kit',
    statusStep: 3,
    eta: 'Hari ini, 16:00 WIB',
    printer: 'Prusa MK4 #03 (Bed Temp: 60°C)',
    trackingNo: 'JP8291039421',
  },
  'K3D-8821': {
    id: 'K3D-8821',
    customer: 'Rian Pratama',
    item: 'Plakat Strava Topo 3D Relief Marathon',
    statusStep: 4,
    eta: 'Besok Pagi, 10:00 WIB',
    printer: 'Bambu Lab X1-Carbon #01',
    trackingNo: 'SPX902384729',
  },
};

export default function TrackingPage() {
  const [searchId, setSearchId] = useState('K3D-9842');
  const [order, setOrder] = useState<MockOrder | null>(MOCK_DATABASE['K3D-9842']);
  const [searched, setSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const id = searchId.trim().toUpperCase();
    if (MOCK_DATABASE[id]) {
      setOrder(MOCK_DATABASE[id]);
    } else {
      // Dynamic fallback order for any input ID
      setOrder({
        id: id || 'K3D-CUSTOM',
        customer: 'Pelanggan Kirei3D',
        item: 'Custom 3D Print Order',
        statusStep: 2,
        eta: '1-2 Hari Kerja',
        printer: 'Bambu Lab P1S #04',
        trackingNo: 'Menunggu Kurir',
      });
    }
    setSearched(true);
  };

  const steps = [
    { title: 'Pesanan Diterima', desc: 'Verifikasi pembayaran & antrean' },
    { title: '3D Slicing & File Prep', desc: 'Proses slicing & G-code' },
    { title: 'Printing in Progress', desc: 'Sedang dicetak di mesin 3D' },
    { title: 'Post-Processing & QC', desc: 'Pembersihan & Quality Check' },
    { title: 'Pengiriman Kurir', desc: 'Paket siap dijemput kurir' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-900 selection:bg-sky-200 selection:text-sky-900 pb-16 flex flex-col justify-between">
      {/* NAVBAR */}
      <header className="w-full bg-white/90 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 flex items-center justify-center text-white shadow-xs group-hover:rotate-12 transition-transform">
              <Truck className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-cute text-xl font-bold tracking-tight text-slate-900">
                Kirei<span className="text-sky-600">3D</span>
              </span>
              <span className="text-[9px] font-cute text-slate-400 font-bold uppercase tracking-widest border-l border-slate-200 pl-1.5 hidden sm:inline-block">
                Tracking Portal
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="btn-bouncy px-3.5 py-1.5 rounded-full text-xs font-cute font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5 border border-slate-200 bg-white shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-pink-500" />
              <span>Kembali ke Toko</span>
            </Link>
            <Link
              href="/b2b"
              className="btn-bouncy px-3.5 py-1.5 rounded-full text-xs font-cute font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 hidden sm:flex items-center gap-1.5 border border-purple-200"
            >
              <Crown className="w-3.5 h-3.5 text-purple-500" />
              <span>B2B & Event</span>
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN TRACKING CONTAINER */}
      <main className="max-w-3xl mx-auto px-4 py-10 w-full my-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-sky-50 text-sky-700 rounded-full text-xs font-cute font-bold mb-2 border border-sky-200">
            <span>🚚</span> Live Production Tracker <span>🖨️</span>
          </div>
          <h1 className="font-cute text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Pantau Status Cetak 3D Kamu
          </h1>
          <p className="text-xs text-slate-500">
            Masukkan Nomor Order ID (Contoh: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200">K3D-9842</code>)
          </p>
        </div>

        {/* SEARCH FORM */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Masukkan ID Order..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="flex-1 px-4 py-3 text-sm rounded-2xl border border-slate-200 font-cute focus:outline-none focus:border-sky-500 bg-white shadow-xs"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-cute font-bold text-sm shadow-md btn-bouncy flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" /> Cari
            </button>
          </div>
        </form>

        {/* RESULT DETAILS */}
        {searched && order && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
              <div>
                <span className="text-[10px] font-cute text-sky-600 font-bold bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                  ORDER ID: {order.id}
                </span>
                <h3 className="font-cute font-bold text-lg text-slate-900 mt-1">{order.item}</h3>
                <div className="text-xs text-slate-500">Pemesan: {order.customer}</div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-cute text-slate-400">ESTIMASI SELESAI</div>
                <div className="font-cute font-bold text-sm text-emerald-600 flex items-center gap-1 justify-end">
                  <Clock className="w-3.5 h-3.5" /> {order.eta}
                </div>
              </div>
            </div>

            {/* TIMELINE PROGRESS */}
            <div className="space-y-4 relative">
              {steps.map((step, idx) => {
                const stepNum = idx + 1;
                const isDone = stepNum <= order.statusStep;
                const isCurrent = stepNum === order.statusStep;

                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-cute font-bold text-xs shrink-0 ${
                        isDone
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : stepNum}
                    </div>
                    <div>
                      <div
                        className={`font-cute font-bold text-xs ${
                          isCurrent
                            ? 'text-sky-600 text-sm'
                            : isDone
                            ? 'text-slate-900'
                            : 'text-slate-400'
                        }`}
                      >
                        {step.title}
                        {isCurrent && (
                          <span className="ml-2 text-[9px] bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-bold animate-pulse">
                            Sedang Berjalan
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500">{step.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* MACHINE FLEET INFO */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between text-xs font-cute">
              <div className="flex items-center gap-2 text-slate-700">
                <Printer className="w-4 h-4 text-sky-600" />
                <span>Mesin 3D Active: <strong>{order.printer}</strong></span>
              </div>
              <div className="text-slate-500">Resi: <strong className="text-slate-800">{order.trackingNo}</strong></div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
