'use client';
// Carte interactive des routes : toutes les lignes partent de Bâle-Mulhouse. On choisit un mois et une durée,
// puis on baisse le budget avec le curseur : les routes trop chères s'effacent.
import Link from 'next/link';
import { useMemo, useState } from 'react';

export interface MapRoute {
  code: string;
  name: string;
  country: string;
  href: string;
  x: number;
  y: number;
  /** Prix « dès » arrondi, par mois (AAAA-MM) puis par durée ('2-4' | '5-8' | '10-15'). */
  prix: Record<string, Record<string, number>>;
}

export interface MapTexts {
  heading: string;
  text: string;
  allMonths: string;
  allDurations: string;
  monthLabel: string;
  durationLabel: string;
  budget: string; // « Budget max : {p} »
  count: string; // « {n} destinations à moins de {p} »
  countAll: string; // « {n} destinations avec un prix »
  none: string;
  from: string; // « dès {p} »
  noPrice: string;
  origin: string;
  hint: string;
}

const LOCALE = { fr: 'fr-FR', de: 'de-DE', en: 'en-GB' } as const;
const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ''));

/** Courbe légère de Bâle vers la destination (arc tourné vers le haut, comme sur les cartes de compagnies). */
function arc(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  let nx = -dy / len;
  let ny = dx / len;
  if (ny > 0) { nx = -nx; ny = -ny; }
  const k = len * 0.18;
  return `M${x1},${y1} Q${(mx + nx * k).toFixed(1)},${(my + ny * k).toFixed(1)} ${x2},${y2}`;
}

export default function RouteMapClient({
  width, height, land, origin, routes, mois, durees, t, lang,
}: {
  width: number;
  height: number;
  land: string;
  origin: { x: number; y: number };
  routes: MapRoute[];
  mois: { value: string; label: string; year: string }[];
  durees: { value: string; label: string; hint: string }[];
  t: MapTexts;
  lang: 'fr' | 'de' | 'en';
}) {
  // Par défaut : le premier mois relevé (le mois en cours), pour que le curseur montre les prix de ce mois-là.
  const [mo, setMo] = useState<string>(mois[0]?.value ?? '');
  const [du, setDu] = useState<string>('');
  const [budget, setBudget] = useState<number | null>(null);
  const [focus, setFocus] = useState<string | null>(null);
  const prixFmt = useMemo(() => new Intl.NumberFormat(LOCALE[lang], { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }), [lang]);
  const eur = (n: number) => prixFmt.format(n);

  // Prix de chaque ville pour la sélection (le moins cher si « tous les mois » / « toutes durées »).
  const prixSel = useMemo(() => {
    const out = new Map<string, number>();
    for (const r of routes) {
      let best: number | null = null;
      for (const [m, parDuree] of Object.entries(r.prix)) {
        if (mo && m !== mo) continue;
        for (const [d, p] of Object.entries(parDuree)) {
          if (du && d !== du) continue;
          if (best == null || p < best) best = p;
        }
      }
      if (best != null) out.set(r.code, best);
    }
    return out;
  }, [routes, mo, du]);

  // Bornes du curseur : tous les prix de la sélection (tous mois et durées retenus), pour que « Tous les mois »
  // couvre bien le plus cher de chaque mois et pas seulement le moins cher de chaque ville.
  const valeurs = useMemo(() => {
    const out: number[] = [];
    for (const r of routes)
      for (const [m, parDuree] of Object.entries(r.prix)) {
        if (mo && m !== mo) continue;
        for (const [d, p] of Object.entries(parDuree)) if (!du || d === du) out.push(p);
      }
    return out;
  }, [routes, mo, du]);
  const min = valeurs.length ? Math.min(...valeurs) : 0;
  const max = valeurs.length ? Math.max(...valeurs) : 0;
  const plafond = budget == null ? max : Math.min(Math.max(budget, min), max);
  const visibles = routes.filter((r) => (prixSel.get(r.code) ?? Infinity) <= plafond);
  const actif = focus ? routes.find((r) => r.code === focus) : null;

  const changer = (f: () => void) => { f(); setBudget(null); };

  return (
    <div className="overflow-hidden rounded-lg bg-board text-board-text shadow-xl lg:grid lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="relative self-center">
        <svg viewBox={`0 0 ${width} ${height}`} className="block h-auto w-full" role="img" aria-label={t.heading}>
          <rect width={width} height={height} fill="#0a1626" />
          <path d={land} fill="#1b2d45" stroke="#2a4262" strokeWidth={0.6} />
          {/* Routes */}
          <g fill="none" strokeLinecap="round">
            {routes.map((r) => {
              const p = prixSel.get(r.code);
              const on = p != null && p <= plafond;
              return (
                <path
                  key={r.code}
                  d={arc(origin.x, origin.y, r.x, r.y)}
                  stroke={focus === r.code ? '#ffffff' : '#ffc72c'}
                  strokeWidth={focus === r.code ? 2.4 : 1.3}
                  style={{ opacity: on ? (focus && focus !== r.code ? 0.25 : 0.85) : 0, transition: 'opacity 350ms ease' }}
                />
              );
            })}
          </g>
          {/* Aéroports */}
          {routes.map((r) => {
            const p = prixSel.get(r.code);
            const on = p != null && p <= plafond;
            return (
              <Link key={r.code} href={r.href} aria-label={`${r.name}${p != null ? ' — ' + fill(t.from, { p: eur(p) }) : ''}`}>
                <g onMouseEnter={() => setFocus(r.code)} onMouseLeave={() => setFocus(null)} onFocus={() => setFocus(r.code)} onBlur={() => setFocus(null)} className="cursor-pointer">
                  <circle cx={r.x} cy={r.y} r={11} fill="transparent" />
                  <circle cx={r.x} cy={r.y} r={on ? 3.6 : 2.2} fill={on ? '#ffc72c' : '#4d6687'} style={{ transition: 'all 300ms ease' }} />
                </g>
              </Link>
            );
          })}
          {/* Bâle-Mulhouse */}
          <circle cx={origin.x} cy={origin.y} r={9} fill="#ffc72c" opacity={0.25} />
          <circle cx={origin.x} cy={origin.y} r={5} fill="#ffc72c" stroke="#0d1b2e" strokeWidth={1.5} />
          <text x={origin.x + 9} y={origin.y - 9} className="font-board" fontSize={15} fontWeight={700} fill="#ffffff">BSL</text>
          {/* Étiquette de la ville survolée */}
          {actif && (
            <g pointerEvents="none">
              <rect x={Math.min(actif.x + 8, width - 190)} y={actif.y - 34} width={182} height={28} rx={4} fill="#0d1b2e" stroke="#ffc72c" strokeWidth={1} />
              <text x={Math.min(actif.x + 16, width - 182)} y={actif.y - 15} fontSize={14} fill="#ffffff" className="font-board">
                {actif.name}
                <tspan fill="#ffc72c" dx={8}>{prixSel.has(actif.code) ? fill(t.from, { p: eur(prixSel.get(actif.code)!) }) : t.noPrice}</tspan>
              </text>
            </g>
          )}
        </svg>
        <p className="pointer-events-none absolute left-3 top-3 rounded bg-black/40 px-2 py-1 font-board text-[11px] text-white/80">{t.hint}</p>
      </div>

      {/* Filtres */}
      <div className="space-y-4 border-t border-white/10 px-4 py-4 sm:px-5 lg:border-l lg:border-t-0 lg:py-5">
        <div>
          <p className="mb-2 text-[11px] uppercase tracking-wider text-board-dim">{t.monthLabel}</p>
          <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0">
            {[{ value: '', label: t.allMonths, year: '' }, ...mois].map((m) => (
              <button
                key={m.value || 'tous'}
                type="button"
                onClick={() => changer(() => setMo(m.value))}
                aria-pressed={mo === m.value}
                className={`shrink-0 rounded px-3 py-1.5 text-[13px] font-semibold transition ${m.value ? 'capitalize' : ''} ${mo === m.value ? 'bg-flap text-ink' : 'bg-white/10 text-board-text hover:bg-white/20'}`}
              >
                {m.label}
                {m.year && <span className="ml-1 text-[10px] opacity-70">{m.year.slice(2)}</span>}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-[11px] uppercase tracking-wider text-board-dim">{t.durationLabel}</p>
          <div className="flex flex-wrap gap-1.5">
            {[{ value: '', label: t.allDurations, hint: '' }, ...durees].map((d) => (
              <button
                key={d.value || 'toutes'}
                type="button"
                onClick={() => changer(() => setDu(d.value))}
                aria-pressed={du === d.value}
                title={d.hint}
                className={`rounded px-3 py-1.5 text-[13px] font-semibold transition ${du === d.value ? 'bg-flap text-ink' : 'bg-white/10 text-board-text hover:bg-white/20'}`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
        {valeurs.length > 0 ? (
          <div>
            <label htmlFor="budget-carte" className="flex items-baseline justify-between gap-3">
              <span className="text-[11px] uppercase tracking-wider text-board-dim">{fill(t.budget, { p: '' }).trim()}</span>
              <span className="flap text-xl">{eur(plafond)}</span>
            </label>
            <input
              id="budget-carte"
              type="range"
              min={min}
              max={max}
              step={1}
              value={plafond}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="mt-2 w-full accent-[#ffc72c]"
            />
            <div className="mt-1 flex justify-between font-board text-[11px] text-board-dim">
              <span>{eur(min)}</span>
              <span>{eur(max)}</span>
            </div>
            <p className="mt-3 text-sm" aria-live="polite">
              {plafond >= max ? fill(t.countAll, { n: visibles.length }) : fill(t.count, { n: visibles.length, p: eur(plafond) })}
            </p>
          </div>
        ) : (
          <p className="text-sm text-board-dim">{t.none}</p>
        )}
      </div>
    </div>
  );
}
