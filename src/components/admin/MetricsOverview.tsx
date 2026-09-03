'use client';

import { FounderInfo } from '@/types/admin';

interface MetricsOverviewProps {
  founders: FounderInfo[];
}

export default function MetricsOverview({ founders }: MetricsOverviewProps) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
          <div className="text-xs font-cute text-slate-400 font-bold mb-1">TOTAL OMSET BULAN INI</div>
          <div className="text-3xl font-cute font-bold text-pink-600">Rp 48.500.000</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
          <div className="text-xs font-cute text-slate-400 font-bold mb-1">PESANAN TERSELESAIKAN</div>
          <div className="text-3xl font-cute font-bold text-purple-600">342 Order</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
          <div className="text-xs font-cute text-slate-400 font-bold mb-1">TINGKAT KEPUASAN (CSAT)</div>
          <div className="text-3xl font-cute font-bold text-emerald-600">99.4% (5.0 ★)</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="font-cute font-bold text-lg text-slate-900 mb-4">Tim Founder Kirei3D Studio</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-cute">
          {founders.map((f, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border ${
                f.badgeColor === 'pink'
                  ? 'bg-pink-50 border-pink-200'
                  : f.badgeColor === 'sky'
                  ? 'bg-sky-50 border-sky-200'
                  : 'bg-purple-50 border-purple-200'
              }`}
            >
              <div className="font-bold text-slate-900">{f.name}</div>
              <div
                className={`text-xs font-bold ${
                  f.badgeColor === 'pink'
                    ? 'text-pink-600'
                    : f.badgeColor === 'sky'
                    ? 'text-sky-600'
                    : 'text-purple-600'
                }`}
              >
                {f.role}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
