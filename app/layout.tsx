import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE } from '@/lib/site';

const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `Vols directs pas chers au départ de Bâle-Mulhouse | ${SITE.name}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Les vols directs à prix réellement bas au départ de l'EuroAirport Bâle-Mulhouse : chaque prix est comparé au tarif habituel de la destination. Site indépendant, mis à jour deux fois par semaine.",
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE.url,
    siteName: SITE.name,
    title: 'Vols directs pas chers au départ de Bâle-Mulhouse',
    description: "Uniquement les prix réellement bas, comparés au tarif habituel de chaque destination.",
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/favicon.svg' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: '#0b2545' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${geist.variable} font-sans antialiased`}>
        <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" className="min-h-[70vh]">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
