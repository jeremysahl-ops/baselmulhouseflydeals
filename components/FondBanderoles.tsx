'use client';

// Décor de fond de toutes les pages (choisi par l'utilisateur le 24/11/2026 sur une simulation, intensité « visible ») :
// 1. des bandes en travers où des avions tirent une banderole FLYBSL en laissant une traînée (défilement lent, CSS) ;
// 2. dans la marge de droite, un petit avion jaune qui descend en zigzag au fil du défilement de la page,
//    avec sa trace en pointillés. Il n'apparaît que si la marge est assez large (grands écrans).
// Tout est décoratif (aria-hidden), sans clic possible, et figé si l'utilisateur demande moins d'animations.
import { useEffect, useRef, useState } from 'react';

const AVION = 'M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z';
const CONTENU = 1152; // largeur maximale du contenu (container-page : max-w-6xl)
const ALLERS_RETOURS = 7;

function Motif() {
  return (
    <span className="fond-motif">
      <span className="fond-trainee" />
      <span className="fond-banniere">FLY<b>BSL</b></span>
      <span className="fond-corde" />
      <span className="fond-avion">
        <svg width="26" height="26" viewBox="0 0 24 24"><path fill="#ffc72c" d={AVION} transform="rotate(90 12 12)" /></svg>
      </span>
    </span>
  );
}

function AvionZigzag() {
  const rail = useRef<HTMLDivElement>(null);
  const pilote = useRef<SVGSVGElement>(null);
  const trace = useRef<SVGPathElement>(null);
  const [largeur, setLargeur] = useState(0);

  useEffect(() => {
    const mesure = () => setLargeur(Math.min(90, Math.floor((window.innerWidth - CONTENU) / 2) - 8));
    mesure();
    window.addEventListener('resize', mesure);
    return () => window.removeEventListener('resize', mesure);
  }, []);

  useEffect(() => {
    if (largeur < 44) return;
    const maj = () => {
      const r = rail.current, p = pilote.current, c = trace.current;
      if (!r || !p || !c) return;
      const w = r.clientWidth, h = r.clientHeight;
      const pos = (t: number): [number, number] => [w / 2 + Math.sin(t * Math.PI * 2 * ALLERS_RETOURS) * (w / 2 - 16), 90 + t * (h - 120)];
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const t = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      const [x, y] = pos(t), [x2, y2] = pos(Math.min(1, t + 0.002));
      p.style.transform = `translate(${x - 11}px, ${y - 11}px) rotate(${(Math.atan2(y2 - y, x2 - x) * 180) / Math.PI + 90}deg)`;
      let d = '';
      for (let k = 0; k <= 160; k++) {
        const [a, b] = pos((t * k) / 160);
        d += `${k ? 'L' : 'M'}${a.toFixed(1)} ${b.toFixed(1)}`;
      }
      c.setAttribute('d', d);
    };
    maj();
    window.addEventListener('scroll', maj, { passive: true });
    window.addEventListener('resize', maj);
    return () => { window.removeEventListener('scroll', maj); window.removeEventListener('resize', maj); };
  }, [largeur]);

  if (largeur < 44) return null;
  return (
    <div ref={rail} className="pointer-events-none fixed right-2 top-0 z-30 h-screen print:hidden" style={{ width: largeur }} aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full">
        <path ref={trace} fill="none" stroke="#e9a400" strokeWidth={1.6} strokeDasharray="2 6" strokeLinecap="round" />
      </svg>
      <svg ref={pilote} viewBox="0 0 24 24" width={22} height={22} className="absolute left-0 top-0 will-change-transform">
        <path fill="#ffc72c" stroke="#0d1b2e" strokeWidth={1} strokeLinejoin="round" d={AVION} />
      </svg>
    </div>
  );
}

export default function FondBanderoles() {
  return (
    <>
      <div className="fond-banderoles print:hidden" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className="fond-bande">
            {Array.from({ length: 8 }, (_, j) => <Motif key={j} />)}
          </div>
        ))}
      </div>
      <AvionZigzag />
    </>
  );
}
