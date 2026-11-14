import Link from 'next/link';
import Logo from '@/components/Logo';
import { SECTIONS, SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="mt-24 bg-brand text-white/70">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Site indépendant qui repère les vols directs à prix réellement bas au départ de l&apos;{SITE.airport}.
            Nous ne vendons pas de billets : la réservation se fait chez notre partenaire.
          </p>
        </div>

        <nav aria-label="Rubriques">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-white">Les deals</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-white">Tous les deals</Link></li>
            {SECTIONS.map((s) => (
              <li key={s.slug}><Link href={`/${s.slug}`} className="hover:text-white">{s.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Informations">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-white">Informations</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/comment-ca-marche" className="hover:text-white">Notre méthode</Link></li>
            <li><Link href="/alertes" className="hover:text-white">Alertes par e-mail</Link></li>
            <li><Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link></li>
            <li><Link href="/confidentialite" className="hover:text-white">Confidentialité</Link></li>
            <li><a href={`mailto:${SITE.contactEmail}`} className="hover:text-white">Contact</a></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. Conçu en Alsace.</p>
          <p>
            Les liens de réservation sont des liens partenaires : ils peuvent nous rapporter une commission, sans surcoût pour vous.
          </p>
        </div>
      </div>
    </footer>
  );
}
