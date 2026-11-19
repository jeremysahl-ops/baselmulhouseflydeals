// Illustration des journées de programme (« incontournables ») : un pictogramme par thème, dessiné ici
// (traits de 24 × 24), sur une tuile de couleur propre au thème. Le thème est deviné à partir du texte français.

export type Theme =
  | 'nuit' | 'plage' | 'bateau' | 'montagne' | 'religieux' | 'chateau' | 'antique'
  | 'eau' | 'vin' | 'gastronomie' | 'musee' | 'nature' | 'vieilleVille' | 'excursion';

const REGLES: [Theme, RegExp][] = [
  ['nuit', /étoile|aurore|starlight/],
  ['plage', /plage|crique|baignade|lagon|surf|farniente/],
  ['bateau', /bateau|ferry|croisière|archipel|traversée|\babra\b|dghajsa|\bîles\b|navibus/],
  ['montagne', /montagne|\bmont\b|volcan|etna|randonn|gorge|canyon|massif|\bcol\b|sommet|\bpic\b|cratère|caldera|dune|téléphérique|funiculaire/],
  ['religieux', /cathédrale|église|monastère|basilique|mosquée|abbaye|sanctuaire|ermitage|cité du vatican/],
  ['chateau', /château|forteresse|citadelle|rempart|kasbah|\bfort\b|alcázar|\bkale\b|palais|kastel/],
  ['antique', /romain|antique|temple|ruines|archéolog|amphithéâtre|arènes|thermes|préhistor|nouragi|tombeaux|byzantin/],
  ['vin', /\bvins?\b|vignoble|cave|dégustation|vendange|passito|cité du vin/],
  ['gastronomie', /marché|souk|tapas|pintxo|street-food|bazar|halles|huîtres|glace|gastronom/],
  ['eau', /\blacs?\b|cascade|rivière|source|fleuve|canal|canaux|danube|thermal|lagune|ria\b|\bría\b/],
  ['musee', /musée|street-art|beaux-arts|galerie|louvre|panorama/],
  ['nature', /\bparc\b|forêt|jardin|réserve|nature|vallée|oliviers|flamants|baleines/],
  ['vieilleVille', /vieille ville|centre|médina|quartier|ruelles|\bplace\b|vieux|casco|ville haute|front de mer|port\b/],
];

// Exceptions relues à la main (19/11/2026), clé « destination|n° de la journée » (0 = première).
const EXCEPTIONS: Record<string, Theme> = {
  'Athenes|0': 'antique', 'Barcelone|0': 'religieux', 'Belgrade|1': 'religieux', 'Berlin|0': 'vieilleVille', 'Berlin|1': 'musee',
  'Budapest|2': 'eau', 'Djerba|1': 'religieux', 'Dublin|1': 'vin', 'Edimbourg|1': 'montagne', 'Edimbourg|2': 'vieilleVille',
  'Fuerteventura|2': 'plage', 'Hambourg|0': 'eau', 'Istanbul|1': 'chateau', 'Lisbonne|2': 'vieilleVille', 'Londres|1': 'chateau',
  'Londres|2': 'musee', 'Madrid|1': 'musee', 'Marseille|1': 'religieux', 'Mykonos|1': 'antique', 'Nice|2': 'excursion',
  'Palma de Mallorca|1': 'chateau', 'Paris|0': 'musee', 'Paris|1': 'musee', 'Porto|2': 'nature', 'Tenerife|1': 'nature',
  'Varsovie|1': 'musee', 'Bastia|2': 'excursion', 'Lille|1': 'musee', 'Montpellier|0': 'vieilleVille', 'Nantes|1': 'musee',
  'Nantes|2': 'musee', 'Toulouse|1': 'eau', 'Valence|1': 'musee', 'Madere|0': 'vieilleVille', 'Larnaca|2': 'vieilleVille',
  'Reykjavik|2': 'eau', 'Brindisi|2': 'vieilleVille', 'Cagliari|2': 'musee', 'Catane|2': 'antique', 'Lamezia Terme|1': 'gastronomie',
  'Corfou|1': 'chateau', 'Kos|1': 'antique', 'Thessalonique|1': 'religieux', 'Pula|2': 'vieilleVille', 'Zadar|1': 'eau',
  'Enfidha-Hammamet|1': 'vieilleVille', 'Tanger|1': 'excursion', 'Tanger|2': 'vieilleVille', 'Dubai|1': 'vieilleVille',
  'Sarajevo|0': 'gastronomie', 'Tivat|0': 'chateau', 'Tivat|2': 'bateau', 'Banja Luka|2': 'eau', 'Erevan|1': 'musee',
  'Erevan|2': 'antique', 'Poznan|1': 'religieux', 'Poznan|2': 'gastronomie', 'Wrocław|0': 'vieilleVille', 'Wrocław|1': 'religieux',
  'Cluj-Napoca|2': 'excursion', 'Nis|1': 'musee', 'La Palma|2': 'montagne', 'Pantelleria|0': 'excursion',
};

/** Thème d'une journée : exception relue, sinon d'après son titre, sinon d'après son texte (en français). */
export function themeDe(destination: string, index: number, titre: string, texte: string): Theme {
  const ex = EXCEPTIONS[`${destination}|${index}`];
  if (ex) return ex;
  for (const s of [titre, texte]) {
    const t = s.toLowerCase();
    for (const [theme, re] of REGLES) if (re.test(t)) return theme;
  }
  return 'excursion';
}

const COULEURS: Record<Theme, [string, string]> = {
  nuit: ['#0d1b2e', '#ffc72c'],
  plage: ['#dcf2ef', '#0f766e'],
  bateau: ['#e2ecfa', '#1e4f9a'],
  montagne: ['#e5efe0', '#3f6b2a'],
  religieux: ['#eee7f7', '#6b3fa0'],
  chateau: ['#ebe7e1', '#57493a'],
  antique: ['#f6ead4', '#8a5a12'],
  vin: ['#f5e2ea', '#8c2f55'],
  gastronomie: ['#fbe6db', '#b4471a'],
  eau: ['#ddf0f7', '#0e6e8c'],
  musee: ['#e9e7f7', '#4338ca'],
  nature: ['#e8f2dc', '#4d7c0f'],
  vieilleVille: ['#faefd3', '#9a6b00'],
  excursion: ['#e6e9ee', '#0d1b2e'],
};

const TRAITS: Record<Theme, React.ReactNode> = {
  nuit: (<><path d="M19 14.5A7.5 7.5 0 1 1 9.5 5a6 6 0 0 0 9.5 9.5z" /><path d="M17 3v3M15.5 4.5h3M21 8v2M20 9h2" /></>),
  plage: (<><circle cx="12" cy="8" r="3" /><path d="M12 2v1.5M5.5 4.5l1 1M18.5 4.5l-1 1M3 8h1.5M19.5 8H21" /><path d="M2 15c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" /><path d="M2 19.5c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" /></>),
  bateau: (<><path d="M12 3v13" /><path d="M12 4l7 10h-7" /><path d="M11 7l-5 7h5" /><path d="M3 17h18l-2.5 4h-13z" /></>),
  montagne: (<><path d="M2 20l7-12 4 6 2.5-3.5L22 20z" /><path d="M7.2 11l1.8 1.2 1.6-1.4" /></>),
  religieux: (<><path d="M12 2v4M10 4h4" /><path d="M5 21V11l7-5 7 5v10z" /><path d="M10 21v-4a2 2 0 0 1 4 0v4" /><circle cx="12" cy="11.5" r="1.5" /></>),
  chateau: (<><path d="M3 21V9h3v2h2V9h2v2h4V9h2v2h2V9h3v12z" /><path d="M10 21v-4a2 2 0 0 1 4 0v4" /><path d="M6 14h1M17 14h1" /></>),
  antique: (<><path d="M3 9l9-5 9 5z" /><path d="M4 9h16M4 19h16M3 21h18" /><path d="M6.5 10v8M10.5 10v8M14.5 10v8M18 10v8" /></>),
  vin: (<><path d="M8 3h8l-.7 6a3.3 3.3 0 0 1-6.6 0z" /><path d="M8.3 6.5h7.4" /><path d="M12 12.5V20M8.5 21h7" /></>),
  gastronomie: (<><path d="M6 3v5a2 2 0 0 0 4 0V3M8 10v11" /><path d="M17 21V3c-2 1.2-3 4-3 7.5h3" /></>),
  eau: (<><path d="M12 3c3.2 4.2 6 7.2 6 11a6 6 0 0 1-12 0c0-3.8 2.8-6.8 6-11z" /><path d="M9 14.5a3 3 0 0 0 3 3" /></>),
  musee: (<><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M6 16l4-5 3 3.5 2-2 3 3.5" /><circle cx="16.5" cy="8.5" r="1.3" /></>),
  nature: (<><path d="M12 22v-5" /><path d="M12 3l5.5 7h-3l4 5H5.5l4-5h-3z" /></>),
  vieilleVille: (<><path d="M3 21V11l4-4 4 4v10M11 21V9l5-5 5 5v12" /><path d="M2 21h20" /><path d="M5.5 14h3M5.5 17.5h3M14 11h4M14 14.5h4M14 18h4" /></>),
  excursion: (<><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></>),
};

const NOMS: Record<Theme, [string, string, string]> = {
  nuit: ['Sous les étoiles', 'Unter den Sternen', 'Under the stars'],
  plage: ['Plage', 'Strand', 'Beach'],
  bateau: ['En bateau', 'Mit dem Boot', 'By boat'],
  montagne: ['Nature et reliefs', 'Berge und Natur', 'Mountains and views'],
  religieux: ['Patrimoine sacré', 'Sakrales Erbe', 'Sacred heritage'],
  chateau: ['Châteaux et forteresses', 'Burgen und Festungen', 'Castles and forts'],
  antique: ['Site antique', 'Antike Stätte', 'Ancient site'],
  vin: ['Vins et caves', 'Wein und Keller', 'Wine and cellars'],
  gastronomie: ['Marchés et saveurs', 'Märkte und Genuss', 'Markets and food'],
  eau: ['Au fil de l’eau', 'Am Wasser', 'By the water'],
  musee: ['Musées et culture', 'Museen und Kultur', 'Museums and culture'],
  nature: ['Parcs et jardins', 'Parks und Gärten', 'Parks and gardens'],
  vieilleVille: ['Vieille ville', 'Altstadt', 'Old town'],
  excursion: ['Escapade', 'Ausflug', 'Day trip'],
};

export default function ThemeIcon({ theme, lang }: { theme: Theme; lang: 'fr' | 'de' | 'en' }) {
  const [fond, trait] = COULEURS[theme];
  return (
    <div className="flex h-24 items-center gap-4 rounded-lg px-5 md:h-32 md:flex-col md:justify-center md:gap-2" style={{ backgroundColor: fond }}>
      <svg viewBox="0 0 24 24" className="h-11 w-11 shrink-0 md:h-12 md:w-12" fill="none" stroke={trait} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {TRAITS[theme]}
      </svg>
      <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: trait }}>
        {NOMS[theme][{ fr: 0, de: 1, en: 2 }[lang]]}
      </span>
    </div>
  );
}
