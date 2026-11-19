// Prépare les prix pour le site : lit le dernier relevé de chaque ville dans data-prix/<CODE>/<date>.json (easyJet)
// data-prix/wizz/<CODE>/<date>.json (Wizz Air) data-prix/pegasus/<CODE>/<date>.json (Pegasus) data-prix/ryanair/<CODE>/<date>.json (Ryanair) et data-prix/flydubai/<CODE>/<date>.json (flydubai)
// et écrit lib/data/prix-easyjet.json avec SEULEMENT nos conclusions (prix courant et 3 meilleurs combos
// par mois et par durée). La grille complète des compagnies n'est jamais recopiée (règle : ne pas publier les tableaux bruts).
// Usage : node scripts/prix-site.mjs
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'data-prix';
const OUT = 'lib/data/prix-easyjet.json';
const DUREES = ['2-4', '5-8', '10-15'];

const villes = [];
for (const [cie, dossier] of [['easyjet', SRC], ['wizz', join(SRC, 'wizz')], ['pegasus', join(SRC, 'pegasus')], ['ryanair', join(SRC, 'ryanair')], ['flydubai', join(SRC, 'flydubai')]]) {
  if (!existsSync(dossier)) continue;
  for (const code of readdirSync(dossier, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
    if (!/^[A-Z]{3}$/.test(code)) continue;
    const fichiers = readdirSync(join(dossier, code)).filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort();
    if (!fichiers.length) continue;
    let r;
    try { r = JSON.parse(readFileSync(join(dossier, code, fichiers.at(-1)), 'utf8')); } catch { continue; }
    if (r.erreur || !r.statsParMois || !r.statsParMois[Object.keys(r.statsParMois)[0]]?.durees) continue; // ancien format ou relevé raté
    const mois = {};
    for (const [m, s] of Object.entries(r.statsParMois)) {
      mois[m] = {
        semaine: s.prixCourantSemaineAR,
        durees: Object.fromEntries(
          DUREES.map((d) => [d, { courant: s.durees[d]?.prixCourant ?? null, combos: (s.durees[d]?.meilleurs ?? []).map((c) => [c.depart, c.nuits, c.prix]) }]),
        ),
      };
    }
    villes.push({ code, cie, vuLe: r.releveLe, mois });
  }
}

if (!existsSync('lib/data')) mkdirSync('lib/data', { recursive: true });
writeFileSync(OUT, JSON.stringify({ genereLe: new Date().toISOString(), villes }));
console.log(`${villes.length} relevés écrits dans ${OUT} : ${villes.map((v) => (v.cie === 'easyjet' ? v.code : v.code + '(' + v.cie + ')')).join(', ')}`);
