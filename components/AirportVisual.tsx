import Image from 'next/image';
import { AIRPORTS, airportName } from '@/lib/airports';
import { destinationPhoto } from '@/lib/format';
import { getDict, type Lang } from '@/lib/i18n';

/**
 * Visuel d'une destination : la photo contrôlée de son guide, ou à défaut sa propre photo (lib/airports.ts),
 * sinon une étiquette façon panneau des départs (BSL → code). Jamais la photo d'une autre ville.
 */
export default function AirportVisual({
  code,
  lang,
  sizes,
  width = 800,
  priority = false,
}: {
  code: string;
  lang: Lang;
  sizes: string;
  width?: number;
  priority?: boolean;
}) {
  const guide = AIRPORTS[code]?.guide;
  const propre = AIRPORTS[code]?.photo;
  const photo = guide
    ? destinationPhoto(guide, width)
    : propre
      ? `https://images.unsplash.com/${propre}?auto=format&fit=crop&w=${width}&q=70`
      : null;
  const label = airportName(code, lang);

  if (photo) {
    return (
      <Image
        src={photo}
        alt={getDict(lang).card.photoAlt(label)}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        unoptimized
      />
    );
  }
  return (
    <div className="absolute inset-0 flex flex-col justify-center bg-board px-5 font-board text-board-text" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 400 250" preserveAspectRatio="none" fill="none">
        <path d="M-10 210 C 120 60, 260 60, 410 150" stroke="#ffc72c" strokeWidth="1.5" strokeDasharray="5 7" />
      </svg>
      <p className="relative flex items-baseline gap-3 font-bold">
        <span className="text-lg text-board-dim">BSL</span>
        <span className="text-flap">→</span>
        <span className="text-4xl tracking-wider text-flap">{code}</span>
      </p>
    </div>
  );
}
