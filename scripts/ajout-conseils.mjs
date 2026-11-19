// Ajoute des conseils de voyage (fichier JSON { fr: {CODE: [4 conseils]}, de: {…}, en: {…} })
// à la fin de lib/conseils/fr2.ts, de2.ts et en2.ts. Refuse un code déjà présent.
// Usage : node scripts/ajout-conseils.mjs <fichier.json>
import { readFileSync, writeFileSync } from 'node:fs';

const data = JSON.parse(readFileSync(process.argv[2], 'utf8'));
for (const lang of ['fr', 'de', 'en']) {
  const p = `lib/conseils/${lang}2.ts`;
  let s = readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
  let bloc = '';
  for (const [code, tips] of Object.entries(data[lang])) {
    if (tips.length !== 4) throw new Error(`${lang} ${code} : il faut 4 conseils`);
    if (new RegExp(`^  ${code}: \\[`, 'm').test(s)) throw new Error(`${lang} ${code} : déjà présent`);
    bloc += `  ${code}: [\n${tips.map((t) => `    ${JSON.stringify(t)},`).join('\n')}\n  ],\n`;
  }
  s = s.replace(/\n\};\s*$/, `\n${bloc}};\n`);
  writeFileSync(p, s.replace(/\n/g, '\r\n'));
  console.log(p, Object.keys(data[lang]).length, 'villes');
}
