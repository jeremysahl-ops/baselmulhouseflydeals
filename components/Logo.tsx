import Link from 'next/link';
import { getDict, localePath, type Lang } from '@/lib/i18n';

/** Logotype façon étiquette de panneau des départs : « FLY » + le code de l'aéroport en jaune. */
export default function Logo({ tone = 'dark', lang }: { tone?: 'dark' | 'light'; lang: Lang }) {
  const t = getDict(lang);
  const sub = tone === 'dark' ? 'text-ink-muted' : 'text-white/60';
  return (
    <Link href={localePath(lang, '/')} className="flex items-center gap-3" aria-label={t.common.logoAria}>
      <span className={`rounded-md px-2.5 py-1.5 font-board text-lg font-bold leading-none tracking-wider ${tone === 'dark' ? 'bg-board text-board-text' : 'bg-white/10 text-white'}`}>
        FLY<span className="text-flap">BSL</span>
      </span>
      <span className={`hidden whitespace-nowrap font-board text-[10px] font-semibold uppercase leading-tight tracking-[0.18em] sm:block ${sub}`}>
        {t.common.logoSub}
      </span>
    </Link>
  );
}
