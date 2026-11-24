// Deuxième passe pour les incontournables restés sans photo : recherche plein texte dans Wikimedia Commons
// (fichiers image sous licence libre, format paysage) à partir du nom du lieu (scripts/incontournables-wiki.json).
// N'écrit PAS dans le site : produit une liste de candidates à regarder une par une (planche de contrôle) ;
// seules les photos validées à l'œil sont ensuite ajoutées à lib/data/incontournables-photos.json.
// Usage : node scripts/photos-incontournables-recherche.mjs <fichier-sortie.json> [clé « Ville|n » …]
import { readFileSync, writeFileSync } from 'node:fs';

const UA = { 'User-Agent': 'FlyBSL-guides/1.0 (site de voyage ; mise a jour ponctuelle)' };
const carte = JSON.parse(readFileSync('scripts/incontournables-wiki.json', 'utf8'));
const photos = JSON.parse(readFileSync('lib/data/incontournables-photos.json', 'utf8'));
const [sortie, ...demandees] = process.argv.slice(2);
// Une clé peut être suivie de « =autre recherche » (nom local du lieu) : « Naples|0=Spaccanapoli Napoli ».
const requete = Object.fromEntries(demandees.map((d) => d.split("=")).map(([k, q]) => [k, q || carte[k]]));
const cles = demandees.length ? Object.keys(requete) : Object.keys(carte).filter((k) => !photos[k]);
const propre = (html) => (html || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const pause = (ms) => new Promise((r) => setTimeout(r, ms));
const LIBRE = /^(cc[ -]by|cc0|public domain|pd|gfdl|attribution)/i;

async function api(params) {
  for (let essai = 0; essai < 5; essai++) {
    const r = await fetch(`https://commons.wikimedia.org/w/api.php?${new URLSearchParams({ format: 'json', ...params })}`, { headers: UA });
    try { return JSON.parse(await r.text()); } catch { await pause(10000 * (essai + 1)); }
  }
  throw new Error('API indisponible');
}

const res = {};
for (const k of cles) {
  const q = await api({
    action: 'query', generator: 'search', gsrnamespace: '6', gsrlimit: '20',
    gsrsearch: `${requete[k] ?? carte[k]} filetype:bitmap`, prop: 'imageinfo', iiprop: 'url|size|extmetadata', iiurlwidth: '960',
  });
  const cands = Object.values(q.query?.pages ?? {})
    .sort((a, b) => a.index - b.index)
    .map((p) => ({ p, ii: p.imageinfo?.[0] }))
    .filter(({ ii }) => ii && ii.width >= 1000 && ii.width > ii.height * 1.15)
    .map(({ p, ii }) => {
      const m = ii.extmetadata || {};
      return {
        fichier: p.title, url: ii.thumburl, page: ii.descriptionurl,
        auteur: propre(m.Artist?.value).slice(0, 80) || 'Wikimedia Commons',
        licence: propre(m.LicenseShortName?.value) || '?',
      };
    })
    .filter((c) => LIBRE.test(c.licence))
    .slice(0, 6);
  res[k] = { lieu: requete[k] ?? carte[k], cands };
  console.log(k, requete[k] ?? carte[k], cands.length);
  await pause(800);
}
writeFileSync(sortie, JSON.stringify(res, null, 1));
