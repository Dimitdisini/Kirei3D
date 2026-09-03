'use client';

import { Printer } from 'lucide-react';
import { PrinterFleet } from '@/types/admin';

interface FleetGridProps {
  fleet: PrinterFleet[];
}

export default function FleetGrid({ fleet }: FleetGridProps) {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {fleet.map((m, idx) => (
        <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
            <Printer className="w-5 h-5" />
          </div>
          <h3 className="font-cute font-bold text-base text-slate-900 mb-1">{m.name}</h3>
          <div className="text-xs font-cute text-emerald-600 font-bold mb-2">{m.status}</div>
          <p className="text-xs text-slate-500 mb-4">{m.temp}</p>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-cute text-slate-700">
            Job Aktif: <strong>{m.job}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}
