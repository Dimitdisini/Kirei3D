'use client';

import { useState } from 'react';
import { X, Star, Upload } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (name: string, product: string, comment: string, photo: string) => void;
}

export default function ReviewModal({ isOpen, onClose, onSubmitReview }: ReviewModalProps) {
  const [name, setName] = useState('');
  const [product, setProduct] = useState('Chibi Doll Custom');
  const [comment, setComment] = useState('');
  const [photoBase64, setPhotoBase64] = useState('');

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setPhotoBase64(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      alert('Silakan lengkapi nama dan isi ulasan kamu!');
      return;
    }
    onSubmitReview(name.trim(), product, comment.trim(), photoBase64);
    setName('');
    setComment('');
    setPhotoBase64('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl z-10 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="font-cute text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span>Tulis Ulasan Kamu</span>
        </h3>
        <p className="text-xs text-slate-500 mb-4">Bagikan pengalaman belanja 3D kamu di Kirei3D Atelier</p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-cute font-bold text-slate-700 mb-1">Nama Kamu</label>
            <input
              type="text"
              placeholder="Contoh: Aurel A."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 font-cute"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-cute font-bold text-slate-700 mb-1">Produk Yang Dibeli</label>
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 font-cute bg-white"
            >
              <option value="Chibi Doll Custom">Chibi Doll Custom</option>
              <option value="Fidget Art Toy Axolotl">Fidget Art Toy Axolotl</option>
              <option value="Anime Artisanal Keycap">Anime Artisanal Keycap</option>
              <option value="Strava Topo Trophy 3D">Strava Topo Trophy 3D</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-cute font-bold text-slate-700 mb-1">Ulasan Kamu</label>
            <textarea
              rows={3}
              placeholder="Hasil print-nya rapi banget! Warnanya pas dengan pesanan..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 font-cute"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-cute font-bold text-slate-700 mb-1">Foto Hasil Print (Opsional)</label>
            <label className="border-2 border-dashed border-slate-200 hover:border-pink-400 p-3 rounded-2xl flex items-center justify-center gap-2 cursor-pointer bg-slate-50 transition-colors">
              <Upload className="w-4 h-4 text-pink-500" />
              <span className="text-xs font-cute text-slate-600">
                {photoBase64 ? '✓ Foto Terpilih' : 'Upload Foto Hasil Print'}
              </span>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-cute font-bold text-sm shadow-md btn-bouncy mt-2"
          >
            Kirim Ulasan ✨
          </button>
        </form>
      </div>
    </div>
  );
}
