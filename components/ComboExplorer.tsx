'use client';

// Liste des combos triable (prix croissant, décroissant, départ proche) et filtrable par destination, mois et durée.
import { useMemo, useState } from 'react';
import Board from '@/components/Board';
import type { Combo, Duree } from '@/lib/prix';
import { airportName } from '@/lib/airports';
import { formatMonth } from '@/lib/format';
import { getDict, type Lang } from '@/lib/i18n';

type Tri = 'prix' | 'prix-desc' | 'date';
const PAGE = 40;
const DUREES: Duree[] = ['2-4', '5-8', '10-15'];

export default function ComboExplorer({
  combos,
  lang,
  initial = {},
  hide = [],
}: {
  combos: Combo[];
  lang: Lang;
  initial?: { code?: string; mois?: string; duree?: Duree | ''; tri?: Tri };
  /** Filtres à ne pas afficher (déjà fixés par la page). */
  hide?: ('code' | 'mois' | 'duree')[];
}) {
  const dict = getDict(lang);
  const t = dict.liste;
  const [code, setCode] = useState(initial.code ?? '');
  const [mois, setMois] = useState(initial.mois ?? '');
  const [duree, setDuree] = useState<Duree | ''>(initial.duree ?? '');
  const [tri, setTri] = useState<Tri>(initial.tri ?? 'prix');
  const [max, setMax] = useState(PAGE);

  const villes = useMemo(
    () => [...new Set(combos.map((c) => c.code))].sort((a, b) => airportName(a, lang).localeCompare(airportName(b, lang), lang)),
    [combos, lang],
  );
  const lesMois = useMemo(() => [...new Set(combos.map((c) => c.mois))].sort(), [combos]);

  const visibles = useMemo(() => {
    const l = combos.filter((c) => (!code || c.code === code) && (!mois || c.mois === mois) && (!duree || c.duree === duree));
    // Sans filtre de mois, un même aller-retour peut apparaître dans deux mois voisins (marge de 5 jours) : on le garde une fois.
    const vus = new Set<string>();
    const uniques = l.filter((c) => {
      const k = `${c.code}|${c.depart}|${c.nuits}`;
      if (vus.has(k)) return false;
      vus.add(k);
      return true;
    });
    return uniques.sort((a, b) =>
      tri === 'date' ? a.depart.localeCompare(b.depart) || a.prix - b.prix : tri === 'prix-desc' ? b.prix - a.prix : a.prix - b.prix,
    );
  }, [combos, code, mois, duree, tri]);

  const filtre = code || mois || duree;
  const select = 'w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink';
  const label = 'eyebrow mb-1 block';

  return (
    <div>
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {!hide.includes('code') && (
          <label>
            <span className={label}>{t.destination}</span>
            <select className={select} value={code} onChange={(e) => { setCode(e.target.value); setMax(PAGE); }}>
              <option value="">{t.allDestinations}</option>
              {villes.map((c) => (
                <option key={c} value={c}>{airportName(c, lang)}</option>
              ))}
            </select>
          </label>
        )}
        {!hide.includes('mois') && (
          <label>
            <span className={label}>{t.month}</span>
            <select className={select} value={mois} onChange={(e) => { setMois(e.target.value); setMax(PAGE); }}>
              <option value="">{t.allMonths}</option>
              {lesMois.map((m) => (
                <option key={m} value={m}>{formatMonth(m, lang)}</option>
              ))}
            </select>
          </label>
        )}
        {!hide.includes('duree') && (
          <label>
            <span className={label}>{t.duration}</span>
            <select className={select} value={duree} onChange={(e) => { setDuree(e.target.value as Duree | ''); setMax(PAGE); }}>
              <option value="">{t.allDurations}</option>
              {DUREES.map((d) => (
                <option key={d} value={d}>{`${dict.durees[d].label} (${dict.durees[d].hint})`}</option>
              ))}
            </select>
          </label>
        )}
        <label>
          <span className={label}>{t.sort}</span>
          <select className={select} value={tri} onChange={(e) => setTri(e.target.value as Tri)}>
            <option value="prix">{t.cheapFirst}</option>
            <option value="prix-desc">{t.dearFirst}</option>
            <option value="date">{t.soonFirst}</option>
          </select>
        </label>
      </div>

      <p className="mb-3 flex items-center gap-3 text-sm text-ink-muted" aria-live="polite">
        {t.count(visibles.length)}
        {filtre && (
          <button type="button" className="font-medium text-ink underline underline-offset-2" onClick={() => { setCode(''); setMois(''); setDuree(''); setMax(PAGE); }}>
            {t.reset}
          </button>
        )}
      </p>

      <Board combos={visibles.slice(0, max)} lang={lang} empty={combos.length ? t.noMatch : undefined} />

      {visibles.length > max && (
        <div className="mt-4 text-center">
          <button type="button" className="btn-secondary" onClick={() => setMax(max + PAGE)}>{t.more}</button>
        </div>
      )}
      <p className="mt-4 max-w-3xl text-xs leading-relaxed text-ink-muted">{dict.board.note}</p>
    </div>
  );
}
