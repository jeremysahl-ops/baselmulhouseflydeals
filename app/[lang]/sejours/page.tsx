import type { Metadata } from 'next';
import Link from 'next/link';
import AirportVisual from '@/components/AirportVisual';
import { codePhoto, sejoursActifs, type Sejour } from '@/lib/sejours';
import { formatDay, formatPrice } from '@/lib/format';
import { alternatesFor, getDict, isLang, localePath, type Lang } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

export const revalidate = 3600;

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getDict(lang).sejours;
  return { title: t.metaTitle, description: t.metaDescription, alternates: alternatesFor(lang, '/sejours') };
}

function Carte({ s, lang }: { s: Sejour; lang: Lang }) {
  const t = getDict(lang).sejours;
  const code = codePhoto(s);
  return (
    <li>
      <a href={s.url} target="_blank" rel="noopener nofollow" className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-line transition hover:shadow-xl">
        <div className="relative aspect-[16/10] overflow-hidden bg-board">
          {code ? (
            <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.05]">
              <AirportVisual code={code} lang={lang} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" width={700} />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-board via-[#1d3557] to-[#e4572e]" aria-hidden="true" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/30" aria-hidden="true" />
          <span className="absolute left-3 top-3 rounded-md bg-black/50 px-2 py-1 font-board text-[11px] uppercase tracking-wider text-white backdrop-blur">
            {t.nights(s.nuits)}{s.formule ? ` · ${t.formules[s.formule]}` : ''}
          </span>
          <p className="display absolute bottom-3 left-4 right-4 text-3xl leading-none text-white drop-shadow">{s.destination}</p>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-4 p-4">
          <div>
            <h3 className="font-bold leading-snug text-ink">{s.titre}</h3>
            <p className="mt-1 text-sm text-ink-soft">{t.departure(formatDay(s.depart, lang))}</p>
            <p className="mt-1 text-xs text-ink-muted">{t.by(s.voyagiste, s.source)}</p>
          </div>
          <div className="flex items-end justify-between gap-3">
            <div>
              <span className="flap !bg-board text-2xl">{formatPrice(s.prix, lang)}</span>
              <span className="ml-1 text-xs text-ink-muted">{t.perPerson}</span>
              <p className="mt-1 text-[11px] text-ink-muted">{t.seen(formatDay(s.vuLe, lang))}</p>
            </div>
            <span className="rounded-md bg-flap px-3 py-2 text-sm font-bold text-ink transition group-hover:brightness-110">{t.see(s.source)} ↗</span>
          </div>
        </div>
      </a>
    </li>
  );
}

export default async function SejoursPage({ params }: Props) {
  const lang = await langParam(params);
  const dict = getDict(lang);
  const t = dict.sejours;
  const tous = sejoursActifs();
  const groupes = [
    { titre: t.short, liste: tous.filter((s) => s.nuits <= 4) },
    { titre: t.long, liste: tous.filter((s) => s.nuits >= 5) },
  ].filter((g) => g.liste.length);

  return (
    <div className="container-page py-10">
      <nav className="text-sm text-ink-muted" aria-label={dict.common.breadcrumb}>
        <Link href={localePath(lang, '/')} className="hover:text-ink">{dict.common.home}</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink-soft">{t.h1}</span>
      </nav>
      <header className="mb-6 mt-4 max-w-3xl">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="display mt-2 text-5xl text-ink sm:text-6xl">{t.h1}</h1>
      </header>
      <p role="note" className="mb-8 max-w-3xl rounded-lg border-l-4 border-flap bg-white px-4 py-3 text-sm leading-relaxed text-ink">
        {t.banner}
      </p>
      {groupes.length === 0 ? (
        <p className="text-ink-soft">{t.empty}</p>
      ) : (
        groupes.map((g) => (
          <section key={g.titre} className="mb-10">
            <h2 className="display text-3xl text-ink">{g.titre}</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.liste.map((s) => (
                <Carte key={s.url + s.depart} s={s} lang={lang} />
              ))}
            </ul>
          </section>
        ))
      )}
      <p className="max-w-3xl text-xs text-ink-muted">{t.note}</p>
    </div>
  );
}
