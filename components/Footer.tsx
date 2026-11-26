import Link from 'next/link';
import Logo from '@/components/Logo';
import { SECTIONS, SITE } from '@/lib/site';
import { getDict, localePath, type Lang } from '@/lib/i18n';

export default function Footer({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const href = (path: string) => localePath(lang, path);
  return (
    <footer className="mt-24 bg-brand text-white/70">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo tone="light" lang={lang} />
          <p className="mt-5 text-sm font-medium text-white">{t.common.tagline}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed">{t.footer.about(t.place.airport)}</p>
        </div>

        <nav aria-label={t.footer.dealsAria}>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-white">{t.footer.dealsHeading}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href={href('/prix')} className="hover:text-white">{t.footer.allDeals}</Link></li>
            <li><Link href={href('/mois')} className="hover:text-white">{t.footer.byMonth}</Link></li>
            {SECTIONS.map((s) => (
              <li key={s.slug}><Link href={href(`/${s.slug}`)} className="hover:text-white">{t.sections[s.slug].label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.footer.infoHeading}>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-white">{t.footer.infoHeading}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href={href('/destinations')} className="hover:text-white">{t.footer.guides}</Link></li>
            <li><Link href={href('/euroairport')} className="hover:text-white">EuroAirport</Link></li>
            <li><Link href={href('/comment-ca-marche')} className="hover:text-white">{t.footer.method}</Link></li>
            <li><Link href={href('/partenaires')} className="hover:text-white">{t.footer.partner}</Link></li>
            <li><Link href={href('/mentions-legales')} className="hover:text-white">{t.footer.legal}</Link></li>
            <li><Link href={href('/confidentialite')} className="hover:text-white">{t.footer.privacy}</Link></li>
            <li><a href={`mailto:${SITE.contactEmail}`} className="hover:text-white">{t.footer.contact}</a></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/60 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <p>© {new Date().getFullYear()} {SITE.name}. {t.footer.madeIn}</p>
          <p className="max-w-2xl sm:text-right">{t.footer.affiliateNote}</p>
        </div>
      </div>
    </footer>
  );
}
