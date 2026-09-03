'use client';

import { useState } from 'react';
import ThreeViewer from '@/components/three/ThreeViewer';
import { Palette, Layers, ShoppingBag, Send } from 'lucide-react';

interface CustomizerSectionProps {
  onAddToCart: (title: string, price: number, img: string) => void;
}

export default function CustomizerSection({ onAddToCart }: CustomizerSectionProps) {
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

    onAddToCart(itemTitle, calculatedTotal, itemImg);
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

  return (
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

            <ThreeViewer
              currentModel={calcModel}
              currentColor={calcColorHex}
              onColorChange={(name, hex) => {
                setCalcColorName(name);
                setCalcColorHex(hex);
              }}
            />

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

          {/* RIGHT: FORM */}
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
  );
}
