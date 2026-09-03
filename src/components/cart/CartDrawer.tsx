'use client';

import { useState } from 'react';
import { X, ShoppingBag, CheckCircle2, QrCode, Send } from 'lucide-react';
import { CartItem } from '@/types/order';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (index: number, delta: number) => void;
  onOpenQris: (amount: number, label: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onOpenQris,
}: CartDrawerProps) {
  const [hasAddon, setHasAddon] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [voucherSuccess, setVoucherSuccess] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const addonCost = hasAddon ? 15000 : 0;
  const subtotalWithAddon = rawSubtotal + addonCost;
  const finalTotal = Math.round(subtotalWithAddon * (1 - discountPercent));

  const handleApplyVoucher = () => {
    if (voucherCode.trim().toUpperCase() === 'KIREI15') {
      setDiscountPercent(0.15);
      setVoucherSuccess(true);
      confetti({ particleCount: 40, spread: 60 });
    } else {
      alert('Kode voucher tidak valid! (Gunakan KIREI15 untuk diskon 15%)');
    }
  };

  const handleCheckoutWA = () => {
    if (cart.length === 0) {
      alert('Keranjang belanja masih kosong!');
      return;
    }
    let summary = 'Halo Kirei3D! Saya ingin memesan produk berikut:%0A';
    cart.forEach((item, idx) => {
      summary += `${idx + 1}. ${item.title} (${item.qty}x) - Rp ${(
        item.price * item.qty
      ).toLocaleString('id-ID')}%0A`;
    });
    if (hasAddon) {
      summary += `+ Mystery Blind Bag Charm (1x) - Rp 15.000%0A`;
    }
    summary += `%0ATotal Biaya: Rp ${finalTotal.toLocaleString(
      'id-ID'
    )}%0ABisa dibantu proses pembayarannya kak?`;
    window.open(`https://wa.me/6281219159200?text=${summary}`, '_blank');
  };

  const handleCheckoutQRIS = () => {
    if (cart.length === 0) {
      alert('Keranjang belanja masih kosong!');
      return;
    }
    onOpenQris(finalTotal, 'Order Keranjang Kirei3D');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* DRAWER CONTENT */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
        {/* HEADER */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-pink-600" />
            <h2 className="font-cute text-lg font-bold text-slate-900">Keranjang Belanja</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 flex items-center justify-center btn-bouncy"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* CART ITEMS LIST */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-cute text-xs">
              <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-40" />
              Keranjang belanja kamu masih kosong.
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.img || '/assets/chibi.jpg'}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded-xl border border-slate-200"
                  />
                  <div>
                    <div className="font-cute font-bold text-xs text-slate-900">{item.title}</div>
                    <div className="text-[11px] text-pink-600 font-cute font-bold">
                      Rp {item.price.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => onUpdateQty(index, -1)}
                    className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center hover:bg-slate-200"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-cute font-bold text-xs">{item.qty}</span>
                  <button
                    onClick={() => onUpdateQty(index, 1)}
                    className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center hover:bg-slate-200"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}

          {cart.length > 0 && (
            <>
              {/* ADD-ON CHECKBOX */}
              <div className="p-3 bg-pink-50/70 rounded-2xl border border-pink-200 flex items-center gap-2.5 mt-4">
                <input
                  type="checkbox"
                  id="addonBlindBag"
                  checked={hasAddon}
                  onChange={(e) => setHasAddon(e.target.checked)}
                  className="rounded text-pink-600 focus:ring-pink-500 w-4 h-4"
                />
                <label htmlFor="addonBlindBag" className="text-xs font-cute font-bold text-slate-800 cursor-pointer">
                  + Mystery Blind Bag Charm (+Rp 15.000)
                </label>
              </div>

              {/* VOUCHER CODE */}
              <div className="mt-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Kode Voucher (Coba: KIREI15)"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 font-cute"
                  />
                  <button
                    onClick={handleApplyVoucher}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-white font-cute text-xs font-bold hover:bg-slate-900 btn-bouncy"
                  >
                    Gunakan
                  </button>
                </div>
                {voucherSuccess && (
                  <div className="mt-1.5 text-[11px] font-cute text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Voucher KIREI15 berhasil dipasang (Diskon 15%)!
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* FOOTER TOTAL & CHECKOUT */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-cute font-bold text-sm text-slate-600">Total Biaya:</span>
            <span className="font-cute font-bold text-lg text-pink-600">
              Rp {finalTotal.toLocaleString('id-ID')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleCheckoutQRIS}
              disabled={cart.length === 0}
              className="py-2.5 px-3 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-cute font-bold shadow-xs flex items-center justify-center gap-1.5 btn-bouncy"
            >
              <QrCode className="w-4 h-4 text-emerald-400" />
              <span>Bayar QRIS</span>
            </button>

            <button
              onClick={handleCheckoutWA}
              disabled={cart.length === 0}
              className="py-2.5 px-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 text-white text-xs font-cute font-bold shadow-xs flex items-center justify-center gap-1.5 btn-bouncy"
            >
              <Send className="w-4 h-4" />
              <span>Order via WA</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
