// Destinations au départ de Bâle-Mulhouse (BSL) : easyJet (formulaire easyjet.com, 16/11/2026)
// puis Wizz Air (formulaire wizzair.com, 17/11/2026 ; Wizz y appelle l'aéroport MLH), puis Pegasus (flypgs.com, 18/11/2026) et Ryanair (ryanair.com, 18/11/2026), puis flydubai (flydubai.com, 19/11/2026).
// Clé = code de l'aéroport. Noms : [français, allemand, anglais]. `guide` = clé de lib/destinations.ts quand un guide existe.
import type { Lang } from '@/lib/i18n/config';

type Country = 'MA' | 'FR' | 'ES' | 'TR' | 'GR' | 'IT' | 'DE' | 'GB' | 'HU' | 'CY' | 'DK' | 'PL' | 'TN' | 'HR' | 'PT' | 'EG' | 'MT' | 'CZ' | 'XK' | 'IS' | 'BA' | 'ME' | 'AT' | 'AL' | 'AM' | 'BG' | 'MK' | 'MD' | 'RO' | 'RS' | 'SK' | 'IE' | 'AE';

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
  IE: ['Irlande', 'Irland', 'Ireland'],
  AE: ['Émirats arabes unis', 'Vereinigte Arabische Emirate', 'United Arab Emirates'],
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

/** `photo` : identifiant Unsplash d'une photo de la ville (pour les villes sans guide), regardée sur planche avant d'être retenue. */
interface Airport { names: [string, string, string]; country: Country; guide?: string; photo?: string; credit?: string }

export const AIRPORTS: Record<string, Airport> = {
  AGA: { names: ['Agadir', 'Agadir', 'Agadir'], country: 'MA', guide: 'Agadir' },
  AJA: { names: ['Ajaccio', 'Ajaccio', 'Ajaccio'], country: 'FR', guide: 'Ajaccio', photo: 'photo-1721943254338-a5805f698017' },
  ALC: { names: ['Alicante', 'Alicante', 'Alicante'], country: 'ES', guide: 'Alicante' },
  AYT: { names: ['Antalya', 'Antalya', 'Antalya'], country: 'TR', guide: 'Antalya' },
  ATH: { names: ['Athènes', 'Athen', 'Athens'], country: 'GR', guide: 'Athenes' },
  BCN: { names: ['Barcelone', 'Barcelona', 'Barcelona'], country: 'ES', guide: 'Barcelone' },
  BRI: { names: ['Bari', 'Bari', 'Bari'], country: 'IT', guide: 'Bari', photo: 'photo-1611238763458-0de1027136cf' },
  BIA: { names: ['Bastia', 'Bastia', 'Bastia'], country: 'FR', guide: 'Bastia', photo: 'photo-1711451754064-45b8518023a8' },
  BER: { names: ['Berlin', 'Berlin', 'Berlin'], country: 'DE', guide: 'Berlin' },
  BIQ: { names: ['Biarritz', 'Biarritz', 'Biarritz'], country: 'FR', guide: 'Biarritz', photo: 'photo-1666465622777-66e2218ddc49' },
  BIO: { names: ['Bilbao', 'Bilbao', 'Bilbao'], country: 'ES', guide: 'Bilbao', photo: 'photo-1544041510-c6127fc6853d' },
  BOD: { names: ['Bordeaux', 'Bordeaux', 'Bordeaux'], country: 'FR', guide: 'Bordeaux', photo: 'photo-1493564738392-d148cfbd6eda' },
  BDS: { names: ['Brindisi', 'Brindisi', 'Brindisi'], country: 'IT', guide: 'Brindisi', photo: 'photo-1693649510280-f39dacadda8c' },
  BRS: { names: ['Bristol', 'Bristol', 'Bristol'], country: 'GB', guide: 'Bristol', photo: 'photo-1784471396874-489f6e058374' },
  BUD: { names: ['Budapest', 'Budapest', 'Budapest'], country: 'HU', guide: 'Budapest' },
  CLY: { names: ['Calvi', 'Calvi', 'Calvi'], country: 'FR', guide: 'Calvi', photo: 'photo-1661678964544-ea6a2aebe685' },
  LCA: { names: ['Larnaca', 'Larnaka', 'Larnaca'], country: 'CY', guide: 'Larnaca', photo: 'photo-1622632980805-e6d6539eb8aa' },
  CPH: { names: ['Copenhague', 'Kopenhagen', 'Copenhagen'], country: 'DK', guide: 'Copenhague' },
  CFU: { names: ['Corfou', 'Korfu', 'Corfu'], country: 'GR', guide: 'Corfou', photo: 'photo-1500198894528-3819de6ad916' },
  KRK: { names: ['Cracovie', 'Krakau', 'Krakow'], country: 'PL', guide: 'Cracovie' },
  HER: { names: ['Héraklion', 'Heraklion', 'Heraklion'], country: 'GR', guide: 'Heraklion' },
  CHQ: { names: ['La Canée', 'Chania', 'Chania'], country: 'GR', guide: 'La Canee', photo: 'photo-1705268889068-a8f81d125022' },
  DJE: { names: ['Djerba', 'Djerba', 'Djerba'], country: 'TN', guide: 'Djerba' },
  DBV: { names: ['Dubrovnik', 'Dubrovnik', 'Dubrovnik'], country: 'HR', guide: 'Dubrovnik' },
  EDI: { names: ['Édimbourg', 'Edinburgh', 'Edinburgh'], country: 'GB', guide: 'Edimbourg' },
  NBE: { names: ['Enfidha-Hammamet', 'Enfidha-Hammamet', 'Enfidha-Hammamet'], country: 'TN', guide: 'Enfidha-Hammamet', photo: 'photo-1722788137347-0df88c467b86' },
  FAO: { names: ['Faro', 'Faro', 'Faro'], country: 'PT', guide: 'Faro' },
  FSC: { names: ['Figari', 'Figari', 'Figari'], country: 'FR', guide: 'Figari', photo: 'photo-1687469043863-4593a52737fe' },
  FUE: { names: ['Fuerteventura', 'Fuerteventura', 'Fuerteventura'], country: 'ES', guide: 'Fuerteventura' },
  LPA: { names: ['Grande Canarie', 'Gran Canaria', 'Gran Canaria'], country: 'ES', guide: 'Grande Canarie' },
  HAM: { names: ['Hambourg', 'Hamburg', 'Hamburg'], country: 'DE', guide: 'Hambourg' },
  HRG: { names: ['Hurghada', 'Hurghada', 'Hurghada'], country: 'EG', guide: 'Hurghada' },
  IBZ: { names: ['Ibiza', 'Ibiza', 'Ibiza'], country: 'ES', guide: 'Ibiza' },
  KGS: { names: ['Kos', 'Kos', 'Kos'], country: 'GR', guide: 'Kos', photo: 'photo-1565257383254-511420865740' },
  SUF: { names: ['Lamezia Terme', 'Lamezia Terme', 'Lamezia Terme'], country: 'IT', guide: 'Lamezia Terme', photo: 'photo-1602582702823-f97fcb859164' },
  ACE: { names: ['Lanzarote', 'Lanzarote', 'Lanzarote'], country: 'ES', guide: 'Lanzarote' },
  LIL: { names: ['Lille', 'Lille', 'Lille'], country: 'FR', guide: 'Lille', photo: 'photo-1709486815648-e34d369d7c6b' },
  LIS: { names: ['Lisbonne', 'Lissabon', 'Lisbon'], country: 'PT', guide: 'Lisbonne' },
  LGW: { names: ['Londres Gatwick', 'London Gatwick', 'London Gatwick'], country: 'GB', guide: 'Londres' },
  LTN: { names: ['Londres Luton', 'London Luton', 'London Luton'], country: 'GB', guide: 'Londres' },
  FNC: { names: ['Madère', 'Madeira', 'Madeira'], country: 'PT', guide: 'Madere', photo: 'photo-1674333362725-84e9996aa6fb' },
  MAD: { names: ['Madrid', 'Madrid', 'Madrid'], country: 'ES', guide: 'Madrid' },
  PMI: { names: ['Palma de Majorque', 'Palma de Mallorca', 'Palma de Mallorca'], country: 'ES', guide: 'Palma de Mallorca' },
  AGP: { names: ['Málaga', 'Málaga', 'Málaga'], country: 'ES', guide: 'Malaga' },
  MLA: { names: ['Malte', 'Malta', 'Malta'], country: 'MT', guide: 'Malte', photo: 'photo-1736531966587-fe98ab5f8a79' },
  MAN: { names: ['Manchester', 'Manchester', 'Manchester'], country: 'GB', guide: 'Manchester' },
  RAK: { names: ['Marrakech', 'Marrakesch', 'Marrakech'], country: 'MA', guide: 'Marrakech' },
  MAH: { names: ['Minorque', 'Menorca', 'Menorca'], country: 'ES', guide: 'Minorque', photo: 'photo-1592634214635-d4ae889d9621' },
  MPL: { names: ['Montpellier', 'Montpellier', 'Montpellier'], country: 'FR', guide: 'Montpellier', photo: 'photo-1666886677737-2cd1f108e080' },
  NTE: { names: ['Nantes', 'Nantes', 'Nantes'], country: 'FR', guide: 'Nantes', photo: 'photo-1676283898167-addc4238bee8' },
  NAP: { names: ['Naples', 'Neapel', 'Naples'], country: 'IT', guide: 'Naples' },
  NCE: { names: ['Nice', 'Nizza', 'Nice'], country: 'FR', guide: 'Nice' },
  PNL: { names: ['Pantelleria', 'Pantelleria', 'Pantelleria'], country: 'IT', guide: 'Pantelleria', photo: 'photo-1728147832951-110297cd420c' },
  OPO: { names: ['Porto', 'Porto', 'Porto'], country: 'PT', guide: 'Porto' },
  PRG: { names: ['Prague', 'Prag', 'Prague'], country: 'CZ', guide: 'Prague' },
  PRN: { names: ['Pristina', 'Pristina', 'Pristina'], country: 'XK', guide: 'Pristina', photo: 'photo-1653684617625-c6d017d05b80' },
  PUY: { names: ['Pula', 'Pula', 'Pula'], country: 'HR', guide: 'Pula', photo: 'photo-1681500669814-ca219efa0514' },
  KEF: { names: ['Reykjavik', 'Reykjavík', 'Reykjavik'], country: 'IS', guide: 'Reykjavik', photo: 'photo-1606130503037-6a8ef67c9d2d' },
  RHO: { names: ['Rhodes', 'Rhodos', 'Rhodes'], country: 'GR', guide: 'Rhodes' },
  RMI: { names: ['Rimini', 'Rimini', 'Rimini'], country: 'IT', guide: 'Rimini', photo: 'photo-1753705723488-a3cb24f1735f' },
  FCO: { names: ['Rome', 'Rom', 'Rome'], country: 'IT', guide: 'Rome' },
  SCQ: { names: ['Saint-Jacques-de-Compostelle', 'Santiago de Compostela', 'Santiago de Compostela'], country: 'ES', guide: 'Saint-Jacques-de-Compostelle', photo: 'photo-1786737352339-ccfdd8f87d88' },
  SPC: { names: ['La Palma', 'La Palma', 'La Palma'], country: 'ES', guide: 'La Palma', photo: 'photo-1722522695721-17c6d92e278b' },
  SJJ: { names: ['Sarajevo', 'Sarajevo', 'Sarajevo'], country: 'BA', guide: 'Sarajevo', photo: 'photo-1570831709673-03320e9d734f' },
  CAG: { names: ['Cagliari', 'Cagliari', 'Cagliari'], country: 'IT', guide: 'Cagliari', photo: 'photo-1691054911677-49f37329f165' },
  OLB: { names: ['Olbia', 'Olbia', 'Olbia'], country: 'IT', guide: 'Olbia', photo: 'photo-1700571969148-87b932ea003c' },
  SVQ: { names: ['Séville', 'Sevilla', 'Seville'], country: 'ES', guide: 'Seville', photo: 'photo-1509840841025-9088ba78a826' },
  CTA: { names: ['Catane', 'Catania', 'Catania'], country: 'IT', guide: 'Catane', photo: 'photo-1641286894787-4a2a97a1e34a' },
  PMO: { names: ['Palerme', 'Palermo', 'Palermo'], country: 'IT', guide: 'Palerme', photo: 'photo-1586729223498-2cc4a05d3858' },
  SPU: { names: ['Split', 'Split', 'Split'], country: 'HR', guide: 'Split' },
  TNG: { names: ['Tanger', 'Tanger', 'Tangier'], country: 'MA', guide: 'Tanger', photo: 'photo-1582919534700-acf2374f10d3' },
  TFS: { names: ['Tenerife', 'Teneriffa', 'Tenerife'], country: 'ES', guide: 'Tenerife' },
  SKG: { names: ['Thessalonique', 'Thessaloniki', 'Thessaloniki'], country: 'GR', guide: 'Thessalonique', photo: 'photo-1613538384222-cd71e8488d7a' },
  TIV: { names: ['Tivat', 'Tivat', 'Tivat'], country: 'ME', guide: 'Tivat', photo: 'photo-1614122027743-50a9e6e8002f' },
  TLS: { names: ['Toulouse', 'Toulouse', 'Toulouse'], country: 'FR', guide: 'Toulouse', photo: 'photo-1757859756279-ac2a4ed0245d' },
  VLC: { names: ['Valence', 'Valencia', 'Valencia'], country: 'ES', guide: 'Valence', photo: 'photo-1761145190274-4558a9a2f74e' },
  VCE: { names: ['Venise', 'Venedig', 'Venice'], country: 'IT', guide: 'Venise' },
  VIE: { names: ['Vienne', 'Wien', 'Vienna'], country: 'AT', guide: 'Vienne' },
  ZAD: { names: ['Zadar', 'Zadar', 'Zadar'], country: 'HR', guide: 'Zadar', photo: 'photo-1661178434473-6daf1940d913' },
  // Wizz Air (17/11/2026)
  TIA: { names: ['Tirana', 'Tirana', 'Tirana'], country: 'AL', guide: 'Tirana', photo: 'photo-1632353913765-9b56b7b4bd55' },
  EVN: { names: ['Erevan', 'Jerewan', 'Yerevan'], country: 'AM', photo: 'photo-1600758208050-a22f17dc5bb9' },
  BNX: { names: ['Banja Luka', 'Banja Luka', 'Banja Luka'], country: 'BA', guide: 'Banja Luka', photo: 'photo-1717507885635-97387c6aa70d' },
  // Photo Wikimedia Commons « Panonsko jezero.JPG » (lacs Pannoniques de Tuzla), licence CC BY-SA 3.0 : crédit obligatoire.
  TZL: { names: ['Tuzla', 'Tuzla', 'Tuzla'], country: 'BA', guide: 'Tuzla', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Panonsko_jezero.JPG/960px-Panonsko_jezero.JPG', credit: 'Photo : Edinwiki, CC BY-SA 3.0, Wikimedia Commons' },
  SOF: { names: ['Sofia', 'Sofia', 'Sofia'], country: 'BG', guide: 'Sofia' },
  VAR: { names: ['Varna', 'Warna', 'Varna'], country: 'BG', photo: 'photo-1649932543745-44b164f84d08' },
  OHD: { names: ['Ohrid', 'Ohrid', 'Ohrid'], country: 'MK', guide: 'Ohrid', photo: 'photo-1653389167152-7dbd6d165631' },
  SKP: { names: ['Skopje', 'Skopje', 'Skopje'], country: 'MK', guide: 'Skopje', photo: 'photo-1642291373671-29794831ebce' },
  RMO: { names: ['Chișinău', 'Chișinău', 'Chișinău'], country: 'MD', photo: 'photo-1634105189055-fb60c68220ca' },
  TGD: { names: ['Podgorica', 'Podgorica', 'Podgorica'], country: 'ME', guide: 'Podgorica', photo: 'photo-1641899936619-b3cc3cfe2cbd' },
  POZ: { names: ['Poznań', 'Posen', 'Poznań'], country: 'PL', photo: 'photo-1712333423902-4c19b21ead6c' },
  WAW: { names: ['Varsovie', 'Warschau', 'Warsaw'], country: 'PL', guide: 'Varsovie' },
  WRO: { names: ['Wrocław', 'Breslau', 'Wrocław'], country: 'PL', photo: 'photo-1619985726413-812a90b9429f' },
  OTP: { names: ['Bucarest', 'Bukarest', 'Bucharest'], country: 'RO', guide: 'Bucarest' },
  CLJ: { names: ['Cluj-Napoca', 'Klausenburg', 'Cluj-Napoca'], country: 'RO', photo: 'photo-1622568987455-b53305e14b39' },
  TGM: { names: ['Târgu Mureș', 'Neumarkt am Mieresch', 'Târgu Mureș'], country: 'RO', photo: 'photo-1558203696-14dd22499dca' },
  BEG: { names: ['Belgrade', 'Belgrad', 'Belgrade'], country: 'RS', guide: 'Belgrade' },
  INI: { names: ['Niš', 'Niš', 'Niš'], country: 'RS', photo: 'photo-1652126252418-eccbbc8ea5e7' },
  BTS: { names: ['Bratislava', 'Bratislava', 'Bratislava'], country: 'SK', photo: 'photo-1716731312696-788b9c3b37ac' },
  // Pegasus (18/11/2026) : Istanbul Sabiha Gökçen
  SAW: { names: ['Istanbul', 'Istanbul', 'Istanbul'], country: 'TR', guide: 'Istanbul' },
  // Ryanair (18/11/2026)
  DUB: { names: ['Dublin', 'Dublin', 'Dublin'], country: 'IE', guide: 'Dublin' },
  STN: { names: ['Londres Stansted', 'London Stansted', 'London Stansted'], country: 'GB', guide: 'Londres' },
  ZAG: { names: ['Zagreb', 'Zagreb', 'Zagreb'], country: 'HR', guide: 'Zagreb' },
  // flydubai (19/11/2026) : vols à partir de juillet 2027
  DXB: { names: ['Dubaï', 'Dubai', 'Dubai'], country: 'AE', guide: 'Dubai' },
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

export type Compagnie = 'easyjet' | 'wizz' | 'pegasus' | 'ryanair' | 'flydubai';
export const NOM_COMPAGNIE: Record<Compagnie, string> = { easyjet: 'easyJet', wizz: 'Wizz Air', pegasus: 'Pegasus', ryanair: 'Ryanair', flydubai: 'flydubai' };

/** Recherche déjà remplie chez la compagnie (Bâle-Mulhouse, destination, dates, 1 adulte). */
export function lienVol(c: { code: string; depart: string; retour: string; cie: Compagnie }, lang: Lang): string {
  if (c.cie === 'wizz') {
    const loc = { fr: 'fr-fr', de: 'de-de', en: 'en-gb' }[lang];
    return `https://www.wizzair.com/${loc}/booking/select-flight/BSL/${c.code}/${c.depart}/${c.retour}/1/0/0/null`;
  }
  if (c.cie === 'ryanair') {
    const q = new URLSearchParams({ adults: '1', teens: '0', children: '0', infants: '0', dateOut: c.depart, dateIn: c.retour, isConnectedFlight: 'false', discount: '0', isReturn: 'true', originIata: 'BSL', destinationIata: c.code });
    const loc = { fr: 'fr/fr', de: 'de/de', en: 'gb/en' }[lang];
    return `https://www.ryanair.com/${loc}/trip/flights/select?${q}`;
  }
  if (c.cie === 'flydubai') {
    const d = (s: string) => s.replace(/-/g, '');
    return `https://m.flydubai.com/en/results/rt/a1c0i0/BSL_${c.code}/${d(c.depart)}_${d(c.retour)}?cabinClass=Economy&isOriginMetro=false&isDestMetro=false&pm=cash`;
  }
  if (c.cie === 'pegasus') {
    const q = new URLSearchParams({ language: lang, adultCount: '1', departurePort: 'BSL', arrivalPort: c.code, currency: 'EUR', dateOption: '1', departureDate: c.depart, returnDate: c.retour });
    return `https://web.flypgs.com/booking?${q}`;
  }
  const q = new URLSearchParams({ dep: 'BSL', dest: c.code, dd: c.depart, rd: c.retour, apax: '1', cpax: '0', ipax: '0', isOneWay: 'off' });
  return `https://www.easyjet.com/${lang}/buy/flights?${q}`;
}
