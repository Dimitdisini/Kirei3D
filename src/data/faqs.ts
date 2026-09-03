export interface FaqItem {
  id: number;
  q: string;
  a: string;
}

export const initialFaqs: FaqItem[] = [
  {
    id: 1,
    q: 'Berapa lama proses pembuatan cetak 3D kustom?',
    a: 'Proses produksi memakan waktu 1–3 hari kerja tergantung ukuran & kompleksitas file 3D kamu.',
  },
  {
    id: 2,
    q: 'Bahan/Filamen apa yang digunakan di Kirei3D?',
    a: 'Kami menggunakan PLA+ ramah lingkungan bersertifikat ramah anak, serta Resin 8K presisi tinggi untuk detail halus.',
  },
  {
    id: 3,
    q: 'Bagaimana cara mengirim file 3D / foto rute Strava saya?',
    a: 'Kamu bisa upload gambar/file di simulator 3D di atas atau kirimkan langsung via WhatsApp tim kami.',
  },
  {
    id: 4,
    q: 'Apakah bisa cetak jumlah banyak untuk event / kantor?',
    a: 'Sangat bisa! Silakan masuk ke halaman B2B & Event untuk penawaran diskon khusus grosir/bulk order.',
  },
];
