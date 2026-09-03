'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Crown, ArrowLeft, Truck, Send, Award, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function B2BPage() {
  const [pcsQty, setPcsQty] = useState(50);
  const [prodType, setProdType] = useState('trophy'); // trophy | medal | merch
  const [orgName, setOrgName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [notes, setNotes] = useState('');

  const getBasePrice = () => {
    if (prodType === 'trophy') return 85000;
    if (prodType === 'medal') return 35000;
    return 25000; // merch
  };

  const getTierDiscount = (qty: number) => {
    if (qty >= 200) return 0.25; // 25%
    if (qty >= 100) return 0.2; // 20%
    if (qty >= 50) return 0.15; // 15%
    return 0.1; // 10%
  };

  const baseUnitPrice = getBasePrice();
  const discountPercent = getTierDiscount(pcsQty);
  const finalUnitPrice = Math.round(baseUnitPrice * (1 - discountPercent));
  const grandTotal = finalUnitPrice * pcsQty;

  const handleConsultWA = () => {
    const msg = encodeURIComponent(
      `Halo Tim B2B Kirei3D! Saya dari [${orgName || 'Komunitas/Kantor'}] ingin konsultasi order bulk 3D:\n- Jenis: ${prodType.toUpperCase()}\n- Qty: ${pcsQty} pcs\n- Estimasi Total: Rp ${grandTotal.toLocaleString(
        'id-ID'
      )}\n- Tanggal Event: ${eventDate || 'Segera'}\n- Catatan: ${notes || '-'}`
    );
    window.open(`https://wa.me/6281219159200?text=${msg}`, '_blank');
    confetti({ particleCount: 40, spread: 50 });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-900 selection:bg-purple-200 selection:text-purple-900 pb-20">
      {/* TOP NAVBAR */}
      <header className="w-full bg-white/90 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-600 to-pink-500 flex items-center justify-center text-white shadow-xs group-hover:rotate-12 transition-transform">
              <Crown className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-cute text-xl font-bold tracking-tight text-slate-900">
                Kirei<span className="text-purple-600">B2B</span>
              </span>
              <span className="text-[9px] font-cute text-slate-400 font-bold uppercase tracking-widest border-l border-slate-200 pl-1.5 hidden sm:inline-block">
                Corporate & Event
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
              href="/tracking"
              className="btn-bouncy px-3.5 py-1.5 rounded-full text-xs font-cute font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 hidden sm:flex items-center gap-1.5 border border-sky-200"
            >
              <Truck className="w-3.5 h-3.5 text-sky-500" />
              <span>Lacak Order</span>
            </Link>

            <button
              onClick={handleConsultWA}
              className="btn-bouncy px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-cute font-bold shadow-xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Konsultasi WA</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="py-14 sm:py-20 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-cute font-bold mb-4 border border-purple-200">
          <span>🏆</span> Solusi Custom 3D Batch & Event Partner <span>✨</span>
        </div>
        <h1 className="font-cute text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
          Piala Turnamen Unik, Finisher Lari & Merchandise Kantor Berkelas
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
          Melayani pembuatan piala e-sports/sports 3D kustom, medali finisher berbahan filamen sutra,
          hingga gift kit perusahaan dalam kuantitas besar.
        </p>
      </section>

      {/* BULK CALCULATOR SECTION */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-200 shadow-md">
          <div className="text-center mb-6">
            <h2 className="font-cute text-2xl font-bold text-slate-900">
              Kalkulator Harga Grosir / Bulk Order
            </h2>
            <p className="text-xs text-slate-500">
              Semakin banyak kuantitas pemesanan, potongan harga semakin besar (hingga 25% OFF)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-8">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-cute font-bold text-slate-700 mb-1">
                  Kategori Produk Event
                </label>
                <select
                  value={prodType}
                  onChange={(e) => setProdType(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 font-cute bg-white focus:border-purple-500"
                >
                  <option value="trophy">Trophy / Piala Turnamen 3D (Base: Rp 85.000)</option>
                  <option value="medal">Medali Finisher Strava / Lari (Base: Rp 35.000)</option>
                  <option value="merch">Custom Keycap / Keychain Logo (Base: Rp 25.000)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-cute font-bold text-slate-700 mb-1">
                  <span>Jumlah Kuantitas (Pcs):</span>
                  <span className="text-purple-600 font-bold">{pcsQty} Pcs</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={500}
                  step={5}
                  value={pcsQty}
                  onChange={(e) => setPcsQty(parseInt(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-cute">
                <input
                  type="text"
                  placeholder="Nama Perusahaan / Event"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-200 focus:border-purple-500"
                />
                <input
                  type="text"
                  placeholder="Target Tanggal Event"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-200 focus:border-purple-500"
                />
              </div>
            </div>

            {/* PRICING RESULT CARD */}
            <div className="bg-purple-50/70 p-6 rounded-2xl border border-purple-200 text-center">
              <div className="text-[11px] font-cute text-purple-600 font-bold mb-1">
                POTONGAN DISKON GROSIR ({Math.round(discountPercent * 100)}% OFF)
              </div>
              <div className="text-3xl font-cute font-bold text-slate-900 mb-1">
                Rp {grandTotal.toLocaleString('id-ID')}
              </div>
              <div className="text-xs text-slate-500 mb-4">
                Rp {finalUnitPrice.toLocaleString('id-ID')} / pcs (Hemat Rp{' '}
                {Math.round(baseUnitPrice * discountPercent).toLocaleString('id-ID')} / pcs)
              </div>

              <button
                onClick={handleConsultWA}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-cute font-bold text-xs shadow-md btn-bouncy flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Konsultasi & Ajukan Penawaran WA</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
