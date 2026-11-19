// Branche de nouveaux guides sur le site à partir des aéroports de lib/airports.ts.
// Pour chaque code : ajoute la destination dans lib/destinations.ts (avec la photo déjà contrôlée de l'aéroport,
// sinon null = visuel graphique), ses noms allemand/anglais dans lib/i18n/destinations.ts,
// et `guide: '<clé>'` sur l'aéroport. Le programme (lib/itineraries) et les conseils (lib/conseils) s'écrivent à part.
// Usage : node scripts/ajout-guides.mjs AJA BIA …   → affiche la clé de chaque destination.
import { readFileSync, writeFileSync } from 'node:fs';

const lire = (p) => readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
const ecrire = (p, s) => writeFileSync(p, s.replace(/\n/g, '\r\n'));
const AIR = 'lib/airports.ts', DEST = 'lib/destinations.ts', NOMS = 'lib/i18n/destinations.ts';
let air = lire(AIR), dest = lire(DEST), noms = lire(NOMS);

const pays = {};
for (const m of air.matchAll(/^ {2}([A-Z]{2}): \['([^']+)', '([^']+)', '([^']+)'\],$/gm)) pays[m[1]] = [m[2], m[3], m[4]];
const cle = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const q = (s) => `'${s.replace(/'/g, "\\'")}'`;

for (const code of process.argv.slice(2)) {
  const re = new RegExp(`^( {2}${code}: \\{ names: \\['([^']+)', '([^']+)', '([^']+)'\\], country: '([A-Z]{2})')(.*)$`, 'm');
  const m = air.match(re);
  if (!m || /guide:/.test(m[6])) throw new Error(`${code} : aéroport introuvable ou déjà relié à un guide`);
  const [, debut, fr, de, en, c, fin] = m;
  const photo = fin.match(/photo: '([^']+)'/)?.[1];
  const k = cle(fr);
  if (dest.includes(`  ${q(k)}: {`)) throw new Error(`${code} : destination ${k} déjà présente`);
  air = air.replace(re, () => `${debut}, guide: ${q(k)}${fin}`);
  dest = dest.replace(/\n\};\s*$/, () => `\n  ${q(k)}: { label: ${q(fr)}, country: ${q(pays[c][0])}, iata: '${code}', photo: ${photo ? q(photo) : 'null'} },\n};\n`);
  noms = noms.replace(/(const NAMES: Record<string, Names> = \{\n(?:.*\n)*?)(\};)/, (_, a, b) => `${a}  ${q(k)}: { de: [${q(de)}, ${q(pays[c][1])}], en: [${q(en)}, ${q(pays[c][2])}] },\n${b}`);
  console.log(code, '→', k);
}
ecrire(AIR, air); ecrire(DEST, dest); ecrire(NOMS, noms);
