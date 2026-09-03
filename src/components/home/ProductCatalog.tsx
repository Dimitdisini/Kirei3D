'use client';

import { Product } from '@/types/product';
import { ShoppingBag } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  isLoading?: boolean;
  onAddToCart: (title: string, price: number, img: string) => void;
}

export default function ProductCatalog({ products, isLoading, onAddToCart }: ProductCatalogProps) {
  return (
    <section id="catalog" className="py-14 max-w-6xl mx-auto px-4 w-full">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs font-cute font-bold mb-2 border border-pink-200">
          <ShoppingBag className="w-3.5 h-3.5" /> Ready Stock & Custom Catalog
        </div>
        <h2 className="font-cute text-3xl font-bold text-slate-900">
          Koleksi Pop Culture & Art Toys Terbaru
        </h2>
      </div>

      {isLoading ? (
        <div className="text-center py-12 font-cute text-slate-400">Memuat katalog dari API...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="glow-hover bg-white rounded-3xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                  <img
                    src={prod.img}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-cute px-2.5 py-1 rounded-full font-bold shadow-xs">
                    {prod.badge}
                  </span>
                </div>

                <div className="text-[11px] font-cute font-bold text-pink-600 uppercase mb-1">
                  {prod.category}
                </div>
                <h3 className="font-cute font-bold text-base text-slate-900 mb-1.5">
                  {prod.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{prod.desc}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="font-cute font-bold text-base text-slate-900">
                  Rp {prod.price.toLocaleString('id-ID')}
                </div>
                <button
                  onClick={() => onAddToCart(prod.title, prod.price, prod.img)}
                  className="btn-bouncy px-3.5 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-600 font-cute font-bold text-xs border border-pink-200 flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> + Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
