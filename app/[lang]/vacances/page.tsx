import type { Metadata } from 'next';
import Link from 'next/link';
import Board from '@/components/Board';
import CalendrierVacances from '@/components/CalendrierVacances';
import { meilleurParVille, tousLesCombos } from '@/lib/prix';
import { COULEUR_PAYS, FERIES, PERIODES, convient, proche } from '@/lib/vacances';
import { formatDay } from '@/lib/format';
import { alternatesFor, getDict, isLang, localePath } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

// Pages entièrement statiques : les données ne changent qu'à une mise en ligne. Une régénération
// périodique (ISR) consommait le quota gratuit de Vercel (« ISR Writes »), alerte du 22/11/2026.
export const revalidate = false;
export const dynamic = 'force-static';

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

export default async function VacancesPage({ params }: Props) {
  const lang = await langParam(params);
  const dict = getDict(lang);
  const t = dict.vacances;
  const aujourdhui = new Date().toISOString().slice(0, 10);
  const combos = tousLesCombos();
  const periodes = PERIODES.filter((p) => p.fin >= aujourdhui).sort((a, b) => a.debut.localeCompare(b.debut) || a.fin.localeCompare(b.fin));
  // Mois affichés : du mois en cours jusqu'à octobre 2027 (fin des relevés de prix).
  const mois: string[] = [];
  for (let d = new Date(`${aujourdhui.slice(0, 7)}-01T00:00:00Z`); d.toISOString().slice(0, 7) <= '2027-10'; d.setUTCMonth(d.getUTCMonth() + 1)) mois.push(d.toISOString().slice(0, 7));

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
      </header>

      <CalendrierVacances lang={lang} mois={mois} feries={FERIES.filter((f) => f.date >= aujourdhui)} periodes={periodes} />

      <div className="mt-14 space-y-12">
        {periodes.map((p) => {
          const liste = meilleurParVille(combos.filter((c) => convient(p, c.depart, c.retour))).slice(0, 8);
          const proches = meilleurParVille(combos.filter((c) => proche(p, c.depart, c.retour))).slice(0, 6);
          return (
            <section key={p.id} id={p.id} className="scroll-mt-24 rounded-xl transition-shadow" aria-labelledby={`t-${p.id}`}>
              <p className="flex flex-wrap items-center gap-2 text-xs">
                <span className="eyebrow">{p.type === 'pont' ? t.typePont : t.typeVacances}</span>
                {p.pays.map((x) => (
                  <span key={x} className="rounded px-2 py-0.5 font-semibold text-white" style={{ backgroundColor: COULEUR_PAYS[x] }}>{x}</span>
                ))}
              </p>
              <h2 id={`t-${p.id}`} className="display mt-1 text-3xl text-ink">{p.noms[lang]}</h2>
              <p className="mb-4 mt-1 text-sm text-ink-soft">{t.dates(formatDay(p.debut, lang), formatDay(p.fin, lang))}</p>
              <Board combos={liste} lang={lang} title={p.noms[lang]} empty={t.empty} />
              {proches.length > 0 && (
                <div className="mt-5">
                  <h3 className="mb-1 text-lg font-semibold text-ink">{t.prochesTitre}</h3>
                  <p className="mb-3 text-sm text-ink-soft">{t.prochesTexte}</p>
                  <Board combos={proches} lang={lang} title={t.prochesTitre} />
                </div>
              )}
            </section>
          );
        })}
      </div>

      <p className="mt-10 max-w-3xl text-xs leading-relaxed text-ink-muted">{t.note}</p>
    </div>
  );
}
