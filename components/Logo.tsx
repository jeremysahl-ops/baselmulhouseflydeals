import Link from 'next/link';

/** Logotype : un avion en papier (trait) + le nom. Pas d'image externe, net à toutes les tailles. */
export default function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const main = tone === 'dark' ? 'text-brand' : 'text-white';
  const sub = tone === 'dark' ? 'text-ink-muted' : 'text-white/60';
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="FlyBSL, accueil">
      <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${tone === 'dark' ? 'bg-brand text-white' : 'bg-white text-brand'}`}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21.5 2.5 10.2 13.8" />
          <path d="M21.5 2.5 14.6 21.2l-4.4-7.4-7.4-4.4L21.5 2.5Z" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`block text-[19px] font-extrabold tracking-tight ${main}`}>
          Fly<span className="text-action">BSL</span>
        </span>
        <span className={`mt-1 block text-[9px] font-semibold uppercase tracking-[0.18em] ${sub}`}>Deals · 3 frontières</span>
      </span>
    </Link>
  );
}
