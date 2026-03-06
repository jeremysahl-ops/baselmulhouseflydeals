const KIWI_AFFILIATE_LINK = 'https://kiwi.tpx.gr/zKjbks7V';
const KIWI_AFFILID = '707798';

const DESTINATION_KIWI: Record<string, string> = {
  barcelone: 'barcelone-espagne',
  madrid: 'madrid-espagne',
  malaga: 'malaga-espagne',
  alicante: 'alicante-espagne',
  ibiza: 'ibiza-espagne',
  majorque: 'palma-de-majorque-espagne',
  'palma de mallorca': 'palma-de-majorque-espagne',
  tenerife: 'tenerife-espagne',
  fuerteventura: 'fuerteventura-espagne',
  lanzarote: 'lanzarote-espagne',
  'grande canarie': 'las-palmas-espagne',
  lisbonne: 'lisbonne-portugal',
  porto: 'porto-portugal',
  faro: 'faro-portugal',
  rome: 'rome-italie',
  naples: 'naples-italie',
  venise: 'venise-italie',
  athenes: 'athenes-grece',
  heraklion: 'heraklion-grece',
  rhodes: 'rhodes-grece',
  mykonos: 'mykonos-grece',
  paris: 'paris-france',
  nice: 'nice-france',
  marseille: 'marseille-france',
  berlin: 'berlin-allemagne',
  munich: 'munich-allemagne',
  hambourg: 'hambourg-allemagne',
  londres: 'londres-royaume-uni',
  manchester: 'manchester-royaume-uni',
  edimbourg: 'edimbourg-royaume-uni',
  amsterdam: 'amsterdam-pays-bas',
  dubrovnik: 'dubrovnik-croatie',
  split: 'split-croatie',
  zagreb: 'zagreb-croatie',
  dublin: 'dublin-irlande',
  istanbul: 'istanbul-turquie',
  antalya: 'antalya-turquie',
  marrakech: 'marrakech-maroc',
  casablanca: 'casablanca-maroc',
  agadir: 'agadir-maroc',
  tunis: 'tunis-tunisie',
  djerba: 'djerba-tunisie',
  hurghada: 'hurghada-egypte',
  vienne: 'vienne-autriche',
  budapest: 'budapest-hongrie',
  prague: 'prague-republique-tcheque',
  oslo: 'oslo-norvege',
  copenhague: 'copenhague-danemark',
  reykjavik: 'reykjavik-islande',
  varsovie: 'varsovie-pologne',
  cracovie: 'cracovie-pologne',
  bucarest: 'bucarest-roumanie',
  sofia: 'sofia-bulgarie',
  belgrade: 'belgrade-serbie',
  dubai: 'dubai-emirats-arabes-unis',
  'tel aviv': 'tel-aviv-israel',
  montreal: 'montreal-canada',
  'new york': 'new-york-etats-unis',
  singapour: 'singapour-singapour',
};

export function buildAffiliateLink(
  originalLink: string | null | undefined,
  destination: string,
  departureDate?: string | null
): string {
  const slug = DESTINATION_KIWI[destination.toLowerCase()];

  if (slug && departureDate) {
    return `https://www.kiwi.com/fr/search/results/bale-suisse/${slug}/${departureDate}/no-return/?affilid=${KIWI_AFFILID}`;
  }

  if (slug) {
    return `https://www.kiwi.com/fr/search/results/bale-suisse/${slug}/anytime/no-return/?affilid=${KIWI_AFFILID}`;
  }

  return KIWI_AFFILIATE_LINK;
}