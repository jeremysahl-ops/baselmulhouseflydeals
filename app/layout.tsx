import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'BaselMulhouse Fly Deals ✈️ – Meilleurs deals vols Basel-Mulhouse',
    template: '%s | BaselMulhouse Fly Deals',
  },
  description:
    'Bons plans vols, city trips, séjours et deals dernière minute au départ de l\'EuroAirport Basel-Mulhouse-Freiburg. Site indépendant.',
  keywords: [
    'bons plans vols Basel-Mulhouse',
    'deals vols EuroAirport',
    'vols pas chers Basel',
    'promo vols Mulhouse',
    'city trip départ Basel',
    'séjour pas cher Alsace',
  ],
  authors: [{ name: 'BaselMulhouseFlyDeals' }],
  metadataBase: new URL('https://baselmulhouseflydeals.com'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://baselmulhouseflydeals.com',
    siteName: 'BaselMulhouse Fly Deals',
    title: 'BaselMulhouse Fly Deals ✈️ – Les meilleurs deals depuis Basel-Mulhouse',
    description: 'Vols, city trips, séjours et promos au départ de l\'EuroAirport.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BaselMulhouse Fly Deals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BaselMulhouse Fly Deals ✈️',
    description: 'Les meilleurs deals vols depuis Basel-Mulhouse.',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Script id="travelpayouts" strategy="afterInteractive">{`
          (function () {
            var script = document.createElement("script");
            script.async = 1;
            script.src = 'https://emrldtp.com/NTA0MTYx.js?t=504161';
            document.head.appendChild(script);
          })();
        `}</Script>
      </body>
    </html>
  );
}
