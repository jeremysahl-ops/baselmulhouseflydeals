import type { Partner } from '@/lib/partners';

/** Encart partenaire. La mention « Partenaire » et rel="sponsored" ne sont pas optionnels. */
export default function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded bg-brand-soft px-2 py-0.5 font-semibold uppercase tracking-wider text-brand">Partenaire</span>
          <span className="text-ink-muted">{partner.kind}</span>
        </p>
        <p className="mt-2 font-semibold text-ink">{partner.name}</p>
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-soft">{partner.description}</p>
      </div>
      <a href={partner.url} target="_blank" rel="sponsored noopener" className="btn-secondary shrink-0">
        {partner.cta}
      </a>
    </div>
  );
}
