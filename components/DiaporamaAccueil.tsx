'use client';

// Diaporama en fond du haut de l'accueil : 5 plages et 5 capitales desservies en direct depuis Bâle,
// une nouvelle photo toutes les 5 secondes (fondu), petits points pour choisir. Photos déjà contrôlées (lib/destinations.ts).
import { useEffect, useState } from 'react';
import Link from 'next/link';

export interface Diapo { photo: string; nom: string; legende: string; href: string }

export default function DiaporamaAccueil({ diapos }: { diapos: Diapo[] }) {
  const [i, setI] = useState(0);
  const [charge, setCharge] = useState(false);

  useEffect(() => {
    setCharge(true); // les autres photos ne se chargent qu'une fois la page affichée
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % diapos.length), 5000);
    return () => window.clearInterval(id);
  }, [diapos.length, i]);

  return (
    <>
      {diapos.map((d, n) => (
        (n === 0 || charge) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={d.photo}
            src={`https://images.unsplash.com/${d.photo}?auto=format&fit=crop&w=2000&q=70`}
            alt=""
            fetchPriority={n === 0 ? 'high' : 'low'}
            className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-1000 ${n === i ? 'opacity-100' : 'opacity-0'}`}
          />
        )
      ))}
      <div className="absolute bottom-3 left-4 flex gap-2 sm:left-6" role="group">
        {diapos.map((d, n) => (
          <button
            key={d.photo}
            type="button"
            onClick={() => setI(n)}
            aria-label={d.nom}
            aria-current={n === i ? 'true' : undefined}
            className={`h-2.5 w-2.5 rounded-full border border-white/80 transition-colors ${n === i ? 'bg-white' : 'bg-transparent hover:bg-white/50'}`}
          />
        ))}
      </div>
      <Link
        href={diapos[i].href}
        className="absolute bottom-3 right-4 rounded bg-black/40 px-2 py-1 font-board text-[11px] text-white/85 backdrop-blur hover:text-white"
      >
        {diapos[i].legende}
      </Link>
    </>
  );
}
