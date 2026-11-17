// Destinations au départ de Bâle-Mulhouse (BSL) : easyJet (formulaire easyjet.com, 16/11/2026)
// puis Wizz Air (formulaire wizzair.com, 17/11/2026 ; Wizz y appelle l'aéroport MLH).
// Clé = code de l'aéroport. Noms : [français, allemand, anglais]. `guide` = clé de lib/destinations.ts quand un guide existe.
import type { Lang } from '@/lib/i18n/config';

type Country = 'MA' | 'FR' | 'ES' | 'TR' | 'GR' | 'IT' | 'DE' | 'GB' | 'HU' | 'CY' | 'DK' | 'PL' | 'TN' | 'HR' | 'PT' | 'EG' | 'MT' | 'CZ' | 'XK' | 'IS' | 'BA' | 'ME' | 'AT' | 'AL' | 'AM' | 'BG' | 'MK' | 'MD' | 'RO' | 'RS' | 'SK';

const COUNTRIES: Record<Country, [string, string, string]> = {
  MA: ['Maroc', 'Marokko', 'Morocco'],
  FR: ['France', 'Frankreich', 'France'],
  ES: ['Espagne', 'Spanien', 'Spain'],
  TR: ['Turquie', 'Türkei', 'Turkey'],
  GR: ['Grèce', 'Griechenland', 'Greece'],
  IT: ['Italie', 'Italien', 'Italy'],
  DE: ['Allemagne', 'Deutschland', 'Germany'],
  GB: ['Royaume-Uni', 'Vereinigtes Königreich', 'United Kingdom'],
  HU: ['Hongrie', 'Ungarn', 'Hungary'],
  CY: ['Chypre', 'Zypern', 'Cyprus'],
  DK: ['Danemark', 'Dänemark', 'Denmark'],
  PL: ['Pologne', 'Polen', 'Poland'],
  TN: ['Tunisie', 'Tunesien', 'Tunisia'],
  HR: ['Croatie', 'Kroatien', 'Croatia'],
  PT: ['Portugal', 'Portugal', 'Portugal'],
  EG: ['Égypte', 'Ägypten', 'Egypt'],
  MT: ['Malte', 'Malta', 'Malta'],
  CZ: ['Tchéquie', 'Tschechien', 'Czechia'],
  XK: ['Kosovo', 'Kosovo', 'Kosovo'],
  IS: ['Islande', 'Island', 'Iceland'],
  BA: ['Bosnie-Herzégovine', 'Bosnien und Herzegowina', 'Bosnia and Herzegovina'],
  ME: ['Monténégro', 'Montenegro', 'Montenegro'],
  AT: ['Autriche', 'Österreich', 'Austria'],
  AL: ['Albanie', 'Albanien', 'Albania'],
  AM: ['Arménie', 'Armenien', 'Armenia'],
  BG: ['Bulgarie', 'Bulgarien', 'Bulgaria'],
  MK: ['Macédoine du Nord', 'Nordmazedonien', 'North Macedonia'],
  MD: ['Moldavie', 'Moldau', 'Moldova'],
  RO: ['Roumanie', 'Rumänien', 'Romania'],
  RS: ['Serbie', 'Serbien', 'Serbia'],
  SK: ['Slovaquie', 'Slowakei', 'Slovakia'],
};

interface Airport { names: [string, string, string]; country: Country; guide?: string }

export const AIRPORTS: Record<string, Airport> = {
  AGA: { names: ['Agadir', 'Agadir', 'Agadir'], country: 'MA', guide: 'Agadir' },
  AJA: { names: ['Ajaccio', 'Ajaccio', 'Ajaccio'], country: 'FR' },
  ALC: { names: ['Alicante', 'Alicante', 'Alicante'], country: 'ES', guide: 'Alicante' },
  AYT: { names: ['Antalya', 'Antalya', 'Antalya'], country: 'TR', guide: 'Antalya' },
  ATH: { names: ['Athènes', 'Athen', 'Athens'], country: 'GR', guide: 'Athenes' },
  BCN: { names: ['Barcelone', 'Barcelona', 'Barcelona'], country: 'ES', guide: 'Barcelone' },
  BRI: { names: ['Bari', 'Bari', 'Bari'], country: 'IT' },
  BIA: { names: ['Bastia', 'Bastia', 'Bastia'], country: 'FR' },
  BER: { names: ['Berlin', 'Berlin', 'Berlin'], country: 'DE', guide: 'Berlin' },
  BIQ: { names: ['Biarritz', 'Biarritz', 'Biarritz'], country: 'FR' },
  BIO: { names: ['Bilbao', 'Bilbao', 'Bilbao'], country: 'ES' },
  BOD: { names: ['Bordeaux', 'Bordeaux', 'Bordeaux'], country: 'FR' },
  BDS: { names: ['Brindisi', 'Brindisi', 'Brindisi'], country: 'IT' },
  BRS: { names: ['Bristol', 'Bristol', 'Bristol'], country: 'GB' },
  BUD: { names: ['Budapest', 'Budapest', 'Budapest'], country: 'HU', guide: 'Budapest' },
  CLY: { names: ['Calvi', 'Calvi', 'Calvi'], country: 'FR' },
  LCA: { names: ['Larnaca', 'Larnaka', 'Larnaca'], country: 'CY' },
  CPH: { names: ['Copenhague', 'Kopenhagen', 'Copenhagen'], country: 'DK', guide: 'Copenhague' },
  CFU: { names: ['Corfou', 'Korfu', 'Corfu'], country: 'GR' },
  KRK: { names: ['Cracovie', 'Krakau', 'Krakow'], country: 'PL', guide: 'Cracovie' },
  HER: { names: ['Héraklion', 'Heraklion', 'Heraklion'], country: 'GR', guide: 'Heraklion' },
  CHQ: { names: ['La Canée', 'Chania', 'Chania'], country: 'GR' },
  DJE: { names: ['Djerba', 'Djerba', 'Djerba'], country: 'TN', guide: 'Djerba' },
  DBV: { names: ['Dubrovnik', 'Dubrovnik', 'Dubrovnik'], country: 'HR', guide: 'Dubrovnik' },
  EDI: { names: ['Édimbourg', 'Edinburgh', 'Edinburgh'], country: 'GB', guide: 'Edimbourg' },
  NBE: { names: ['Enfidha-Hammamet', 'Enfidha-Hammamet', 'Enfidha-Hammamet'], country: 'TN' },
  FAO: { names: ['Faro', 'Faro', 'Faro'], country: 'PT', guide: 'Faro' },
  FSC: { names: ['Figari', 'Figari', 'Figari'], country: 'FR' },
  FUE: { names: ['Fuerteventura', 'Fuerteventura', 'Fuerteventura'], country: 'ES', guide: 'Fuerteventura' },
  LPA: { names: ['Grande Canarie', 'Gran Canaria', 'Gran Canaria'], country: 'ES', guide: 'Grande Canarie' },
  HAM: { names: ['Hambourg', 'Hamburg', 'Hamburg'], country: 'DE', guide: 'Hambourg' },
  HRG: { names: ['Hurghada', 'Hurghada', 'Hurghada'], country: 'EG', guide: 'Hurghada' },
  IBZ: { names: ['Ibiza', 'Ibiza', 'Ibiza'], country: 'ES', guide: 'Ibiza' },
  KGS: { names: ['Kos', 'Kos', 'Kos'], country: 'GR' },
  SUF: { names: ['Lamezia Terme', 'Lamezia Terme', 'Lamezia Terme'], country: 'IT' },
  ACE: { names: ['Lanzarote', 'Lanzarote', 'Lanzarote'], country: 'ES', guide: 'Lanzarote' },
  LIL: { names: ['Lille', 'Lille', 'Lille'], country: 'FR' },
  LIS: { names: ['Lisbonne', 'Lissabon', 'Lisbon'], country: 'PT', guide: 'Lisbonne' },
  LGW: { names: ['Londres Gatwick', 'London Gatwick', 'London Gatwick'], country: 'GB', guide: 'Londres' },
  LTN: { names: ['Londres Luton', 'London Luton', 'London Luton'], country: 'GB', guide: 'Londres' },
  FNC: { names: ['Madère', 'Madeira', 'Madeira'], country: 'PT' },
  MAD: { names: ['Madrid', 'Madrid', 'Madrid'], country: 'ES', guide: 'Madrid' },
  PMI: { names: ['Palma de Majorque', 'Palma de Mallorca', 'Palma de Mallorca'], country: 'ES', guide: 'Palma de Mallorca' },
  AGP: { names: ['Málaga', 'Málaga', 'Málaga'], country: 'ES', guide: 'Malaga' },
  MLA: { names: ['Malte', 'Malta', 'Malta'], country: 'MT' },
  MAN: { names: ['Manchester', 'Manchester', 'Manchester'], country: 'GB', guide: 'Manchester' },
  RAK: { names: ['Marrakech', 'Marrakesch', 'Marrakech'], country: 'MA', guide: 'Marrakech' },
  MAH: { names: ['Minorque', 'Menorca', 'Menorca'], country: 'ES' },
  MPL: { names: ['Montpellier', 'Montpellier', 'Montpellier'], country: 'FR' },
  NTE: { names: ['Nantes', 'Nantes', 'Nantes'], country: 'FR' },
  NAP: { names: ['Naples', 'Neapel', 'Naples'], country: 'IT', guide: 'Naples' },
  NCE: { names: ['Nice', 'Nizza', 'Nice'], country: 'FR', guide: 'Nice' },
  PNL: { names: ['Pantelleria', 'Pantelleria', 'Pantelleria'], country: 'IT' },
  OPO: { names: ['Porto', 'Porto', 'Porto'], country: 'PT', guide: 'Porto' },
  PRG: { names: ['Prague', 'Prag', 'Prague'], country: 'CZ', guide: 'Prague' },
  PRN: { names: ['Pristina', 'Pristina', 'Pristina'], country: 'XK' },
  PUY: { names: ['Pula', 'Pula', 'Pula'], country: 'HR' },
  KEF: { names: ['Reykjavik', 'Reykjavík', 'Reykjavik'], country: 'IS' },
  RHO: { names: ['Rhodes', 'Rhodos', 'Rhodes'], country: 'GR', guide: 'Rhodes' },
  RMI: { names: ['Rimini', 'Rimini', 'Rimini'], country: 'IT' },
  FCO: { names: ['Rome', 'Rom', 'Rome'], country: 'IT', guide: 'Rome' },
  SCQ: { names: ['Saint-Jacques-de-Compostelle', 'Santiago de Compostela', 'Santiago de Compostela'], country: 'ES' },
  SPC: { names: ['La Palma', 'La Palma', 'La Palma'], country: 'ES' },
  SJJ: { names: ['Sarajevo', 'Sarajevo', 'Sarajevo'], country: 'BA' },
  CAG: { names: ['Cagliari', 'Cagliari', 'Cagliari'], country: 'IT' },
  OLB: { names: ['Olbia', 'Olbia', 'Olbia'], country: 'IT' },
  SVQ: { names: ['Séville', 'Sevilla', 'Seville'], country: 'ES' },
  CTA: { names: ['Catane', 'Catania', 'Catania'], country: 'IT' },
  PMO: { names: ['Palerme', 'Palermo', 'Palermo'], country: 'IT' },
  SPU: { names: ['Split', 'Split', 'Split'], country: 'HR', guide: 'Split' },
  TNG: { names: ['Tanger', 'Tanger', 'Tangier'], country: 'MA' },
  TFS: { names: ['Tenerife', 'Teneriffa', 'Tenerife'], country: 'ES', guide: 'Tenerife' },
  SKG: { names: ['Thessalonique', 'Thessaloniki', 'Thessaloniki'], country: 'GR' },
  TIV: { names: ['Tivat', 'Tivat', 'Tivat'], country: 'ME' },
  TLS: { names: ['Toulouse', 'Toulouse', 'Toulouse'], country: 'FR' },
  VLC: { names: ['Valence', 'Valencia', 'Valencia'], country: 'ES' },
  VCE: { names: ['Venise', 'Venedig', 'Venice'], country: 'IT', guide: 'Venise' },
  VIE: { names: ['Vienne', 'Wien', 'Vienna'], country: 'AT', guide: 'Vienne' },
  ZAD: { names: ['Zadar', 'Zadar', 'Zadar'], country: 'HR' },
  // Wizz Air (17/11/2026)
  TIA: { names: ['Tirana', 'Tirana', 'Tirana'], country: 'AL' },
  EVN: { names: ['Erevan', 'Jerewan', 'Yerevan'], country: 'AM' },
  BNX: { names: ['Banja Luka', 'Banja Luka', 'Banja Luka'], country: 'BA' },
  TZL: { names: ['Tuzla', 'Tuzla', 'Tuzla'], country: 'BA' },
  SOF: { names: ['Sofia', 'Sofia', 'Sofia'], country: 'BG', guide: 'Sofia' },
  VAR: { names: ['Varna', 'Warna', 'Varna'], country: 'BG' },
  OHD: { names: ['Ohrid', 'Ohrid', 'Ohrid'], country: 'MK' },
  SKP: { names: ['Skopje', 'Skopje', 'Skopje'], country: 'MK' },
  RMO: { names: ['Chișinău', 'Chișinău', 'Chișinău'], country: 'MD' },
  TGD: { names: ['Podgorica', 'Podgorica', 'Podgorica'], country: 'ME' },
  POZ: { names: ['Poznań', 'Posen', 'Poznań'], country: 'PL' },
  WAW: { names: ['Varsovie', 'Warschau', 'Warsaw'], country: 'PL', guide: 'Varsovie' },
  WRO: { names: ['Wrocław', 'Breslau', 'Wrocław'], country: 'PL' },
  OTP: { names: ['Bucarest Otopeni', 'Bukarest Otopeni', 'Bucharest Otopeni'], country: 'RO', guide: 'Bucarest' },
  BBU: { names: ['Bucarest Băneasa', 'Bukarest Băneasa', 'Bucharest Băneasa'], country: 'RO' },
  CLJ: { names: ['Cluj-Napoca', 'Klausenburg', 'Cluj-Napoca'], country: 'RO' },
  IAS: { names: ['Iași', 'Iași', 'Iași'], country: 'RO' },
  TSR: { names: ['Timișoara', 'Temeswar', 'Timișoara'], country: 'RO' },
  TGM: { names: ['Târgu Mureș', 'Neumarkt am Mieresch', 'Târgu Mureș'], country: 'RO' },
  BEG: { names: ['Belgrade', 'Belgrad', 'Belgrade'], country: 'RS', guide: 'Belgrade' },
  INI: { names: ['Niš', 'Niš', 'Niš'], country: 'RS' },
  BTS: { names: ['Bratislava', 'Bratislava', 'Bratislava'], country: 'SK' },
};

const IDX: Record<Lang, 0 | 1 | 2> = { fr: 0, de: 1, en: 2 };

export function airportName(code: string, lang: Lang): string {
  return AIRPORTS[code]?.names[IDX[lang]] ?? code;
}

export function airportCountry(code: string, lang: Lang): string {
  const c = AIRPORTS[code]?.country;
  return c ? COUNTRIES[c][IDX[lang]] : '';
}

/** Adresse de la page d'une destination : le nom français sans accents (« Londres Gatwick » → « londres-gatwick »). */
export function airportSlug(code: string): string {
  return (AIRPORTS[code]?.names[0] ?? code)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const BY_SLUG: Record<string, string> = Object.fromEntries(Object.keys(AIRPORTS).map((c) => [airportSlug(c), c]));

export function airportFromSlug(slug: string): string | null {
  return BY_SLUG[slug] ?? null;
}

/** Code easyJet correspondant à une destination de lib/destinations.ts (Londres → LGW). */
export function airportForGuide(destination: string): string | null {
  return Object.keys(AIRPORTS).find((c) => AIRPORTS[c].guide === destination) ?? null;
}

export type Compagnie = 'easyjet' | 'wizz';
export const NOM_COMPAGNIE: Record<Compagnie, string> = { easyjet: 'easyJet', wizz: 'Wizz Air' };

/** Recherche déjà remplie chez la compagnie (Bâle-Mulhouse, destination, dates, 1 adulte). */
export function lienVol(c: { code: string; depart: string; retour: string; cie: Compagnie }, lang: Lang): string {
  if (c.cie === 'wizz') {
    const loc = { fr: 'fr-fr', de: 'de-de', en: 'en-gb' }[lang];
    return `https://www.wizzair.com/${loc}/booking/select-flight/BSL/${c.code}/${c.depart}/${c.retour}/1/0/0/null`;
  }
  const q = new URLSearchParams({ dep: 'BSL', dest: c.code, dd: c.depart, rd: c.retour, apax: '1', cpax: '0', ipax: '0', isOneWay: 'off' });
  return `https://www.easyjet.com/${lang}/buy/flights?${q}`;
}
