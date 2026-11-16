// Vignette d'un mois : une photo d'ambiance de saison (Unsplash, regardée une par une le 17/11/2026),
// le nom du mois, le prix le plus bas trouvé et le nombre de destinations.
import Image from 'next/image';
import Link from 'next/link';
import { formatMonth, formatPrice } from '@/lib/format';
import type { Combo } from '@/lib/prix';
import { getDict, localePath, type Lang } from '@/lib/i18n';

/** Photo d'ambiance par mois (01 = janvier). */
const PHOTOS: Record<string, string> = {
  '01': 'photo-1550503736-c1a2c9033c03', // chalets sous la neige
  '02': 'photo-1533022586528-2e09bde0959b', // masques de carnaval
  '03': 'photo-1614107706698-b1c78675ff1c', // amandier en fleur
  '04': 'photo-1774479341808-def72e8236ac', // champ de tulipes
  '05': 'photo-1527615532814-540d0d97d938', // coquelicots
  '06': 'photo-1499002238440-d264edd596ec', // lavande au coucher du soleil
  '07': 'photo-1544536871-6e891baa163f', // plage turquoise
  '08': 'photo-1507525428034-b723cf961d3e', // plage au soleil couchant
  '09': 'photo-1603314947668-e8372e0075ad', // vendanges
  '10': 'photo-1523712999610-f77fbcfc3843', // forêt d'automne
  '11': 'photo-1575657695080-a5a861859078', // allée d'automne le soir
  '12': 'photo-1544212415-85fec3f52087', // carrousel de marché de Noël
};

export default function MonthTile({ mois, combos, lang, big = false }: { mois: string; combos: Combo[]; lang: Lang; big?: boolean }) {
  const t = getDict(lang).home;
  const from = combos[0]?.prix ?? null;
  const villes = new Set(combos.map((c) => c.code)).size;
  const photo = PHOTOS[mois.slice(5, 7)];
  return (
    <Link href={localePath(lang, `/mois/${mois}`)} className="group relative block aspect-[4/5] overflow-hidden rounded-lg bg-board">
      {photo && (
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
          <Image
            src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=500&h=625&q=70`}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
            className="object-cover"
            unoptimized
          />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/5 to-black/75" aria-hidden="true" />
      <p className={`display absolute left-3 top-3 text-white ${big ? 'text-3xl' : 'text-2xl'}`}>{formatMonth(mois, lang).replace(/ \d{4}$/, '')}</p>
      <p className="absolute right-3 top-4 font-board text-[11px] text-white/80">{mois.slice(0, 4)}</p>
      <div className="absolute inset-x-3 bottom-3">
        {from != null && <span className={`flap !bg-board/90 ${big ? 'text-2xl' : 'text-lg'}`}>{t.monthFrom(formatPrice(from, lang))}</span>}
        <p className="mt-1.5 font-board text-[11px] text-white/85">{t.monthCities(villes)}</p>
      </div>
    </Link>
  );
}
