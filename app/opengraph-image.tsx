import { ImageResponse } from 'next/og';

// Image d'aperçu pour les partages (réseaux sociaux, messageries). L'ancien site pointait vers
// un fichier /og-image.png qui n'existait pas.
export const alt = 'FlyBSL : vols directs à petit prix au départ de Bâle-Mulhouse';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: 72, background: '#0b2545', color: 'white', fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, letterSpacing: 6, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
          EuroAirport Bâle-Mulhouse-Fribourg
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
            Les vols directs à petit prix
          </div>
          <div style={{ display: 'flex', marginTop: 28, fontSize: 34, color: 'rgba(255,255,255,0.75)' }}>
            Une cinquantaine de destinations, relevées deux fois par semaine
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 32, fontWeight: 700 }}>
          <div style={{ display: 'flex', fontSize: 44 }}>FlyBSL</div>
          <div style={{ display: 'flex', padding: '12px 24px', borderRadius: 12, background: '#e4572e' }}>baselmulhouseflydeals.com</div>
        </div>
      </div>
    ),
    size,
  );
}
