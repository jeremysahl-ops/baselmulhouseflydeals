// Vignette d'une destination : photo (ou étiquette BSL → code), nom, pays et prix « dès … ».
import Link from 'next/link';
import AirportVisual from '@/components/AirportVisual';
import { AIRPORTS, airportCountry, airportName, airportSlug } from '@/lib/airports';
import { formatPrice } from '@/lib/format';
import { getDict, localePath, type Lang } from '@/lib/i18n';

export default function DestinationTile({
  code,
  lang,
  price,
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
}: {
  code: string;
  lang: Lang;
  price?: number | null;
  priority?: boolean;
  sizes?: string;
}) {
  const t = getDict(lang).destinations;
  return (
    <Link href={localePath(lang, `/vols/${airportSlug(code)}`)} className="group relative block aspect-[4/3] overflow-hidden rounded-lg bg-board">
      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
        <AirportVisual code={code} lang={lang} sizes={sizes} width={600} priority={priority} />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-3 pt-10">
        <p className="display text-2xl text-white">{airportName(code, lang)}</p>
        <p className="font-board text-[11px] uppercase tracking-wider text-white/75">
          {code} · {airportCountry(code, lang)}
        </p>
      </div>
      {price != null ? (
        <span className="flap absolute right-3 top-3 !bg-board/90 text-sm">{t.from(formatPrice(price, lang))}</span>
      ) : AIRPORTS[code]?.sansReleve ? (
        <span className="absolute right-3 top-3 rounded bg-board/90 px-2 py-0.5 font-board text-[11px] text-flap">{t.onRequest}</span>
      ) : (
        <span className="absolute right-3 top-3 rounded bg-black/50 px-2 py-0.5 font-board text-[11px] text-white/85">{t.pending}</span>
      )}
    </Link>
  );
}
