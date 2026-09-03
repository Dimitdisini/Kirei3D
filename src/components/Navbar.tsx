'use client';

import Link from 'next/link';
import { Sparkles, ShoppingBag, Truck, Crown, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  currentTheme?: 'girls' | 'boys';
  onThemeChange?: (theme: 'girls' | 'boys') => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function Navbar({
  currentTheme = 'girls',
  onThemeChange,
  cartCount = 0,
  onOpenCart,
}: NavbarProps) {
  return (
    <header className="w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/80 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white shadow-xs group-hover:rotate-12 transition-transform ${
              currentTheme === 'girls'
                ? 'bg-gradient-to-br from-pink-400 via-pink-500 to-purple-600'
                : 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600'
            }`}
          >
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-cute text-xl font-bold tracking-tight text-slate-900">
              Kirei
              <span className={currentTheme === 'girls' ? 'text-pink-600' : 'text-sky-600'}>
                3D
              </span>
            </span>
            <span className="text-[9px] font-cute text-slate-400 font-bold uppercase tracking-widest border-l border-slate-200 pl-1.5 hidden sm:inline-block">
              Atelier & 3D Print Studio
            </span>
          </div>
        </Link>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2.5">
          {/* THEME TOGGLE */}
          {onThemeChange && (
            <button
              onClick={() => onThemeChange(currentTheme === 'girls' ? 'boys' : 'girls')}
              className="btn-bouncy px-3 py-1.5 rounded-full text-xs font-cute font-bold flex items-center gap-1.5 border border-slate-200 bg-white shadow-xs text-slate-700 hover:bg-slate-50"
              title="Ganti Tema"
            >
              {currentTheme === 'girls' ? (
                <>
                  <span className="text-pink-500">🎀 Girls</span>
                </>
              ) : (
                <>
                  <span className="text-sky-500">⚡ Boys</span>
                </>
              )}
            </button>
          )}

          {/* TRACKING LINK */}
          <Link
            href="/tracking"
            className="btn-bouncy px-3 py-1.5 rounded-full text-xs font-cute font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 hidden sm:flex items-center gap-1.5 border border-sky-200"
          >
            <Truck className="w-3.5 h-3.5 text-sky-500" />
            <span>Lacak Order</span>
          </Link>

          {/* B2B LINK */}
          <Link
            href="/b2b"
            className="btn-bouncy px-3 py-1.5 rounded-full text-xs font-cute font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 hidden sm:flex items-center gap-1.5 border border-purple-200"
          >
            <Crown className="w-3.5 h-3.5 text-purple-500" />
            <span>B2B & Event</span>
          </Link>

          {/* CART BUTTON */}
          {onOpenCart && (
            <button
              onClick={onOpenCart}
              className={`btn-bouncy px-3.5 py-1.5 rounded-full text-xs font-cute font-bold text-white shadow-xs flex items-center gap-1.5 ${
                currentTheme === 'girls'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
                  : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Keranjang</span>
              <span className="w-5 h-5 rounded-full bg-white text-pink-600 flex items-center justify-center text-[10px] font-bold">
                {cartCount}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
