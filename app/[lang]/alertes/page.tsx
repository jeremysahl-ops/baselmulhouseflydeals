import type { Metadata } from 'next';
import NewsletterForm from '@/components/NewsletterForm';
import { alternatesFor, getDict, isLang } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const dict = getDict(lang);
  return {
    title: dict.alerts.metaTitle,
    description: dict.alerts.metaDescription(dict.place.city),
    alternates: alternatesFor(lang, '/alertes'),
  };
}

export default async function AlertesPage({ params }: Props) {
  const lang = await langParam(params);
  const dict = getDict(lang);
  const t = dict.alerts;
  return (
    <div className="container-page py-14">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t.h1(dict.place.city)}</h1>
        <p className="mt-4 text-lg text-ink-soft">{t.lead}</p>

        <div className="card mt-8 p-6">
          <NewsletterForm source="alertes" lang={lang} />
        </div>

        <ul className="mt-10 space-y-5">
          {t.points.map(([title, text]) => (
            <li key={title} className="flex gap-4">
              <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-saving-soft text-saving" aria-hidden="true">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m4 10 4 4 8-8" /></svg>
              </span>
              <div>
                <h2 className="font-semibold text-ink">{title}</h2>
                <p className="text-sm text-ink-soft">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
