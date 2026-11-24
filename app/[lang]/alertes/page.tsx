import type { Metadata } from 'next';
import AlertesPrix from '@/components/AlertesPrix';
import { AIRPORTS, airportName } from '@/lib/airports';
import { formatMonth } from '@/lib/format';
import { DUREES, getVilles, moisDisponibles } from '@/lib/prix';
import { LOCALES, alternatesFor, getDict, isLang } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

// Pages entièrement statiques : les données ne changent qu'à une mise en ligne (quota ISR de Vercel, 22/11/2026).
export const revalidate = false;
export const dynamic = 'force-static';

interface Props {
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const dict = getDict(lang);
  return {
    title: dict.alerts.metaTitle,
    description: dict.alerts.metaDescription(dict.place.city),
    alternates: alternatesFor(lang, '/alertes'),
  };
}

export default async function AlertesPage({ params }: Props) {
  const lang = await langParam(params);
  const dict = getDict(lang);
  const t = dict.alerts;
  // Seules les destinations dont nous relevons les prix peuvent déclencher une alerte.
  const destinations = getVilles()
    .map((v) => v.code)
    .filter((c) => AIRPORTS[c] && !AIRPORTS[c].sansReleve)
    .map((code) => ({ code, nom: airportName(code, lang) }))
    .sort((a, b) => a.nom.localeCompare(b.nom, lang));

  return (
    <div className="container-page max-w-3xl py-10">
      <p className="eyebrow">{t.eyebrow}</p>
      <h1 className="display mt-2 text-5xl text-ink sm:text-6xl">{t.h1}</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">{t.lead}</p>
      <AlertesPrix
        lang={lang}
        destinations={destinations}
        durees={DUREES.map((d) => ({ value: d, label: `${dict.durees[d].label} (${dict.durees[d].hint})` }))}
        mois={moisDisponibles().map((m) => ({ value: m, label: formatMonth(m, lang) }))}
      />
    </div>
  );
}
