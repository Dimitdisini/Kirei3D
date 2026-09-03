'use client';

import { useState } from 'react';
import { FaqItem } from '@/types/faq';
import { ChevronDown } from 'lucide-react';

interface FaqSectionProps {
  faqs: FaqItem[];
}

export default function FaqSection({ faqs }: FaqSectionProps) {
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-14 max-w-4xl mx-auto px-4 w-full">
      <div className="text-center mb-8">
        <h2 className="font-cute text-3xl font-bold text-slate-900 mb-2">Pertanyaan Umum (FAQ)</h2>
        <p className="text-xs text-slate-500">Hal yang sering ditanyakan sebelum melakukan order 3D</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div key={faq.id || idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)}
              className="w-full p-4 text-left font-cute font-bold text-sm text-slate-800 flex items-center justify-between"
            >
              <span>{faq.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  faqOpenIndex === idx ? 'rotate-180 text-pink-600' : ''
                }`}
              />
            </button>
            {faqOpenIndex === idx && (
              <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
