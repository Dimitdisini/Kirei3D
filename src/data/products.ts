export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  img: string;
  badge: string;
  desc: string;
}

export const initialProducts: Product[] = [
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
