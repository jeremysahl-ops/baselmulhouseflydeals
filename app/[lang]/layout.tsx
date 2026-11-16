import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed, Geist, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE } from '@/lib/site';
import { LOCALES, OG_LOCALE, alternatesFor, getDict, isLang, localePath } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const display = Barlow_Condensed({ variable: '--ff-display', subsets: ['latin'], weight: ['600', '700'] });
const board = JetBrains_Mono({ variable: '--ff-board', subsets: ['latin'], weight: ['500', '700'] });

interface Props {
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getDict(lang);
  return {
    metadataBase: new URL(SITE.url),
    title: { default: `${t.meta.defaultTitle} | ${SITE.name}`, template: `%s | ${SITE.name}` },
    description: t.meta.description,
    alternates: alternatesFor(lang, '/'),
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[lang],
      url: `${SITE.url}${localePath(lang, '/')}`,
      siteName: SITE.name,
      title: t.meta.defaultTitle,
      description: t.meta.ogDescription,
      images: ['/opengraph-image'],
    },
    twitter: { card: 'summary_large_image' },
    icons: { icon: '/favicon.svg' },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = { themeColor: '#0d1b2e' };

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode }> & Props) {
  const lang = await langParam(params);
  const t = getDict(lang);
  return (
    <html lang={lang}>
      <body className={`${geist.variable} ${display.variable} ${board.variable} font-sans antialiased`}>
        <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold">
          {t.common.skip}
        </a>
        <Header lang={lang} />
        <main id="contenu" className="min-h-[70vh]">{children}</main>
        <Footer lang={lang} />
        <Analytics />
      </body>
    </html>
  );
}
