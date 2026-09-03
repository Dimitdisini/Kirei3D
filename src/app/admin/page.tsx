'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  ExternalLink,
  RefreshCw,
  ClipboardList,
  Printer,
  TrendingUp,
  UserCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdminOrder {
  id: string;
  customer: string;
  item: string;
  qty: number;
  total: number;
  status: string;
  printer: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'fleet' | 'metrics'>('orders');
  const [orders, setOrders] = useState<AdminOrder[]>([
    {
      id: 'K3D-9842',
      customer: 'Aurel A.',
      item: 'Miniatur Chibi Custom (Sakura Pink) + Paint Kit',
      qty: 1,
      total: 110000,
      status: 'Printing in Progress',
      printer: 'Prusa MK4 #03',
    },
    {
      id: 'K3D-8821',
      customer: 'Rian Pratama',
      item: 'Plakat Strava Topo 3D Relief Marathon',
      qty: 2,
      total: 300000,
      status: 'Post-Processing & QC',
      printer: 'Bambu Lab X1C #01',
    },
    {
      id: 'K3D-7712',
      customer: 'Nadia S.',
      item: 'Artisanal Keycap Anime Pop',
      qty: 4,
      total: 140000,
      status: 'Pesanan Diterima',
      printer: 'Elegoo Mars 4 8K #02',
    },
  ]);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  const handleSyncData = () => {
    confetti({ particleCount: 50, spread: 60 });
    alert('Database Kirei3D Studio berhasil disinkronkan!');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-4 sm:p-6 lg:p-8 selection:bg-purple-200 selection:text-purple-900 pb-16">
      {/* TOP HEADER BAR */}
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
            onClick={handleSyncData}
            className="btn-bouncy px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-xs font-cute font-bold text-white flex items-center gap-1.5 shadow-xs"
          >
            <RefreshCw className="w-4 h-4" /> Sinkron Database
          </button>
        </div>
      </header>

      {/* MAIN TABS */}
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 mb-8 bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 rounded-xl text-xs font-cute font-bold transition-all flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'nav-tab-active'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ClipboardList className="w-4 h-4" /> 1. Antrean Order & Live Fleet
        </button>

        <button
          onClick={() => setActiveTab('fleet')}
          className={`px-4 py-2.5 rounded-xl text-xs font-cute font-bold transition-all flex items-center gap-2 ${
            activeTab === 'fleet'
              ? 'nav-tab-active'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Printer className="w-4 h-4" /> 2. Status Mesin 3D Printer
        </button>

        <button
          onClick={() => setActiveTab('metrics')}
          className={`px-4 py-2.5 rounded-xl text-xs font-cute font-bold transition-all flex items-center gap-2 ${
            activeTab === 'metrics'
              ? 'nav-tab-active'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" /> 3. Performa & Founders Dashboard
        </button>
      </div>

      {/* TAB CONTENT: ORDERS */}
      {activeTab === 'orders' && (
        <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h2 className="font-cute text-lg font-bold text-slate-900">
            Daftar Antrean Order Cetak 3D Real-Time
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-cute">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400">
                  <th className="py-3 px-4">ORDER ID</th>
                  <th className="py-3 px-4">PEMESAN</th>
                  <th className="py-3 px-4">PRODUK</th>
                  <th className="py-3 px-4">TOTAL</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4">ACTION STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-bold text-pink-600">{o.id}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{o.customer}</td>
                    <td className="py-3.5 px-4 text-slate-600">{o.item}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      Rp {o.total.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-pink-50 text-pink-700 font-bold border border-pink-200">
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={o.status}
                        onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                        className="p-1.5 text-xs rounded-xl border border-slate-200 font-cute bg-white focus:border-pink-500"
                      >
                        <option value="Pesanan Diterima">Pesanan Diterima</option>
                        <option value="3D Slicing & File Prep">3D Slicing & File Prep</option>
                        <option value="Printing in Progress">Printing in Progress</option>
                        <option value="Post-Processing & QC">Post-Processing & QC</option>
                        <option value="Pengiriman Kurir">Pengiriman Kurir</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: FLEET */}
      {activeTab === 'fleet' && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Bambu Lab X1-Carbon #01', status: 'Active (82%)', temp: 'Nozzle: 220°C | Bed: 65°C', job: 'Topo Relief Strava' },
            { name: 'Elegoo Mars 4 8K Resin #02', status: 'Active (45%)', temp: 'UV Light Exposure: 2.5s', job: 'Anime Artisanal Keycaps' },
            { name: 'Prusa MK4 #03', status: 'Standby / Idle', temp: 'Nozzle: 25°C | Bed: 25°C', job: 'Siap untuk antrean baru' },
          ].map((m, idx) => (
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
      )}

      {/* TAB CONTENT: METRICS & FOUNDERS */}
      {activeTab === 'metrics' && (
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
              <div className="p-4 bg-pink-50 rounded-2xl border border-pink-200">
                <div className="font-bold text-slate-900">Dimitri</div>
                <div className="text-xs text-pink-600 font-bold">Chief Executive Officer (CEO)</div>
                <div className="text-[11px] text-slate-500 mt-1">Lead 3D Designer & Product Visionary</div>
              </div>
              <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200">
                <div className="font-bold text-slate-900">Bayu</div>
                <div className="text-xs text-sky-600 font-bold">Chief Operating Officer (COO)</div>
                <div className="text-[11px] text-slate-500 mt-1">Head of 3D Printing Fleet & Logistics</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200">
                <div className="font-bold text-slate-900">Puja</div>
                <div className="text-xs text-purple-600 font-bold">Chief Creative Officer (CCO)</div>
                <div className="text-[11px] text-slate-500 mt-1">Creative Art Director & Finishing Specialist</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
