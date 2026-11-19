// Climat moyen par mois de chaque destination, calculé sur 10 ans (2015-2024) de données journalières
// de la NASA (POWER, https://power.larc.nasa.gov, domaine public ; grille d'environ 50 km).
// Écrit lib/data/climat.json : { CODE: [[tMax, tMin, pluieMm, joursDePluie] × 12 mois] }.
// Usage : node scripts/climat.mjs            (toutes les destinations sans climat)
//         node scripts/climat.mjs --tout     (tout recalculer)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const OUT = 'lib/data/climat.json';
const coords = {};
for (const m of readFileSync('lib/coords.ts', 'utf8').matchAll(/([A-Z]{3}): \[(-?[\d.]+), (-?[\d.]+)\]/g)) coords[m[1]] = [+m[2], +m[3]];
const res = existsSync(OUT) && !process.argv.includes('--tout') ? JSON.parse(readFileSync(OUT, 'utf8')) : {};
const codes = Object.keys(coords).filter((c) => !res[c]);
const r1 = (x) => Math.round(x * 10) / 10;

for (const code of codes) {
  const [lat, lon] = coords[code];
  const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M_MAX,T2M_MIN,PRECTOTCORR&community=RE&latitude=${lat}&longitude=${lon}&start=20150101&end=20241231&format=JSON`;
  let p;
  for (let essai = 0; essai < 3 && !p; essai++) {
    try { p = (await (await fetch(url)).json()).properties.parameter; } catch { await new Promise((r) => setTimeout(r, 5000)); }
  }
  if (!p) { console.log(code, 'ÉCHEC'); continue; }
  const acc = Array.from({ length: 12 }, () => ({ max: 0, min: 0, pluie: 0, jp: 0, n: 0 }));
  for (const [jour, tmax] of Object.entries(p.T2M_MAX)) {
    const tmin = p.T2M_MIN[jour], pr = p.PRECTOTCORR[jour];
    if (tmax === -999 || tmin === -999 || pr === -999) continue;
    const a = acc[+jour.slice(4, 6) - 1];
    a.max += tmax; a.min += tmin; a.pluie += pr; a.jp += pr >= 1 ? 1 : 0; a.n++;
  }
  // pluie et jours de pluie : moyenne par jour × nombre moyen de jours du mois
  const jm = [31, 28.25, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  res[code] = acc.map((a, i) => (a.n ? [r1(a.max / a.n), r1(a.min / a.n), Math.round((a.pluie / a.n) * jm[i]), Math.round((a.jp / a.n) * jm[i])] : null));
  console.log(code, 'juillet', res[code][6]?.join(' / '));
  await new Promise((r) => setTimeout(r, 400));
}
writeFileSync(OUT, JSON.stringify(res));
console.log(Object.keys(res).length, 'destinations dans', OUT);
