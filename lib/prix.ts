// Prix relevés au départ de Bâle-Mulhouse : lib/data/prix-easyjet.json (fabriqué par scripts/prix-site.mjs), intégré au site.
// Le fichier ne contient que nos conclusions : prix courant et 3 meilleurs combos par mois et par durée.
import donnees from '@/lib/data/prix-easyjet.json';
import { AIRPORTS } from '@/lib/airports';

export const DUREES = ['2-4', '5-8', '10-15'] as const;
export type Duree = (typeof DUREES)[number];

/** Un combo aller + retour easyJet, prix pour une personne. */
export interface Combo {
  code: string;
  mois: string; // AAAA-MM du mois où il est classé (marge de 5 jours autour du mois)
  duree: Duree;
  depart: string; // AAAA-MM-JJ
  retour: string;
  nuits: number;
  prix: number;
  vuLe: string; // date ISO du relevé
}

interface MoisPrix { semaine: number | null; durees: Record<Duree, { courant: number | null; combos: [string, number, number][] }> }
interface VilleBrute { code: string; vuLe: string; mois: Record<string, MoisPrix> }

export interface Ville {
  code: string;
  vuLe: string;
  mois: { mois: string; semaine: number | null; durees: Record<Duree, { courant: number | null; combos: Combo[] }> }[];
}

/** Un relevé de plus de 8 jours n'est plus affiché ; un départ doit être dans au moins 3 jours. */
const FRAICHEUR_JOURS = 8;
const DELAI_DEPART_JOURS = 3;

function ajouterJours(jour: string, n: number): string {
  return new Date(Date.parse(`${jour}T12:00:00Z`) + n * 86_400_000).toISOString().slice(0, 10);
}

// Les prix sont intégrés au site au moment de sa construction (mise en ligne = nouvelle construction).
function lire(): VilleBrute[] {
  const brut = donnees as unknown as { villes?: VilleBrute[] };
  return Array.isArray(brut.villes) ? brut.villes : [];
}

let cache: { cle: string; villes: Ville[] } | null = null;

/** Toutes les villes relevées récemment, avec seulement les combos encore réservables. */
export function getVilles(now = new Date()): Ville[] {
  const aujourdhui = now.toISOString().slice(0, 10);
  const cle = aujourdhui;
  if (cache?.cle === cle) return cache.villes;
  const limiteDepart = ajouterJours(aujourdhui, DELAI_DEPART_JOURS);
  const limiteFraicheur = now.getTime() - FRAICHEUR_JOURS * 86_400_000;
  const moisCourant = aujourdhui.slice(0, 7);

  const villes = lire()
    .filter((v) => AIRPORTS[v.code] && Date.parse(v.vuLe) >= limiteFraicheur)
    .map((v) => ({
      code: v.code,
      vuLe: v.vuLe,
      mois: Object.entries(v.mois)
        .filter(([m]) => m >= moisCourant)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([m, p]) => ({
          mois: m,
          semaine: p.semaine,
          durees: Object.fromEntries(
            DUREES.map((d) => [
              d,
              {
                courant: p.durees[d]?.courant ?? null,
                combos: (p.durees[d]?.combos ?? [])
                  .filter(([depart]) => depart >= limiteDepart)
                  .map(([depart, nuits, prix]) => ({ code: v.code, mois: m, duree: d, depart, retour: ajouterJours(depart, nuits), nuits, prix, vuLe: v.vuLe })),
              },
            ]),
          ) as Ville['mois'][number]['durees'],
        })),
    }));
  cache = { cle, villes };
  return villes;
}

export function getVille(code: string): Ville | null {
  return getVilles().find((v) => v.code === code) ?? null;
}

/**
 * Tous les combos, sans doublon : un même aller-retour peut figurer dans deux mois (marge de 5 jours) ;
 * on le garde une fois, dans le mois de son départ quand c'est possible.
 */
export function tousLesCombos(): Combo[] {
  const vus = new Map<string, Combo>();
  for (const v of getVilles())
    for (const m of v.mois)
      for (const d of DUREES)
        for (const c of m.durees[d].combos) {
          const cle = `${c.code}|${c.depart}|${c.nuits}`;
          const deja = vus.get(cle);
          if (!deja || (deja.mois !== c.depart.slice(0, 7) && c.mois === c.depart.slice(0, 7))) vus.set(cle, c);
        }
  return [...vus.values()].sort((a, b) => a.prix - b.prix || a.depart.localeCompare(b.depart));
}

/** Combos d'un mois (marge comprise), toutes destinations. */
export function combosDuMois(mois: string): Combo[] {
  const out: Combo[] = [];
  for (const v of getVilles()) for (const m of v.mois) if (m.mois === mois) for (const d of DUREES) out.push(...m.durees[d].combos);
  return out.sort((a, b) => a.prix - b.prix);
}

/** Mois couverts par au moins un relevé, dans l'ordre. */
export function moisDisponibles(): string[] {
  return [...new Set(getVilles().flatMap((v) => v.mois.map((m) => m.mois)))].sort();
}

/** Le meilleur combo de chaque ville (une ligne par ville), du moins cher au plus cher. */
export function meilleurParVille(combos = tousLesCombos()): Combo[] {
  const parVille = new Map<string, Combo>();
  for (const c of combos) if (!parVille.has(c.code) || c.prix < parVille.get(c.code)!.prix) parVille.set(c.code, c);
  return [...parVille.values()].sort((a, b) => a.prix - b.prix);
}

/** Date du relevé le plus récent. */
export function dernierReleve(): string | null {
  return getVilles().reduce<string | null>((max, v) => (!max || v.vuLe > max ? v.vuLe : max), null);
}
