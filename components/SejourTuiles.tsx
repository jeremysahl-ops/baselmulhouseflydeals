// Tuiles « Pour ton séjour » : la photo de la ville en fond, une grande icône par usage (dormir, visiter,
// rejoindre l'hôtel) et un bouton jaune façon panneau des départs.
import AirportVisual from '@/components/AirportVisual';
import { liensSejour, NOM_PARTENAIRE, type Partenaire } from '@/lib/sejour-liens';
import { getDict, type Lang } from '@/lib/i18n';

const ICONES: Record<Partenaire, React.ReactNode> = {
  booking: (
    <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M3 18v2M21 18v2M6 10V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3M12 10V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
  ),
  getyourguide: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  kiwitaxi: (
    <>
      <path d="M5 16h14l-1.5-5.5A2 2 0 0 0 15.6 9H8.4a2 2 0 0 0-1.9 1.5L5 16Z" />
      <path d="M4 16h16v3H4zM7 19v1.5M17 19v1.5M9 9l.8-3h4.4l.8 3" />
    </>
  ),
};

export default function SejourTuiles({ code, lang }: { code: string; lang: Lang }) {
  const t = getDict(lang).pourTonSejour;
  const liens = liensSejour(code, lang);
  return (
    <>
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {liens.map((l) => (
          <li key={l.partenaire}>
            <a
              href={l.url}
              target="_blank"
              rel={l.affilie ? 'sponsored nofollow noopener' : 'nofollow noopener'}
              className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-xl bg-board p-5 text-white shadow-lg"
            >
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.05]">
                <AirportVisual code={code} lang={lang} sizes="(max-width: 640px) 100vw, 33vw" width={700} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-board via-board/70 to-board/20" aria-hidden="true" />
              <svg
                className="absolute right-4 top-4 h-12 w-12 text-flap drop-shadow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {ICONES[l.partenaire]}
              </svg>
              <span className="relative display text-3xl">{t.boutons[l.partenaire].titre}</span>
              <span className="relative text-sm text-white/85">{t.boutons[l.partenaire].detail}</span>
              <span className="relative mt-4 inline-flex w-fit items-center gap-1 rounded-md bg-flap px-3 py-1.5 text-sm font-bold text-ink transition group-hover:brightness-110">
                {t.via(NOM_PARTENAIRE[l.partenaire])}
              </span>
            </a>
          </li>
        ))}
      </ul>
      {liens.some((l) => l.affilie) && <p className="mt-3 text-xs text-ink-muted">{t.mention}</p>}
    </>
  );
}
