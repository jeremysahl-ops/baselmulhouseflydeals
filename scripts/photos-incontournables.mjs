// Photos des incontournables : pour chaque journée (clé « destination|n° »), une image LIBRE du lieu listé dans
// scripts/incontournables-wiki.json (titre d'article de Wikipédia en anglais) : l'image principale de l'article
// (pilicense=free), sinon l'image de la fiche Wikidata du lieu (propriété P18, toujours sur Wikimedia Commons).
// Auteur et licence sont lus sur Commons pour le crédit affiché. Écrit lib/data/incontournables-photos.json au fur et à mesure.
// Usage : node scripts/photos-incontournables.mjs [--tout]
// Chaque image doit ensuite être regardée (planche de contrôle) avant publication.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const UA = { 'User-Agent': 'FlyBSL-guides/1.0 (site de voyage ; mise a jour ponctuelle)' };
const carte = JSON.parse(readFileSync('scripts/incontournables-wiki.json', 'utf8'));
const OUT = 'lib/data/incontournables-photos.json';
const res = existsSync(OUT) && !process.argv.includes('--tout') ? JSON.parse(readFileSync(OUT, 'utf8')) : {};
const propre = (html) => (html || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const pause = (ms) => new Promise((r) => setTimeout(r, ms));
async function api(base, params) {
  for (let essai = 0; essai < 6; essai++) {
    const r = await fetch(`${base}?${new URLSearchParams({ format: 'json', ...params })}`, { headers: UA });
    const t = await r.text();
    try { return JSON.parse(t); } catch { await pause(15000 * (essai + 1)); }
  }
  throw new Error('API indisponible');
}

async function infosCommons(fichiers) {
  const infos = {};
  for (let j = 0; j < fichiers.length; j += 10) {
    const c = await api('https://commons.wikimedia.org/w/api.php', { action: 'query', prop: 'imageinfo', iiprop: 'url|extmetadata', iiurlwidth: '900', titles: fichiers.slice(j, j + 10).map((f) => 'File:' + f).join('|') });
    for (const p of Object.values(c.query?.pages ?? {})) {
      const ii = p.imageinfo?.[0];
      if (!ii) continue;
      const m = ii.extmetadata || {};
      infos[p.title.replace(/^File:/, '').replace(/ /g, '_')] = {
        url: ii.thumburl, page: ii.descriptionurl, w: ii.thumbwidth, h: ii.thumbheight,
        auteur: propre(m.Artist?.value).slice(0, 80) || 'Wikimedia Commons', licence: propre(m.LicenseShortName?.value) || '?',
      };
    }
    await pause(1500);
  }
  return infos;
}

// Images refusées au contrôle visuel (mauvais lieu, image peu parlante…) : jamais reprises.
const REJ = 'scripts/incontournables-rejets.json';
const rejets = new Set(existsSync(REJ) ? JSON.parse(readFileSync(REJ, 'utf8')) : []);
for (const k of Object.keys(res)) if (rejets.has(k)) delete res[k];
const cles = Object.keys(carte).filter((k) => !res[k] && !rejets.has(k));
for (let i = 0; i < cles.length; i += 10) {
  const lot = cles.slice(i, i + 10);
  const titres = [...new Set(lot.map((k) => carte[k]))];
  const q = await api('https://en.wikipedia.org/w/api.php', { action: 'query', redirects: '1', prop: 'pageimages|pageprops', ppprop: 'wikibase_item', piprop: 'name', pilicense: 'free', titles: titres.join('|') });
  const alias = {};
  for (const n of [...(q.query?.normalized ?? []), ...(q.query?.redirects ?? [])]) alias[n.from] = n.to;
  const fichierDe = {}, qid = {};
  for (const p of Object.values(q.query?.pages ?? {})) {
    if (p.pageimage) fichierDe[p.title] = p.pageimage;
    if (p.pageprops?.wikibase_item) qid[p.title] = p.pageprops.wikibase_item;
  }
  // Repli : image Wikidata (P18) pour les articles sans image principale libre.
  const sans = Object.keys(qid).filter((t) => !fichierDe[t]);
  if (sans.length) {
    const w = await api('https://www.wikidata.org/w/api.php', { action: 'wbgetentities', props: 'claims', ids: sans.map((t) => qid[t]).join('|') });
    for (const t of sans) {
      const f = w.entities?.[qid[t]]?.claims?.P18?.[0]?.mainsnak?.datavalue?.value;
      if (f) fichierDe[t] = f.replace(/ /g, '_');
    }
  }
  const infos = await infosCommons([...new Set(Object.values(fichierDe))]);
  for (const k of lot) {
    let t = carte[k];
    for (let n = 0; n < 3 && alias[t]; n++) t = alias[t];
    const f = fichierDe[t];
    const info = f && infos[f.replace(/ /g, '_')];
    if (info) res[k] = { ...info, article: t };
    else console.log('SANS IMAGE', k, carte[k]);
  }
  writeFileSync(OUT, JSON.stringify(res, null, 1));
  await pause(2000);
}
console.log(Object.keys(res).length, '/', Object.keys(carte).length, 'images dans', OUT);
