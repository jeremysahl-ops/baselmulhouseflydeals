// Envoi des alertes de prix (notifications sur téléphone) après une mise à jour des prix.
// À lancer après `node scripts/prix-site.mjs` : `node scripts/envoi-alertes.mjs` (ajouter `--essai` pour ne rien envoyer).
//
// Lit :
//   - lib/data/prix-easyjet.json : les meilleurs combos aller-retour par ville, mois et durée ;
//   - la table Supabase `alertes_prix` (pipeline/sql/2026-11-24_alertes_prix.sql), avec la clé de service ;
//   - %USERPROFILE%\.flybsl\vapid.json : la clé privée des notifications (jamais dans le dépôt) ;
//   - %USERPROFILE%\.flybsl\supabase.json : { "url": "...", "serviceKey": "..." } (jamais dans le dépôt).
// Pour chaque alerte, envoie AU PLUS une notification : le combo le moins cher sous le prix maximum, jamais deux fois
// le même (mémoire dans data-prix/alertes-envoyees.json, hors dépôt). Supprime les appareils désinscrits (erreur 404/410).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import webpush from 'web-push';

const ESSAI = process.argv.includes('--essai');
const DOSSIER = join(process.env.USERPROFILE || process.env.HOME || '.', '.flybsl');
const lireJson = (p) => JSON.parse(readFileSync(p, 'utf8'));

const vapid = lireJson(join(DOSSIER, 'vapid.json'));
const sb = lireJson(join(DOSSIER, 'supabase.json'));
webpush.setVapidDetails('https://www.flybsl.com', vapid.publicKey, vapid.privateKey);

// Noms des destinations (lib/airports.ts) et adresses des pages (même règle que airportSlug).
const air = readFileSync('lib/airports.ts', 'utf8');
const NOMS = {};
for (const m of air.matchAll(/^ {2}([A-Z]{3}): \{ names: \['([^']+)', '([^']+)', '([^']+)'\]/gm)) NOMS[m[1]] = [m[2], m[3], m[4]];
const IDX = { fr: 0, de: 1, en: 2 };
const slug = (code) => (NOMS[code]?.[0] ?? code).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const chemin = (lang, code) => `${lang === 'fr' ? '' : '/' + lang}/vols/${slug(code)}`;

// Tous les combos encore réservables (départ dans au moins 3 jours, relevé de moins de 8 jours, comme sur le site).
const prix = lireJson('lib/data/prix-easyjet.json');
const maintenant = Date.now();
const limiteDepart = new Date(maintenant + 3 * 864e5).toISOString().slice(0, 10);
const combos = [];
for (const v of prix.villes ?? []) {
  if (maintenant - Date.parse(v.vuLe) > 8 * 864e5) continue;
  for (const [mois, m] of Object.entries(v.mois)) {
    for (const [duree, d] of Object.entries(m.durees)) {
      for (const [depart, nuits, p] of d.combos) {
        if (depart < limiteDepart) continue;
        const retour = new Date(Date.parse(`${depart}T12:00:00Z`) + nuits * 864e5).toISOString().slice(0, 10);
        combos.push({ code: v.code, mois, duree, depart, retour, nuits, prix: Math.round(p) });
      }
    }
  }
}

// Alertes enregistrées (clé de service : lecture complète de la table).
const entetes = { apikey: sb.serviceKey, Authorization: `Bearer ${sb.serviceKey}` };
const rep = await fetch(`${sb.url}/rest/v1/alertes_prix?select=*`, { headers: entetes });
if (!rep.ok) throw new Error(`Supabase : ${rep.status} ${await rep.text()}`);
const alertes = await rep.json();

const MEMO = 'data-prix/alertes-envoyees.json';
const deja = existsSync(MEMO) ? lireJson(MEMO) : {};
const fmt = (lang, n) => new Intl.NumberFormat({ fr: 'fr-FR', de: 'de-DE', en: 'en-GB' }[lang], { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const jour = (lang, iso) => new Intl.DateTimeFormat({ fr: 'fr-FR', de: 'de-DE', en: 'en-GB' }[lang], { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(`${iso}T12:00:00Z`));
const TXT = {
  fr: (nom, p) => [`${nom} dès ${p}`, (a, r, n) => `Aller-retour du ${a} au ${r} (${n} nuits), vol direct depuis Bâle-Mulhouse.`],
  de: (nom, p) => [`${nom} ab ${p}`, (a, r, n) => `Hin und zurück vom ${a} bis ${r} (${n} Nächte), Direktflug ab Basel-Mulhouse.`],
  en: (nom, p) => [`${nom} from ${p}`, (a, r, n) => `Return ${a} to ${r} (${n} nights), direct flight from Basel-Mulhouse.`],
};

let envoyees = 0, morts = 0;
const aSupprimer = new Set();
for (const a of alertes) {
  const lang = IDX[a.lang] != null ? a.lang : 'fr';
  const vus = new Set(deja[a.id] ?? []);
  const candidat = combos
    .filter((c) => (!a.code || c.code === a.code) && (!a.duree || c.duree === a.duree) && (!a.mois || c.mois === a.mois) && c.prix <= a.prix_max)
    .filter((c) => !vus.has(`${c.code}|${c.depart}|${c.nuits}|${c.prix}`))
    .sort((x, y) => x.prix - y.prix)[0];
  if (!candidat) continue;
  const nom = NOMS[candidat.code]?.[IDX[lang]] ?? candidat.code;
  const [titre, corps] = TXT[lang](nom, fmt(lang, candidat.prix));
  const message = {
    title: titre,
    body: corps(jour(lang, candidat.depart), jour(lang, candidat.retour), candidat.nuits),
    url: chemin(lang, candidat.code) + '#prix',
    tag: `alerte-${a.id}`,
  };
  if (ESSAI) {
    console.log('[essai]', a.id.slice(0, 8), message.title, '·', message.body);
    continue;
  }
  try {
    await webpush.sendNotification({ endpoint: a.endpoint, keys: { p256dh: a.p256dh, auth: a.auth } }, JSON.stringify(message), { TTL: 3 * 86400 });
    vus.add(`${candidat.code}|${candidat.depart}|${candidat.nuits}|${candidat.prix}`);
    deja[a.id] = [...vus].slice(-200);
    envoyees++;
  } catch (e) {
    if (e.statusCode === 404 || e.statusCode === 410) { aSupprimer.add(a.endpoint); morts++; }
    else console.error('envoi impossible', a.id.slice(0, 8), e.statusCode ?? '', e.body ?? e.message);
  }
}

// Appareils désinscrits : on efface leurs alertes.
for (const endpoint of aSupprimer) {
  await fetch(`${sb.url}/rest/v1/alertes_prix?endpoint=eq.${encodeURIComponent(endpoint)}`, { method: 'DELETE', headers: entetes });
}
if (!ESSAI) writeFileSync(MEMO, JSON.stringify(deja));
console.log(`${alertes.length} alertes, ${combos.length} combos, ${envoyees} notifications envoyées, ${morts} appareils désinscrits.`);
