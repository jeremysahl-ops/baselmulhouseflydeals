const KIWI_AFFILIATE_LINK = 'https://kiwi.tpx.gr/zKjbks7V';

const DESTINATION_IATA: Record<string, string> = {
  barcelone: 'BCN', madrid: 'MAD', malaga: 'AGP', alicante: 'ALC',
  ibiza: 'IBZ', majorque: 'PMI', 'palma de mallorca': 'PMI',
  tenerife: 'TFS', fuerteventura: 'FUE', lanzarote: 'ACE',
  'grande canarie': 'LPA', lisbonne: 'LIS', porto: 'OPO', faro: 'FAO',
  rome: 'FCO', naples: 'NAP', venise: 'VCE', athenes: 'ATH',
  heraklion: 'HER', rhodes: 'RHO', mykonos: 'JMK', paris: 'CDG',
  nice: 'NCE', marseille: 'MRS', berlin: 'BER', munich: 'MUC',
  hambourg: 'HAM', londres: 'LHR', manchester: 'MAN', edimbourg: 'EDI',
  amsterdam: 'AMS', dubrovnik: 'DBV', split: 'SPU', zagreb: 'ZAG',
  dublin: 'DUB', istanbul: 'IST', antalya: 'AYT', marrakech: 'RAK',
  casablanca: 'CMN', agadir: 'AGA', tunis: 'TUN', djerba: 'DJE',
  hurghada: 'HRG', vienne: 'VIE', budapest: 'BUD', prague: 'PRG',
  oslo: 'OSL', copenhague: 'CPH', reykjavik: 'KEF',
  varsovie: 'WAW', cracovie: 'KRK', bucarest: 'OTP', sofia: 'SOF',
  belgrade: 'BEG', dubai: 'DXB', 'tel aviv': 'TLV', montreal: 'YUL',
};

export function buildAffiliateLink(
  originalLink: string | null | undefined,
  destination: string,
  departureDate?: string | null
): string {
  if (originalLink && originalLink !== '#') return originalLink;
  
  const iata = DESTINATION_IATA[destination.toLowerCase()];
  if (iata && departureDate) {
    const date = departureDate.replace(/-/g, '');
    return `https://www.kiwi.com/fr/search/results/bsl/${iata}/${date}/no-return?affilid=707798`;
  }
  
  return KIWI_AFFILIATE_LINK;
}