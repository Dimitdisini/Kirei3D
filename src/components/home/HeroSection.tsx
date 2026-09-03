'use client';

import { Sparkles, ShoppingBag } from 'lucide-react';

interface HeroSectionProps {
  theme: 'girls' | 'boys';
}

export default function HeroSection({ theme }: HeroSectionProps) {
  return (
    <section className="relative py-12 sm:py-16 max-w-6xl mx-auto px-4 w-full">
      <div className="text-center max-w-3xl mx-auto">
        <div
          className={`inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-cute font-bold mb-4 border ${
            theme === 'girls'
              ? 'bg-pink-50 text-pink-600 border-pink-200'
              : 'bg-sky-50 text-sky-600 border-sky-200'
          }`}
        >
          <span>🎀</span> Modern 3D Atelier & Pop Culture Studio <span>✨</span>
        </div>

        <h1 className="font-cute text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
          Ubah Imajinasimu Menjadi{' '}
          <span
            className={
              theme === 'girls'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent'
            }
          >
            Karya 3D Nyata
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
          Spesialis cetak 3D kustom untuk miniatur chibi, plakat relief Strava, artisanal keycap,
          hingga merchandise event kantor berkualitas tinggi.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#customizer"
            className={`btn-bouncy px-6 py-3 rounded-2xl text-white font-cute font-bold text-sm shadow-lg flex items-center gap-2 ${
              theme === 'girls'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
                : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Mulai Kustomisasi 3D</span>
          </a>
          <a
            href="#catalog"
            className="btn-bouncy px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-cute font-bold text-sm border border-slate-200 shadow-xs flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-pink-500" />
            <span>Lihat Katalog Toko</span>
          </a>
        </div>
      </div>
    </section>
  );
}
