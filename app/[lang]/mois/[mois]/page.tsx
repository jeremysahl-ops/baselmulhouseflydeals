import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Board from '@/components/Board';
import ComboExplorer from '@/components/ComboExplorer';
import { combosDuMois, meilleurParVille, moisDisponibles } from '@/lib/prix';
import { formatMonth } from '@/lib/format';
import { alternatesFor, getDict, isLang, localePath } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

export const revalidate = 3600;
export const dynamicParams = true;

interface Props {
  params: Promise<{ lang: string; mois: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, mois } = await params;
  if (!isLang(lang) || !/^\d{4}-\d{2}$/.test(mois)) return {};
  const dict = getDict(lang);
  const label = lang === 'de' ? formatMonth(mois, lang) : formatMonth(mois, lang).toLowerCase();
  return {
    title: dict.moisPage.metaTitle(label, dict.place.city),
    description: dict.moisPage.metaDescription(label, dict.place.city),
    alternates: alternatesFor(lang, `/mois/${mois}`),
  };
}

export default async function MoisPage({ params }: Props) {
  const lang = await langParam(params);
  const { mois } = await params;
  if (!/^\d{4}-\d{2}$/.test(mois) || !moisDisponibles().includes(mois)) notFound();
  const dict = getDict(lang);
  const t = dict.moisPage;
  const combos = combosDuMois(mois);
  const label = formatMonth(mois, lang);
  const autres = moisDisponibles().filter((m) => m !== mois);

  return (
    <div className="container-page py-10">
      <nav className="text-sm text-ink-muted" aria-label={dict.common.breadcrumb}>
        <Link href={localePath(lang, '/')} className="hover:text-ink">{dict.common.home}</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <Link href={localePath(lang, '/mois')} className="hover:text-ink">{dict.moisIndex.crumb}</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink-soft">{label}</span>
      </nav>
      <header className="mb-8 mt-4 max-w-2xl">
        <p className="eyebrow">{t.eyebrow(dict.place.city)}</p>
        <h1 className="display mt-2 text-5xl text-ink sm:text-6xl">{t.h1(lang === 'de' ? label : label.toLowerCase())}</h1>
        <p className="mt-3 text-ink-soft">{t.lead}</p>
      </header>

      <section className="mb-12">
        <h2 className="display mb-4 text-3xl text-ink">{t.cheapestHeading}</h2>
        <Board combos={meilleurParVille(combos)} lang={lang} title={label} />
      </section>

      <section className="mb-12">
        <h2 className="display mb-4 text-3xl text-ink">{t.allHeading}</h2>
        <ComboExplorer combos={combos} lang={lang} hide={['mois']} />
      </section>

      {autres.length > 0 && (
        <nav aria-label={t.otherMonths}>
          <h2 className="eyebrow mb-3">{t.otherMonths}</h2>
          <ul className="flex flex-wrap gap-2">
            {autres.map((m) => (
              <li key={m}>
                <Link href={localePath(lang, `/mois/${m}`)} className="inline-block rounded-md border border-line bg-white px-3 py-1.5 text-sm text-ink hover:border-ink">
                  {formatMonth(m, lang)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
