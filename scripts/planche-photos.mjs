// Planche de contrôle des photos d'incontournables : une page HTML de vignettes numérotées (clé, lieu, image),
// à ouvrir dans le navigateur pour regarder chaque image avant publication.
// Usage : node scripts/planche-photos.mjs <dossier de sortie>   → <dossier>/planche.html
import { readFileSync, writeFileSync } from 'node:fs';

const photos = JSON.parse(readFileSync('lib/data/incontournables-photos.json', 'utf8'));
const dossier = process.argv[2] || '.';
const vignette = (u) => u.replace(/\/(\d+)px-/, '/330px-');
const cases = Object.entries(photos).map(([k, p], i) =>
  `<figure><img src="${vignette(p.url)}" loading="eager"><figcaption><b>${i + 1}</b> ${k} — ${p.article}</figcaption></figure>`).join('\n');
writeFileSync(`${dossier}/planche.html`, `<!doctype html><meta charset="utf-8"><title>Planche</title>
<style>body{font:11px sans-serif;margin:6px;background:#fff}main{display:grid;grid-template-columns:repeat(6,1fr);gap:6px}
figure{margin:0}img{width:100%;height:120px;object-fit:cover;display:block;background:#ddd}figcaption{height:28px;overflow:hidden}</style>
<main>${cases}</main>`);
console.log(Object.keys(photos).length, 'vignettes →', `${dossier}/planche.html`);
