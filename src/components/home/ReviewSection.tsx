'use client';

import { Review } from '@/types/review';
import { Star } from 'lucide-react';

interface ReviewSectionProps {
  reviews: Review[];
  onOpenReviewModal: () => void;
}

export default function ReviewSection({ reviews, onOpenReviewModal }: ReviewSectionProps) {
  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-cute font-bold mb-2 border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Ulasan Pelanggan
            </div>
            <h2 className="font-cute text-3xl font-bold text-slate-900">
              Kata Mereka Tentang Kirei3D
            </h2>
          </div>

          <button
            onClick={onOpenReviewModal}
            className="btn-bouncy px-4 py-2 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-cute font-bold border border-slate-200 shadow-xs flex items-center gap-1.5"
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Tulis Ulasan Kamu
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex gap-4 items-center"
            >
              <img
                src={rev.photo}
                alt={rev.name}
                className="w-20 h-20 object-cover rounded-2xl border border-slate-100 shrink-0"
              />
              <div>
                <div className="flex items-center gap-1 text-amber-400 text-xs mb-1">
                  ★★★★★
                </div>
                <p className="text-xs text-slate-600 italic mb-2">"{rev.comment}"</p>
                <div className="font-cute font-bold text-xs text-slate-900">{rev.name}</div>
                <div className="text-[10px] text-slate-400">
                  Verified Buyer • {rev.product} ({rev.time})
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
