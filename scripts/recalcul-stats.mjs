// Recalcule les statistiques (prix courant, 3 meilleurs combos par mois) des relevés easyJet déjà faits,
// à partir des grilles aller/retour gardées dans data-prix/<CODE>/<date>.json, avec le calcul ACTUEL de
// data-prix/releve.js (utile quand la règle change, ex. règle des 5 jours du 17/11/2026).
// Les relevés Wizz Air (data-prix/wizz/) n'ont pas de grille : ils ne sont pas recalculés.
// Usage : node scripts/recalcul-stats.mjs
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const src = readFileSync('data-prix/releve.js', 'utf8');
const bloc = src.slice(src.indexOf('// Statistiques'), src.indexOf('const compact'));
// eslint-disable-next-line no-new-func
const stats = new Function('aller', 'retour', bloc + '\nreturn { stats, meilleur };');

const deplie = (g) => {
  const o = {};
  for (const [m, jours] of Object.entries(g ?? {})) for (const [j, p] of Object.entries(jours)) o[`${m}-${String(j).padStart(2, '0')}`] = p;
  return o;
};

let n = 0;
for (const code of readdirSync('data-prix', { withFileTypes: true }).filter((d) => d.isDirectory() && /^[A-Z]{3}$/.test(d.name)).map((d) => d.name)) {
  for (const f of readdirSync(join('data-prix', code)).filter((x) => /^\d{4}-\d{2}-\d{2}\.json$/.test(x))) {
    const chemin = join('data-prix', code, f);
    const r = JSON.parse(readFileSync(chemin, 'utf8'));
    if (r.erreur || !r.aller || !Object.keys(r.aller).length) continue;
    const { stats: s, meilleur } = stats(deplie(r.aller), deplie(r.retour));
    r.statsParMois = s;
    r.meilleursSurLaPeriode = meilleur;
    writeFileSync(chemin, JSON.stringify(r));
    n++;
  }
}
console.log(`${n} relevés recalculés`);
