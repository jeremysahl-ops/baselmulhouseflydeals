import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  alternates: { canonical: '/confidentialite' },
};

export default function ConfidentialitePage() {
  return (
    <article className="container-page prose-page py-14">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Politique de confidentialité</h1>
        <p className="mt-4">
          Cette page décrit les données que {SITE.name} traite, pourquoi, et comment exercer vos droits. Le responsable du
          traitement est l&apos;éditeur du site, identifié dans les <Link href="/mentions-legales">mentions légales</Link>.
        </p>

        <h2>Alertes par e-mail</h2>
        <ul>
          <li><strong>Donnée collectée :</strong> votre adresse e-mail, la date d&apos;inscription et la page d&apos;inscription.</li>
          <li><strong>Finalité :</strong> vous envoyer les deals publiés sur le site. Rien d&apos;autre.</li>
          <li><strong>Base légale :</strong> votre consentement, donné en vous inscrivant.</li>
          <li><strong>Durée :</strong> jusqu&apos;à votre désinscription.</li>
          <li><strong>Destinataires :</strong> l&apos;éditeur et son hébergeur de base de données (Supabase). Votre adresse n&apos;est ni vendue ni transmise à des partenaires commerciaux.</li>
        </ul>
        <p>
          Pour vous désinscrire ou faire supprimer votre adresse, écrivez à{' '}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
        </p>

        <h2>Mesure d&apos;audience</h2>
        <p>
          Le site utilise Vercel Web Analytics, un outil de mesure d&apos;audience qui ne dépose pas de cookie et ne
          permet pas de vous identifier : il compte les pages vues de façon agrégée.
        </p>

        <h2>Liens vers le site de réservation</h2>
        <p>
          Lorsque vous cliquez sur un bouton de réservation, vous quittez {SITE.name} pour {SITE.bookingPartner}. Le lien
          contient un identifiant qui indique à ce partenaire que vous venez de notre site ; il ne contient aucune donnée
          personnelle vous concernant. {SITE.bookingPartner} applique ensuite sa propre politique de confidentialité et
          peut déposer ses propres cookies.
        </p>

        <h2>Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
          d&apos;opposition et de portabilité de vos données. Pour les exercer, écrivez à{' '}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>. Vous pouvez aussi adresser une réclamation à la
          CNIL (<a href="https://www.cnil.fr" rel="noopener">cnil.fr</a>).
        </p>
      </div>
    </article>
  );
}
