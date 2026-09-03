'use client';

import Link from 'next/link';
import { Layers, ExternalLink, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdminHeaderProps {
  onSyncData?: () => void;
}

export default function AdminHeader({ onSyncData }: AdminHeaderProps) {
  const handleSync = () => {
    confetti({ particleCount: 50, spread: 60 });
    if (onSyncData) onSyncData();
    alert('Database Kirei3D Studio berhasil disinkronkan!');
  };

  return (
    <header className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/90 backdrop-blur-xl p-5 rounded-3xl border border-slate-200 shadow-xs mb-6">
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-600 to-sky-500 flex items-center justify-center text-white shadow-md">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-cute text-xl sm:text-2xl font-bold text-slate-900">
              Kirei3D Studio Command Center
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> ONLINE OPS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Founders: <strong className="text-slate-800">Dimitri (CEO)</strong> •{' '}
            <strong className="text-slate-800">Bayu (COO)</strong> •{' '}
            <strong className="text-slate-800">Puja (CCO)</strong>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <Link
          href="/"
          target="_blank"
          className="btn-bouncy px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-xs font-cute font-bold text-slate-700 border border-slate-200 shadow-xs flex items-center gap-1.5"
        >
          <ExternalLink className="w-4 h-4 text-pink-500" /> Buka Toko (Live)
        </Link>
        <button
          onClick={handleSync}
          className="btn-bouncy px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-xs font-cute font-bold text-white flex items-center gap-1.5 shadow-xs"
        >
          <RefreshCw className="w-4 h-4" /> Sinkron Database
        </button>
      </div>
    </header>
  );
}
