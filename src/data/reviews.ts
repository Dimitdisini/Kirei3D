export interface Review {
  id: string;
  name: string;
  product: string;
  comment: string;
  photo: string;
  time: string;
  rating: number;
}

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    name: 'Aura & Team',
    product: 'Plakat Strava Topo 3D',
    comment: 'Keren banget hasil 3D relief rute maratonnya! Sangat detail dan rapi.',
    photo: '/assets/review_trophy.jpg',
    time: '2 hari lalu',
    rating: 5,
  },
  {
    id: 'rev-2',
    name: 'Rin & Kiki',
    product: 'Chibi Doll Custom Pair',
    comment: 'Warna sakuranya cantik banget. Cat akriliknya juga dapet lengkap!',
    photo: '/assets/review_chibi.jpg',
    time: 'Kemarin',
    rating: 5,
  },
];
