// Rattrapage : donne les N prochaines villes easyJet sans relevé récent (moins de 8 jours), au format JSON
// [{ "code": "XXX", "nom": "…" }]. D'abord les villes qui ont un guide sur le site, puis les autres.
// Renvoie [] si un blocage easyJet a été noté aujourd'hui dans data-prix/journal.txt.
// Usage : node scripts/villes-manquantes.mjs 4
import { readFileSync, readdirSync, existsSync } from 'node:fs';

const n = Number(process.argv[2] ?? 4);
const today = new Date().toISOString().slice(0, 10);
const limite = new Date(Date.now() - 8 * 86_400_000).toISOString().slice(0, 10);

if (existsSync('data-prix/journal.txt')) {
  const j = readFileSync('data-prix/journal.txt', 'utf8');
  if (j.split('\n').some((l) => l.includes(today) && /BLOCAGE/i.test(l))) {
    console.log('[]');
    process.exit(0);
  }
}

// Liste des villes (codes, noms easyJet, présence d'un guide) lue dans le planning et lib/airports.ts.
const plan = JSON.parse(readFileSync('data-prix/planning.json', 'utf8')).planning;
const villes = new Map();
for (const par of Object.values(plan)) for (const jour of Object.values(par)) for (const l of Object.values(jour)) for (const v of l) villes.set(v.code, v.nom);
const airports = readFileSync('lib/airports.ts', 'utf8');
const avecGuide = new Set([...airports.matchAll(/^\s+([A-Z]{3}): \{[^\n]*guide:/gm)].map((m) => m[1]));

const recente = (code) =>
  existsSync(`data-prix/${code}`) && readdirSync(`data-prix/${code}`).some((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f) && f.slice(0, 10) >= limite);

const manquantes = [...villes.keys()]
  .filter((c) => !recente(c))
  .sort((a, b) => Number(avecGuide.has(b)) - Number(avecGuide.has(a)) || a.localeCompare(b));
console.log(JSON.stringify(manquantes.slice(0, n).map((code) => ({ code, nom: villes.get(code) }))));
