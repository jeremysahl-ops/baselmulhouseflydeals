import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Notre méthode : comment nous sélectionnons les deals',
  description: "D'où viennent les prix, comment nous décidons qu'un vol est un bon prix, et comment le site est financé.",
  alternates: { canonical: '/comment-ca-marche' },
};

export default function MethodePage() {
  return (
    <article className="container-page prose-page py-14">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow">Transparence</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Notre méthode</h1>
        <p className="mt-4 text-lg">
          {SITE.name} est un site indépendant. Nous ne vendons pas de billets : nous repérons les vols directs
          anormalement bon marché au départ de l&apos;{SITE.airport} et vous renvoyons vers un site de réservation.
        </p>

        <h2>D&apos;où viennent les prix</h2>
        <p>
          Deux fois par semaine, notre outil interroge une base de prix alimentée par les recherches de voyageurs sur un
          comparateur de vols. Pour chaque destination, il relève les allers-retours directs les moins chers sur les neuf
          mois à venir. Ce sont des prix <strong>constatés</strong> dans les 48 heures précédant le relevé, pas des prix
          garantis.
        </p>

        <h2>Ce que nous appelons un deal</h2>
        <ul>
          <li>Un vol <strong>direct</strong> à l&apos;aller comme au retour.</li>
          <li>Un <strong>aller-retour</strong> de 2 à 15 nuits sur place.</li>
          <li>
            Un prix au moins <strong>{SITE.minDiscount} % inférieur au prix habituel</strong> de la destination pour la
            saison du départ.
          </li>
          <li>Au plus trois deals par destination, sur des mois différents.</li>
        </ul>
        <p>
          Le « prix habituel » est une référence que nous tenons pour chaque destination et chaque saison. C&apos;est une
          estimation, pas une moyenne officielle : elle sert à écarter les prix simplement corrects et à ne garder que les
          écarts nets. Aucun deal n&apos;est choisi ou rédigé à la main, et aucune destination n&apos;est mise en avant
          contre rémunération.
        </p>

        <h2>Ce que le prix comprend</h2>
        <p>
          Le prix affiché est celui d&apos;un aller-retour pour une personne, taxes comprises, au tarif de base de la
          compagnie. Le bagage en soute, le choix du siège et, selon les compagnies, le bagage cabine standard sont en
          supplément.
        </p>

        <h2>Pourquoi le prix peut être différent quand vous cliquez</h2>
        <p>
          Les tarifs aériens changent plusieurs fois par jour, et un prix vu par un voyageur hier peut avoir disparu
          aujourd&apos;hui. Chaque deal indique la date à laquelle son prix a été constaté. Un deal que notre outil ne
          retrouve plus est retiré du site au bout de cinq jours environ.
        </p>

        <h2>Comment le site est financé</h2>
        <p>
          Le bouton de réservation ouvre {SITE.bookingPartner} avec un lien d&apos;affiliation. Si vous réservez, ce
          partenaire peut nous reverser une commission. Vous ne payez rien de plus, et cela n&apos;intervient pas dans la
          sélection : celle-ci dépend uniquement de l&apos;écart entre le prix constaté et le prix habituel. Vous pouvez
          aussi réserver directement auprès de la compagnie aérienne.
        </p>

        <p className="mt-10">
          <Link href="/#deals">Voir les deals du moment</Link>
        </p>
      </div>
    </article>
  );
}
