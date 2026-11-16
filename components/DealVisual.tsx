import Image from 'next/image';
import { DESTINATIONS } from '@/lib/destinations';
import { destinationLabel, destinationPhoto } from '@/lib/format';
import { getDict, type Lang } from '@/lib/i18n';

/**
 * Visuel d'un deal : la photo de la destination quand on en a une contrôlée, sinon une vignette
 * « carte d'embarquement » (BSL → code de l'aéroport). On n'affiche jamais la photo d'une autre ville.
 */
export default function DealVisual({
  destination,
  lang,
  sizes,
  priority = false,
  width = 800,
}: {
  destination: string;
  lang: Lang;
  sizes: string;
  priority?: boolean;
  width?: number;
}) {
  const photo = destinationPhoto(destination, width);
  const t = getDict(lang);
  const label = destinationLabel(destination, lang);

  if (photo) {
    return (
      <Image
        src={photo}
        alt={t.card.photoAlt(label)}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        unoptimized /* Unsplash sert déjà l'image à la bonne taille */
      />
    );
  }

  const iata = DESTINATIONS[destination]?.iata;
  return (
    <div
      className="absolute inset-0 flex flex-col justify-between bg-gradient-to-br from-brand via-[#123a6b] to-[#1c5a94] p-5 text-white"
      aria-hidden="true"
    >
      {/* trajectoire en pointillés */}
      <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 400 250" preserveAspectRatio="none" fill="none">
        <path d="M-10 210 C 120 60, 260 60, 410 150" stroke="white" strokeWidth="1.5" strokeDasharray="5 7" />
      </svg>
      <p className="relative text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">{t.card.direct}</p>
      <div className="relative">
        <p className="flex items-baseline gap-3 font-bold tracking-wide">
          <span className="text-xl text-white/60">BSL</span>
          <svg viewBox="0 0 24 24" className="h-4 w-4 self-center text-white/60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12h16m-6-6 6 6-6 6" />
          </svg>
          <span className="text-4xl">{iata ?? label}</span>
        </p>
        <p className="mt-1 text-sm font-medium text-white/75">{t.card.routeLine(t.place.city, label)}</p>
      </div>
    </div>
  );
}
