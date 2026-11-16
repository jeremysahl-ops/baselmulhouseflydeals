import Link from 'next/link';
import { getDeals } from '@/lib/supabase';
import DealExplorer from '@/components/DealExplorer';
import NewsletterForm from '@/components/NewsletterForm';
import PartnerCard from '@/components/PartnerCard';
import { partnersForHome } from '@/lib/partners';
import HotelPickCard from '@/components/HotelPickCard';
import { activeHotelPicks } from '@/lib/hotel-picks';
import { formatPrice, formatStamp, saving } from '@/lib/format';
import { SECTIONS, SITE } from '@/lib/site';
import { getDict, localePath } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

export const revalidate = 600;

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await langParam(params);
  const dict = getDict(lang);
  const t = dict.home;
  const deals = await getDeals();
  const partners = partnersForHome();
  const hotelPicks = activeHotelPicks();
  const best = deals.reduce((max, d) => Math.max(max, saving(d)?.percent ?? 0), 0);
  const cheapest = deals.reduce((min, d) => Math.min(min, d.price), Infinity);
  const updated = deals.reduce((latest, d) => (d.created_at > latest ? d.created_at : latest), '');
  const steps = t.steps(SITE.minDiscount, SITE.bookingPartner);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: t.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };

  return (
    <>
      <section className="bg-brand text-white">
        <div className="container-page grid gap-10 py-14 md:py-20 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{dict.common.tagline}</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">{t.h1(dict.place.city)}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">{t.lead(SITE.minDiscount)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#deals" className="btn-primary">{t.ctaDeals}</a>
              <Link href={localePath(lang, '/comment-ca-marche')} className="btn-secondary !border-white/25 !bg-transparent !text-white hover:!border-white/60">
                {t.ctaMethod}
              </Link>
            </div>
          </div>

          {deals.length > 0 && (
            <dl className="grid grid-cols-3 divide-x divide-white/10 rounded-xl border border-white/10 bg-white/5 text-center lg:grid-cols-1 lg:divide-x-0 lg:divide-y lg:text-left">
              <div className="px-4 py-5 lg:px-6">
                <dt className="text-xs font-medium uppercase tracking-wider text-white/55">{t.statDeals}</dt>
                <dd className="mt-1 whitespace-nowrap text-2xl font-bold sm:text-3xl">{deals.length}</dd>
              </div>
              <div className="px-4 py-5 lg:px-6">
                <dt className="text-xs font-medium uppercase tracking-wider text-white/55">{t.statBest}</dt>
                <dd className="mt-1 whitespace-nowrap text-2xl font-bold sm:text-3xl">{best > 0 ? `−${best} %` : t.notAvailable}</dd>
              </div>
              <div className="px-4 py-5 lg:px-6">
                <dt className="text-xs font-medium uppercase tracking-wider text-white/55">{t.statFrom}</dt>
                <dd className="mt-1 whitespace-nowrap text-2xl font-bold sm:text-3xl">{formatPrice(cheapest, lang)}</dd>
              </div>
            </dl>
          )}
        </div>
      </section>

      <section id="deals" className="container-page scroll-mt-20 py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">{t.dealsHeading}</h2>
            {updated && <p className="mt-1 text-sm text-ink-muted">{t.lastUpdate(formatStamp(updated, lang))}</p>}
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium" aria-label={t.sectionsAria}>
            {SECTIONS.map((s) => (
              <Link key={s.slug} href={localePath(lang, `/${s.slug}`)} className="text-brand underline-offset-4 hover:underline">
                {dict.sections[s.slug].label}
              </Link>
            ))}
          </nav>
        </div>
        <DealExplorer deals={deals} lang={lang} />
        {partners.length > 0 && (
          <div className="mt-10 space-y-4" aria-label={t.partnersAria}>
            {partners.map((p) => (
              <PartnerCard key={p.name} partner={p} lang={lang} />
            ))}
          </div>
        )}
      </section>

      {hotelPicks.length > 0 && (
        <section id="hotels" className="container-page scroll-mt-20 pb-12">
          <h2 className="text-2xl font-bold tracking-tight text-ink">{t.hotelsHeading}</h2>
          <p className="mt-1 max-w-2xl text-sm text-ink-muted">
            {t.hotelsText(dict.place.city)}
            {!hotelPicks.some((p) => p.partner) && ` ${dict.deal.noCommission}`}
          </p>
          <div className="mt-6 space-y-4">
            {hotelPicks.map((p) => (
              <HotelPickCard key={`${p.destination}-${p.name}-${p.checkedOn}`} pick={p} lang={lang} showDestination />
            ))}
          </div>
        </section>
      )}

      <section className="border-y border-line bg-white">
        <div className="container-page py-14">
          <h2 className="text-2xl font-bold tracking-tight text-ink">{t.stepsHeading}</h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-brand">{i + 1}</span>
                <h3 className="mt-4 font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-8 rounded-2xl bg-brand px-6 py-10 text-white sm:px-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{t.newsletterHeading}</h2>
            <p className="mt-3 max-w-md text-white/70">{t.newsletterText(dict.place.city)}</p>
          </div>
          <NewsletterForm source="accueil" tone="dark" lang={lang} />
        </div>
      </section>

      <section className="container-page pb-4">
        <h2 className="text-2xl font-bold tracking-tight text-ink">{t.faqHeading}</h2>
        <div className="mt-6 divide-y divide-line rounded-xl border border-line bg-white">
          {t.faq.map(({ q, a }) => (
            <details key={q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                {q}
                <span className="text-ink-muted transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
