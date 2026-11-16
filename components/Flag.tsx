// Petits drapeaux des langues du site, dessinés en SVG (les émojis drapeaux ne s'affichent pas sous Windows).
import type { Lang } from '@/lib/i18n/config';

export default function Flag({ lang, className = 'h-3.5 w-5' }: { lang: Lang; className?: string }) {
  const common = { className: `${className} shrink-0 rounded-[2px] ring-1 ring-black/10`, 'aria-hidden': true as const, viewBox: '0 0 30 20' };
  if (lang === 'fr')
    return (
      <svg {...common}>
        <rect width="10" height="20" fill="#0055a4" />
        <rect x="10" width="10" height="20" fill="#fff" />
        <rect x="20" width="10" height="20" fill="#ef4135" />
      </svg>
    );
  if (lang === 'de')
    return (
      <svg {...common}>
        <rect width="30" height="6.67" fill="#000" />
        <rect y="6.67" width="30" height="6.67" fill="#dd0000" />
        <rect y="13.33" width="30" height="6.67" fill="#ffce00" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect width="30" height="20" fill="#012169" />
      <path d="M0 0 30 20M30 0 0 20" stroke="#fff" strokeWidth="4" />
      <path d="M0 0 30 20M30 0 0 20" stroke="#c8102e" strokeWidth="1.6" />
      <path d="M15 0v20M0 10h30" stroke="#fff" strokeWidth="6" />
      <path d="M15 0v20M0 10h30" stroke="#c8102e" strokeWidth="3.4" />
    </svg>
  );
}
