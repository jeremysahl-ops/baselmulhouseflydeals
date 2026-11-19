// Noms des destinations et des pays en allemand et en anglais. Le français vient de lib/destinations.ts.
// Clé = destination telle qu'en base. Chaque valeur : [ville, pays].
import { DESTINATIONS } from '@/lib/destinations';
import type { Lang } from './config';

type Names = { de: [string, string]; en: [string, string] };

const NAMES: Record<string, Names> = {
  'Agadir': { de: ['Agadir', 'Marokko'], en: ['Agadir', 'Morocco'] },
  'Alicante': { de: ['Alicante', 'Spanien'], en: ['Alicante', 'Spain'] },
  'Amsterdam': { de: ['Amsterdam', 'Niederlande'], en: ['Amsterdam', 'Netherlands'] },
  'Antalya': { de: ['Antalya', 'Türkei'], en: ['Antalya', 'Turkey'] },
  'Athenes': { de: ['Athen', 'Griechenland'], en: ['Athens', 'Greece'] },
  'Barcelone': { de: ['Barcelona', 'Spanien'], en: ['Barcelona', 'Spain'] },
  'Belgrade': { de: ['Belgrad', 'Serbien'], en: ['Belgrade', 'Serbia'] },
  'Berlin': { de: ['Berlin', 'Deutschland'], en: ['Berlin', 'Germany'] },
  'Bucarest': { de: ['Bukarest', 'Rumänien'], en: ['Bucharest', 'Romania'] },
  'Budapest': { de: ['Budapest', 'Ungarn'], en: ['Budapest', 'Hungary'] },
  'Casablanca': { de: ['Casablanca', 'Marokko'], en: ['Casablanca', 'Morocco'] },
  'Copenhague': { de: ['Kopenhagen', 'Dänemark'], en: ['Copenhagen', 'Denmark'] },
  'Cracovie': { de: ['Krakau', 'Polen'], en: ['Krakow', 'Poland'] },
  'Djerba': { de: ['Djerba', 'Tunesien'], en: ['Djerba', 'Tunisia'] },
  'Dublin': { de: ['Dublin', 'Irland'], en: ['Dublin', 'Ireland'] },
  'Dubrovnik': { de: ['Dubrovnik', 'Kroatien'], en: ['Dubrovnik', 'Croatia'] },
  'Edimbourg': { de: ['Edinburgh', 'Vereinigtes Königreich'], en: ['Edinburgh', 'United Kingdom'] },
  'Faro': { de: ['Faro', 'Portugal'], en: ['Faro', 'Portugal'] },
  'Fuerteventura': { de: ['Fuerteventura', 'Spanien'], en: ['Fuerteventura', 'Spain'] },
  'Grande Canarie': { de: ['Gran Canaria', 'Spanien'], en: ['Gran Canaria', 'Spain'] },
  'Hambourg': { de: ['Hamburg', 'Deutschland'], en: ['Hamburg', 'Germany'] },
  'Heraklion': { de: ['Heraklion', 'Griechenland'], en: ['Heraklion', 'Greece'] },
  'Hurghada': { de: ['Hurghada', 'Ägypten'], en: ['Hurghada', 'Egypt'] },
  'Ibiza': { de: ['Ibiza', 'Spanien'], en: ['Ibiza', 'Spain'] },
  'Istanbul': { de: ['Istanbul', 'Türkei'], en: ['Istanbul', 'Turkey'] },
  'Lanzarote': { de: ['Lanzarote', 'Spanien'], en: ['Lanzarote', 'Spain'] },
  'Lisbonne': { de: ['Lissabon', 'Portugal'], en: ['Lisbon', 'Portugal'] },
  'Londres': { de: ['London', 'Vereinigtes Königreich'], en: ['London', 'United Kingdom'] },
  'Madrid': { de: ['Madrid', 'Spanien'], en: ['Madrid', 'Spain'] },
  'Malaga': { de: ['Málaga', 'Spanien'], en: ['Málaga', 'Spain'] },
  'Manchester': { de: ['Manchester', 'Vereinigtes Königreich'], en: ['Manchester', 'United Kingdom'] },
  'Marrakech': { de: ['Marrakesch', 'Marokko'], en: ['Marrakech', 'Morocco'] },
  'Marseille': { de: ['Marseille', 'Frankreich'], en: ['Marseille', 'France'] },
  'Munich': { de: ['München', 'Deutschland'], en: ['Munich', 'Germany'] },
  'Mykonos': { de: ['Mykonos', 'Griechenland'], en: ['Mykonos', 'Greece'] },
  'Naples': { de: ['Neapel', 'Italien'], en: ['Naples', 'Italy'] },
  'Nice': { de: ['Nizza', 'Frankreich'], en: ['Nice', 'France'] },
  'Oslo': { de: ['Oslo', 'Norwegen'], en: ['Oslo', 'Norway'] },
  'Palma de Mallorca': { de: ['Palma de Mallorca', 'Spanien'], en: ['Palma de Mallorca', 'Spain'] },
  'Paris': { de: ['Paris', 'Frankreich'], en: ['Paris', 'France'] },
  'Porto': { de: ['Porto', 'Portugal'], en: ['Porto', 'Portugal'] },
  'Prague': { de: ['Prag', 'Tschechien'], en: ['Prague', 'Czechia'] },
  'Rhodes': { de: ['Rhodos', 'Griechenland'], en: ['Rhodes', 'Greece'] },
  'Rome': { de: ['Rom', 'Italien'], en: ['Rome', 'Italy'] },
  'Sofia': { de: ['Sofia', 'Bulgarien'], en: ['Sofia', 'Bulgaria'] },
  'Split': { de: ['Split', 'Kroatien'], en: ['Split', 'Croatia'] },
  'Tenerife': { de: ['Teneriffa', 'Spanien'], en: ['Tenerife', 'Spain'] },
  'Tunis': { de: ['Tunis', 'Tunesien'], en: ['Tunis', 'Tunisia'] },
  'Varsovie': { de: ['Warschau', 'Polen'], en: ['Warsaw', 'Poland'] },
  'Venise': { de: ['Venedig', 'Italien'], en: ['Venice', 'Italy'] },
  'Vienne': { de: ['Wien', 'Österreich'], en: ['Vienna', 'Austria'] },
  'Zagreb': { de: ['Zagreb', 'Kroatien'], en: ['Zagreb', 'Croatia'] },
  'Ajaccio': { de: ['Ajaccio', 'Frankreich'], en: ['Ajaccio', 'France'] },
  'Bastia': { de: ['Bastia', 'Frankreich'], en: ['Bastia', 'France'] },
  'Calvi': { de: ['Calvi', 'Frankreich'], en: ['Calvi', 'France'] },
  'Figari': { de: ['Figari', 'Frankreich'], en: ['Figari', 'France'] },
  'Biarritz': { de: ['Biarritz', 'Frankreich'], en: ['Biarritz', 'France'] },
  'Bordeaux': { de: ['Bordeaux', 'Frankreich'], en: ['Bordeaux', 'France'] },
  'Lille': { de: ['Lille', 'Frankreich'], en: ['Lille', 'France'] },
  'Montpellier': { de: ['Montpellier', 'Frankreich'], en: ['Montpellier', 'France'] },
  'Nantes': { de: ['Nantes', 'Frankreich'], en: ['Nantes', 'France'] },
  'Toulouse': { de: ['Toulouse', 'Frankreich'], en: ['Toulouse', 'France'] },
  'Bilbao': { de: ['Bilbao', 'Spanien'], en: ['Bilbao', 'Spain'] },
  'Saint-Jacques-de-Compostelle': { de: ['Santiago de Compostela', 'Spanien'], en: ['Santiago de Compostela', 'Spain'] },
  'Seville': { de: ['Sevilla', 'Spanien'], en: ['Seville', 'Spain'] },
  'Valence': { de: ['Valencia', 'Spanien'], en: ['Valencia', 'Spain'] },
  'Minorque': { de: ['Menorca', 'Spanien'], en: ['Menorca', 'Spain'] },
  'La Palma': { de: ['La Palma', 'Spanien'], en: ['La Palma', 'Spain'] },
  'Madere': { de: ['Madeira', 'Portugal'], en: ['Madeira', 'Portugal'] },
  'Malte': { de: ['Malta', 'Malta'], en: ['Malta', 'Malta'] },
  'Larnaca': { de: ['Larnaka', 'Zypern'], en: ['Larnaca', 'Cyprus'] },
  'Reykjavik': { de: ['Reykjavík', 'Island'], en: ['Reykjavik', 'Iceland'] },
  'Bari': { de: ['Bari', 'Italien'], en: ['Bari', 'Italy'] },
  'Brindisi': { de: ['Brindisi', 'Italien'], en: ['Brindisi', 'Italy'] },
  'Cagliari': { de: ['Cagliari', 'Italien'], en: ['Cagliari', 'Italy'] },
  'Catane': { de: ['Catania', 'Italien'], en: ['Catania', 'Italy'] },
  'Lamezia Terme': { de: ['Lamezia Terme', 'Italien'], en: ['Lamezia Terme', 'Italy'] },
  'Olbia': { de: ['Olbia', 'Italien'], en: ['Olbia', 'Italy'] },
  'Palerme': { de: ['Palermo', 'Italien'], en: ['Palermo', 'Italy'] },
  'Pantelleria': { de: ['Pantelleria', 'Italien'], en: ['Pantelleria', 'Italy'] },
  'Rimini': { de: ['Rimini', 'Italien'], en: ['Rimini', 'Italy'] },
  'Bristol': { de: ['Bristol', 'Vereinigtes Königreich'], en: ['Bristol', 'United Kingdom'] },
  'Corfou': { de: ['Korfu', 'Griechenland'], en: ['Corfu', 'Greece'] },
  'La Canee': { de: ['Chania', 'Griechenland'], en: ['Chania', 'Greece'] },
  'Kos': { de: ['Kos', 'Griechenland'], en: ['Kos', 'Greece'] },
  'Thessalonique': { de: ['Thessaloniki', 'Griechenland'], en: ['Thessaloniki', 'Greece'] },
  'Pula': { de: ['Pula', 'Kroatien'], en: ['Pula', 'Croatia'] },
  'Zadar': { de: ['Zadar', 'Kroatien'], en: ['Zadar', 'Croatia'] },
  'Enfidha-Hammamet': { de: ['Enfidha-Hammamet', 'Tunesien'], en: ['Enfidha-Hammamet', 'Tunisia'] },
  'Tanger': { de: ['Tanger', 'Marokko'], en: ['Tangier', 'Morocco'] },
  'Dubai': { de: ['Dubai', 'Vereinigte Arabische Emirate'], en: ['Dubai', 'United Arab Emirates'] },
  'Pristina': { de: ['Pristina', 'Kosovo'], en: ['Pristina', 'Kosovo'] },
  'Sarajevo': { de: ['Sarajevo', 'Bosnien und Herzegowina'], en: ['Sarajevo', 'Bosnia and Herzegovina'] },
  'Tivat': { de: ['Tivat', 'Montenegro'], en: ['Tivat', 'Montenegro'] },
  'Tirana': { de: ['Tirana', 'Albanien'], en: ['Tirana', 'Albania'] },
  'Banja Luka': { de: ['Banja Luka', 'Bosnien und Herzegowina'], en: ['Banja Luka', 'Bosnia and Herzegovina'] },
  'Tuzla': { de: ['Tuzla', 'Bosnien und Herzegowina'], en: ['Tuzla', 'Bosnia and Herzegovina'] },
  'Ohrid': { de: ['Ohrid', 'Nordmazedonien'], en: ['Ohrid', 'North Macedonia'] },
  'Skopje': { de: ['Skopje', 'Nordmazedonien'], en: ['Skopje', 'North Macedonia'] },
  'Podgorica': { de: ['Podgorica', 'Montenegro'], en: ['Podgorica', 'Montenegro'] },
};

/** Nom de la ville dans la langue demandée (à défaut : le nom français, puis la clé). */
export function localizedLabel(destination: string, lang: Lang): string {
  if (lang !== 'fr') {
    const n = NAMES[destination]?.[lang];
    if (n) return n[0];
  }
  return DESTINATIONS[destination]?.label ?? destination;
}

/** Nom du pays dans la langue demandée, ou null si la destination est inconnue. */
export function localizedCountry(destination: string, lang: Lang): string | null {
  if (lang !== 'fr') {
    const n = NAMES[destination]?.[lang];
    if (n) return n[1];
  }
  return DESTINATIONS[destination]?.country ?? null;
}

/** Destinations sans traduction (contrôle). */
export function untranslatedDestinations(): string[] {
  return Object.keys(DESTINATIONS).filter((d) => !NAMES[d]);
}
