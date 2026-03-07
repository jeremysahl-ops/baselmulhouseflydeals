const KIWI_AFFILIATE_LINK = 'https://kiwi.tpx.gr/zKjbks7V';
const KIWI_AFFILID = '707798';

const DESTINATION_KIWI: Record<string, string> = {
  barcelone: 'BCN',
  madrid: 'MAD',
  malaga: 'AGP',
  alicante: 'ALC',
  ibiza: 'IBZ',
  majorque: 'PMI',
  'palma de mallorca': 'PMI',
  tenerife: 'TFS',
  fuerteventura: 'FUE',
  lanzarote: 'ACE',
  'grande canarie': 'LPA',
  lisbonne: 'LIS',
  porto: 'OPO',
  faro: 'FAO',
  rome: 'ROM',
  naples: 'NAP',
  venise: 'VCE',
  athenes: 'ATH',
  heraklion: 'HER',
  rhodes: 'RHO',
  mykonos: 'JMK',
  paris: 'PAR',
  nice: 'NCE',
  marseille: 'MRS',
  berlin: 'BER',
  munich: 'MUC',
  hambourg: 'HAM',
  londres: 'LON',
  manchester: 'MAN',
  edimbourg: 'EDI',
  amsterdam: 'AMS',
  dubrovnik: 'DBV',
  split: 'SPU',
  zagreb: 'ZAG',
  dublin: 'DUB',
  istanbul: 'IST',
  antalya: 'AYT',
  marrakech: 'RAK',
  casablanca: 'CMN',
  agadir: 'AGA',
  tunis: 'TUN',
  djerba: 'DJE',
  hurghada: 'HRG',
  vienne: 'VIE',
  budapest: 'BUD',
  prague: 'PRG',
  oslo: 'OSL',
  copenhague: 'CPH',
  reykjavik: 'REK',
  varsovie: 'WAW',
  cracovie: 'KRK',
  bucarest: 'OTP',
  sofia: 'SOF',
  belgrade: 'BEG',
  dubai: 'DXB',
  'tel aviv': 'TLV',
  montreal: 'YMQ',
};

function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

export function buildAffiliateLink(
  originalLink: string | null | undefined,
  destination: string,
  departureDate?: string | null,
  returnDate?: string | null
): string {
  const iata = DESTINATION_KIWI[destination.toLowerCase()];
  
  if (iata && departureDate) {
    const retDate = returnDate ?? addDays(departureDate, 7);
    return `https://www.kiwi.com/fr/search/results/BSL/${iata}/${departureDate}/${retDate}/?affilid=${KIWI_AFFILID}`;
  }
  
  if (iata) {
    return `https://www.kiwi.com/fr/search/results/BSL/${iata}/anytime/anytime/?affilid=${KIWI_AFFILID}`;
  }
  
  return KIWI_AFFILIATE_LINK;
}