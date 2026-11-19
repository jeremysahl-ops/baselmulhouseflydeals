import type { Metadata } from 'next';
import Link from 'next/link';
import Board from '@/components/Board';
import { meilleurParVille, tousLesCombos } from '@/lib/prix';
import { PERIODES, convient, type Pays } from '@/lib/vacances';
import { formatDay } from '@/lib/format';
import { alternatesFor, getDict, isLang, localePath } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

export const revalidate = 3600;

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const dict = getDict(lang);
  return {
    title: dict.vacances.metaTitle(dict.place.city),
    description: dict.vacances.metaDescription(dict.place.city),
    alternates: alternatesFor(lang, '/vacances'),
  };
}

const COULEUR: Record<Pays, string> = {
  FR: 'bg-[#e8eefb] text-[#1f3f8a]',
  CH: 'bg-[#fbe9e9] text-[#9b1c1c]',
  DE: 'bg-[#f3efe2] text-[#5c4a12]',
};

export default async function VacancesPage({ params }: Props) {
  const lang = await langParam(params);
  const dict = getDict(lang);
  const t = dict.vacances;
  const aujourdhui = new Date().toISOString().slice(0, 10);
  const combos = tousLesCombos();
  const periodes = PERIODES.filter((p) => p.fin >= aujourdhui).sort((a, b) => a.debut.localeCompare(b.debut) || a.fin.localeCompare(b.fin));

  return (
    <div className="container-page py-10">
      <nav className="text-sm text-ink-muted" aria-label={dict.common.breadcrumb}>
        <Link href={localePath(lang, '/')} className="hover:text-ink">{dict.common.home}</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink-soft">{t.crumb}</span>
      </nav>
      <header className="mb-8 mt-4 max-w-3xl">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="display mt-2 text-5xl text-ink sm:text-6xl">{t.h1}</h1>
        <p className="mt-3 text-ink-soft">{t.lead(dict.place.city)}</p>
        <p className="mt-3 flex flex-wrap gap-2 text-xs">
          {(['FR', 'CH', 'DE'] as Pays[]).map((p) => (
            <span key={p} className={`rounded px-2 py-0.5 font-semibold ${COULEUR[p]}`}>{t.pays[p]}</span>
          ))}
        </p>
      </header>

      <nav aria-label={t.sommaire} className="mb-10">
        <ul className="flex flex-wrap gap-2">
          {periodes.map((p) => (
            <li key={p.id}>
              <a href={`#${p.id}`} className="inline-block rounded-md border border-line bg-white px-3 py-1.5 text-sm text-ink hover:border-ink">
                {p.noms[lang]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-12">
        {periodes.map((p) => {
          const liste = meilleurParVille(combos.filter((c) => convient(p, c.depart, c.retour))).slice(0, 8);
          return (
            <section key={p.id} id={p.id} className="scroll-mt-24" aria-labelledby={`t-${p.id}`}>
              <p className="flex flex-wrap items-center gap-2 text-xs">
                <span className="eyebrow">{p.type === 'pont' ? t.typePont : t.typeVacances}</span>
                {p.pays.map((x) => (
                  <span key={x} className={`rounded px-2 py-0.5 font-semibold ${COULEUR[x]}`}>{x}</span>
                ))}
              </p>
              <h2 id={`t-${p.id}`} className="display mt-1 text-3xl text-ink">{p.noms[lang]}</h2>
              <p className="mb-4 mt-1 text-sm text-ink-soft">{t.dates(formatDay(p.debut, lang), formatDay(p.fin, lang))}</p>
              <Board combos={liste} lang={lang} title={p.noms[lang]} empty={t.empty} />
            </section>
          );
        })}
      </div>

      <p className="mt-10 max-w-3xl text-xs leading-relaxed text-ink-muted">{t.note}</p>
    </div>
  );
}
