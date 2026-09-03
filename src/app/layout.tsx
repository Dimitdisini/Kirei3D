import type { Metadata } from 'next';
import { Fredoka, Poppins, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kirei3D Atelier — Custom 3D Printing & Pop Culture Art Toys',
  description: 'Atelier cetak 3D kustom, figurine chibi, plakat trophy finisher, keycap anime, dan merchandise pop culture di Indonesia.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎀</text></svg>",
  },
};

export const viewport = {
  themeColor: '#FF5C8A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${fredoka.variable} ${poppins.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="theme-girls selection:bg-pink-200 selection:text-pink-900 min-h-screen flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}
