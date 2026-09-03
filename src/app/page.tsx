'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/common/Navbar';
import QrisModal from '@/components/common/QrisModal';
import ReviewModal from '@/components/common/ReviewModal';
import CartDrawer from '@/components/cart/CartDrawer';
import HeroSection from '@/components/home/HeroSection';
import CustomizerSection from '@/components/home/CustomizerSection';
import ProductCatalog from '@/components/home/ProductCatalog';
import ReviewSection from '@/components/home/ReviewSection';
import FaqSection from '@/components/home/FaqSection';
import { Product } from '@/types/product';
import { FaqItem } from '@/types/faq';
import { Review } from '@/types/review';
import { CartItem } from '@/types/order';
import { fetchProducts, fetchFaqs } from '@/services/productService';
import { fetchReviews, submitReview } from '@/services/reviewService';
import confetti from 'canvas-confetti';

export default function HomePage() {
  const [theme, setTheme] = useState<'girls' | 'boys'>('girls');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Dynamic API Fetched States
  const [products, setProducts] = useState<Product[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [qrisModalState, setQrisModalState] = useState({ isOpen: false, amount: 0, label: '' });
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    document.body.className = `theme-${theme} selection:bg-pink-200 selection:text-pink-900 min-h-screen flex flex-col justify-between`;
  }, [theme]);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const [pData, fData, rData] = await Promise.all([
        fetchProducts(),
        fetchFaqs(),
        fetchReviews(),
      ]);
      setProducts(pData);
      setFaqs(fData);
      setReviews(rData);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleAddToCart = (title: string, price: number, img: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.title === title);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].qty += 1;
        return updated;
      }
      return [...prev, { title, price, img, qty: 1 }];
    });
    setIsCartOpen(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
  };

  const handleUpdateQty = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      updated[index].qty += delta;
      if (updated[index].qty <= 0) {
        updated.splice(index, 1);
      }
      return updated;
    });
  };

  const handleAddReview = async (name: string, product: string, comment: string, photo: string) => {
    const newRev = await submitReview({ name, product, comment, photo });
    if (newRev) {
      setReviews((prev) => [newRev, ...prev]);
      confetti({ particleCount: 50, spread: 60 });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* NAVBAR */}
      <Navbar
        currentTheme={theme}
        onThemeChange={(t) => setTheme(t)}
        cartCount={cart.reduce((sum, i) => sum + i.qty, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* HERO SECTION */}
      <HeroSection theme={theme} />

      {/* 3D INTERACTIVE CUSTOMIZER STUDIO SECTION */}
      <CustomizerSection onAddToCart={handleAddToCart} />

      {/* CATALOG STORE SECTION */}
      <ProductCatalog products={products} isLoading={isLoading} onAddToCart={handleAddToCart} />

      {/* REVIEWS SECTION */}
      <ReviewSection reviews={reviews} onOpenReviewModal={() => setIsReviewModalOpen(true)} />

      {/* FAQ SECTION */}
      <FaqSection faqs={faqs} />

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4">
          <div className="font-cute font-bold text-sm text-slate-900 mb-1">Kirei3D Atelier Studio</div>
          <p>© 2026 Kirei3D Atelier. Scalable Modular Next.js Architecture.</p>
        </div>
      </footer>

      {/* MODALS & DRAWERS */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onOpenQris={(amount, label) => {
          setIsCartOpen(false);
          setQrisModalState({ isOpen: true, amount, label });
        }}
      />

      <QrisModal
        isOpen={qrisModalState.isOpen}
        onClose={() => setQrisModalState({ isOpen: false, amount: 0, label: '' })}
        amount={qrisModalState.amount}
        label={qrisModalState.label}
        onConfirmSuccess={() => {
          setCart([]);
          setQrisModalState({ isOpen: false, amount: 0, label: '' });
        }}
      />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleAddReview}
      />
    </div>
  );
}
