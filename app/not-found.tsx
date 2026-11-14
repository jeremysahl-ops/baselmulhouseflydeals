import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="eyebrow">Erreur 404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">Cette page n&apos;existe pas ou plus</h1>
      <p className="mx-auto mt-3 max-w-md text-ink-soft">
        Le deal que vous cherchez a peut-être été retiré : les bons prix ne durent que quelques jours.
      </p>
      <Link href="/" className="btn-primary mt-8">Voir les deals du moment</Link>
    </div>
  );
}
