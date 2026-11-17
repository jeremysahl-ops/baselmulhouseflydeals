import type { Metadata } from 'next';
import Link from 'next/link';
import { sejoursActifs, type Sejour } from '@/lib/sejours';
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
  return (
    <li className="flex flex-col justify-between gap-4 rounded-lg border border-line bg-white p-5 shadow-sm">
      <div>
        <p className="eyebrow">{s.destination}</p>
        <h3 className="mt-1 text-lg font-bold leading-snug text-ink">{s.titre}</h3>
        <p className="mt-2 text-sm text-ink-soft">
          {t.nights(s.nuits)} · {t.departure(formatDay(s.depart, lang))}
          {s.formule && <> · {t.formules[s.formule]}</>}
        </p>
        <p className="mt-1 text-xs text-ink-muted">{t.by(s.voyagiste, s.source)}</p>
      </div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <span className="flap text-2xl">{formatPrice(s.prix, lang)}</span>
          <span className="ml-1 text-xs text-ink-muted">{t.perPerson}</span>
          <p className="mt-1 text-[11px] text-ink-muted">{t.seen(formatDay(s.vuLe, lang))}</p>
        </div>
        <a href={s.url} target="_blank" rel="noopener nofollow" className="btn-primary !px-3 !py-2 text-sm">
          {t.see(s.source)} ↗
        </a>
      </div>
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
