'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ThreeViewer from '@/components/ThreeViewer';
import CartDrawer, { CartItem } from '@/components/CartDrawer';
import QrisModal from '@/components/QrisModal';
import ReviewModal from '@/components/ReviewModal';
import {
  Sparkles,
  ShoppingBag,
  Upload,
  Check,
  ChevronDown,
  Star,
  Send,
  Heart,
  Palette,
  Layers,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Review {
  name: string;
  product: string;
  comment: string;
  photo: string;
  time: string;
}

const PRODUCTS = [
  {
    id: 'chibi-custom',
    title: 'Miniatur Chibi Custom DIY Kit',
    category: 'Art Toy',
    price: 95000,
    img: '/assets/chibi.jpg',
    badge: '🔥 Terlaris',
    desc: 'Figurine chibi 3D custom lengkap dengan base display & acrylic paint kit.',
  },
  {
    id: 'fidget-axolotl',
    title: 'Fidget Art Toy Axolotl Articulated',
    category: 'Fidget',
    price: 45000,
    img: '/assets/fidget.jpg',
    badge: '✨ Cute & Flexible',
    desc: 'Mainan fidget 3D terartikulasi fleksibel dengan bahan PLA sutra mengkilap.',
  },
  {
    id: 'keycap-anime',
    title: 'Artisanal Keycap Anime Pop',
    category: 'Keycap',
    price: 35000,
    img: '/assets/keycap.jpg',
    badge: '⌨️ Mechanical Keyboard',
    desc: 'Keycap custom 3D resin/PLA presisi cocok untuk switch Cherry MX / Outemu.',
  },
  {
    id: 'strava-topo',
    title: 'Plakat Strava Topo 3D Relief',
    category: 'Relief',
    price: 150000,
    img: '/assets/topo_map.jpg',
    badge: '🏆 Trophy & Medali',
    desc: 'Plakat peta kontur 3D dari rute lari/sepeda Strava kamu.',
  },
  {
    id: 'photocard-frame',
    title: 'Kpop Photocard 3D Frame Stand',
    category: 'Frame',
    price: 65000,
    img: '/assets/photocard.jpg',
    badge: '🎀 Collector Item',
    desc: 'Stand frame photocard akrilik + 3D print border pastel untuk koleksi K-Pop kamu.',
  },
];

const FAQS = [
  {
    q: 'Berapa lama proses pembuatan cetak 3D kustom?',
    a: 'Proses produksi memakan waktu 1–3 hari kerja tergantung ukuran & kompleksitas file 3D kamu.',
  },
  {
    q: 'Bahan/Filamen apa yang digunakan di Kirei3D?',
    a: 'Kami menggunakan PLA+ ramah lingkungan bersertifikat ramah anak, serta Resin 8K presisi tinggi untuk detail halus.',
  },
  {
    q: 'Bagaimana cara mengirim file 3D / foto rute Strava saya?',
    a: 'Kamu bisa upload gambar/file di simulator 3D di atas atau kirimkan langsung via WhatsApp tim kami.',
  },
  {
    q: 'Apakah bisa cetak jumlah banyak untuk event / kantor?',
    a: 'Sangat bisa! Silakan masuk ke halaman B2B & Event untuk penawaran diskon khusus grosir/bulk order.',
  },
];

export default function HomePage() {
  const [theme, setTheme] = useState<'girls' | 'boys'>('girls');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 3D Simulator State
  const [calcModel, setCalcModel] = useState('chibi');
  const [calcColorName, setCalcColorName] = useState('Sakura Pink');
  const [calcColorHex, setCalcColorHex] = useState('#FFB7C5');
  const [calcBasePrice, setCalcBasePrice] = useState(95000);
  const [calcMatExtra, setCalcMatExtra] = useState(0);
  const [calcScale, setCalcScale] = useState(1);
  const [addonPaintKit, setAddonPaintKit] = useState(false);
  const [addonGiftBox, setAddonGiftBox] = useState(false);
  const [custName, setCustName] = useState('');
  const [custNotes, setCustNotes] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  // Modals
  const [qrisModalState, setQrisModalState] = useState({ isOpen: false, amount: 0, label: '' });
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([
    {
      name: 'Aura & Team',
      product: 'Plakat Strava Topo 3D',
      comment: 'Keren banget hasil 3D relief rute maratonnya! Sangat detail dan rapi.',
      photo: '/assets/review_trophy.jpg',
      time: '2 hari lalu',
    },
    {
      name: 'Rin & Kiki',
      product: 'Chibi Doll Custom Pair',
      comment: 'Warna sakuranya cantik banget. Cat akriliknya juga dapet lengkap!',
      photo: '/assets/review_chibi.jpg',
      time: 'Kemarin',
    },
  ]);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    document.body.className = `theme-${theme} selection:bg-pink-200 selection:text-pink-900 min-h-screen flex flex-col justify-between`;
  }, [theme]);

  // Cart operations
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

  // Custom Simulator Calculations
  const calculatedTotal = Math.round(
    (calcBasePrice + calcMatExtra) * calcScale +
      (addonPaintKit ? 15000 : 0) +
      (addonGiftBox ? 10000 : 0)
  );

  const handleAddSimulationToCart = () => {
    const itemTitle = `${calcModel.toUpperCase()} Custom (${calcColorName}${
      custNotes ? ' - ' + custNotes : ''
    })`;
    const itemImg =
      calcModel === 'topo'
        ? '/assets/topo_map.jpg'
        : calcModel === 'keycap'
        ? '/assets/keycap.jpg'
        : calcModel === 'trophy'
        ? '/assets/trophy_esports.jpg'
        : '/assets/chibi.jpg';

    handleAddToCart(itemTitle, calculatedTotal, itemImg);
  };

  const handleSubmitSimulationWA = () => {
    const msg = encodeURIComponent(
      `Halo Kirei3D! Saya ingin memesan Kustom 3D:\n- Nama: ${
        custName || 'Pelanggan'
      }\n- Jenis Model: ${calcModel.toUpperCase()}\n- Warna Filamen: ${calcColorName}\n- Estimasi Biaya: Rp ${calculatedTotal.toLocaleString(
        'id-ID'
      )}\n- Catatan: ${custNotes || 'Sesuai spesifikasi'}`
    );
    window.open(`https://wa.me/6281219159200?text=${msg}`, '_blank');
  };

  const handleAddReview = (name: string, product: string, comment: string, photo: string) => {
    setReviews((prev) => [
      {
        name,
        product,
        comment,
        photo: photo || '/assets/chibi.jpg',
        time: 'Baru Saja',
      },
      ...prev,
    ]);
    confetti({ particleCount: 50, spread: 60 });
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

      {/* 3D INTERACTIVE CUSTOMIZER STUDIO SECTION */}
      <section id="customizer" className="py-12 bg-white/70 backdrop-blur-md border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-cute font-bold mb-2 border border-purple-200">
              <Palette className="w-3.5 h-3.5" /> Studio Simulasi 3D Real-Time
            </div>
            <h2 className="font-cute text-3xl font-bold text-slate-900">
              Desain & Simulasi Cetak 3D Kamu
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: 3D VIEWPORT */}
            <div className="lg:col-span-6 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="font-cute font-bold text-xs text-slate-700 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-pink-500" /> Model 3D Canvas
                </span>
                <span className="text-[11px] font-cute text-slate-400">Putar / Drag dengan mouse</span>
              </div>

              {/* THREE VIEWER CLIENT COMPONENT */}
              <ThreeViewer
                currentModel={calcModel}
                currentColor={calcColorHex}
                onColorChange={(name, hex) => {
                  setCalcColorName(name);
                  setCalcColorHex(hex);
                }}
              />

              {/* MODEL TYPE BUTTONS */}
              <div className="mt-4 grid grid-cols-4 gap-2">
                {[
                  { id: 'chibi', label: 'Chibi Doll', price: 95000 },
                  { id: 'trophy', label: 'Trophy 3D', price: 120000 },
                  { id: 'topo', label: 'Topo Relief', price: 150000 },
                  { id: 'keycap', label: 'Keycap Anime', price: 35000 },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setCalcModel(m.id);
                      setCalcBasePrice(m.price);
                    }}
                    className={`p-2 rounded-xl text-xs font-cute font-bold text-left border transition-all ${
                      calcModel === m.id
                        ? 'border-2 border-pink-500 bg-pink-50 text-pink-600'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: CUSTOMIZER FORM & PRICE CALCULATOR */}
            <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-cute text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Spesifikasi & Kalkulator Biaya
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-cute font-bold text-slate-700 mb-1">
                    Bahan / Filamen
                  </label>
                  <select
                    value={calcMatExtra}
                    onChange={(e) => setCalcMatExtra(parseInt(e.target.value))}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 font-cute bg-white focus:border-pink-500"
                  >
                    <option value={0}>PLA+ Premium Standard (+Rp 0)</option>
                    <option value={15000}>Resin 8K High Detail (+Rp 15.000)</option>
                    <option value={20000}>Silk Metallic Gradient (+Rp 20.000)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-cute font-bold text-slate-700 mb-1">
                    Skala Ukuran
                  </label>
                  <select
                    value={calcScale}
                    onChange={(e) => setCalcScale(parseFloat(e.target.value))}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 font-cute bg-white focus:border-pink-500"
                  >
                    <option value={1}>Ukuran Standard (10cm) (1x)</option>
                    <option value={1.4}>Ukuran Medium (14cm) (1.4x)</option>
                    <option value={1.8}>Ukuran Large (18cm) (1.8x)</option>
                  </select>
                </div>
              </div>

              {/* ADD-ONS */}
              <div>
                <label className="block text-xs font-cute font-bold text-slate-700 mb-2">
                  Add-on Opsional:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-cute">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addonPaintKit}
                      onChange={(e) => setAddonPaintKit(e.target.checked)}
                      className="rounded text-pink-600 focus:ring-pink-500"
                    />
                    <span>+ Acrylic Paint Kit (+Rp 15.000)</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addonGiftBox}
                      onChange={(e) => setAddonGiftBox(e.target.checked)}
                      className="rounded text-pink-600 focus:ring-pink-500"
                    />
                    <span>+ Gift Box Premium (+Rp 10.000)</span>
                  </label>
                </div>
              </div>

              {/* NOTES / TEXT PLACARD */}
              <div>
                <label className="block text-xs font-cute font-bold text-slate-700 mb-1">
                  Catatan Kustom / Tulisan Plakat
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Nama: Aurel | Warna Dasar: Pink"
                  value={custNotes}
                  onChange={(e) => setCustNotes(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 font-cute focus:border-pink-500"
                />
              </div>

              {/* TOTAL & ACTION BUTTONS */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-cute text-slate-400 font-bold">ESTIMASI BIAYA</div>
                  <div className="text-2xl font-cute font-bold text-pink-600">
                    Rp {calculatedTotal.toLocaleString('id-ID')}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleAddSimulationToCart}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-cute font-bold text-xs btn-bouncy shadow-xs flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4" /> + Keranjang
                  </button>

                  <button
                    onClick={handleSubmitSimulationWA}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 text-white font-cute font-bold text-xs btn-bouncy shadow-xs flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4" /> Order WA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG STORE SECTION */}
      <section id="catalog" className="py-14 max-w-6xl mx-auto px-4 w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs font-cute font-bold mb-2 border border-pink-200">
            <ShoppingBag className="w-3.5 h-3.5" /> Ready Stock & Custom Catalog
          </div>
          <h2 className="font-cute text-3xl font-bold text-slate-900">
            Koleksi Pop Culture & Art Toys Terbaru
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((prod) => (
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
                  onClick={() => handleAddToCart(prod.title, prod.price, prod.img)}
                  className="btn-bouncy px-3.5 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-600 font-cute font-bold text-xs border border-pink-200 flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> + Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS & MARQUEE SECTION */}
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
              onClick={() => setIsReviewModalOpen(true)}
              className="btn-bouncy px-4 py-2 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-cute font-bold border border-slate-200 shadow-xs flex items-center gap-1.5"
            >
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Tulis Ulasan Kamu
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((rev, i) => (
              <div
                key={i}
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

      {/* FAQ SECTION */}
      <section className="py-14 max-w-4xl mx-auto px-4 w-full">
        <div className="text-center mb-8">
          <h2 className="font-cute text-3xl font-bold text-slate-900 mb-2">Pertanyaan Umum (FAQ)</h2>
          <p className="text-xs text-slate-500">Hal yang sering ditanyakan sebelum melakukan order 3D</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
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

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4">
          <div className="font-cute font-bold text-sm text-slate-900 mb-1">Kirei3D Atelier Studio</div>
          <p>© 2026 Kirei3D Atelier. Designed with Next.js & Three.js.</p>
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
