import type { MetadataRoute } from 'next';

// Manifeste de l'application installable (« Ajouter à l'écran d'accueil ») : nom, icônes, couleurs.
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FlyBSL : vols pas chers depuis Bâle-Mulhouse',
    short_name: 'FlyBSL',
    description: 'Les meilleurs prix des vols directs au départ de l’EuroAirport Bâle-Mulhouse, et vos alertes de prix.',
    start_url: '/?source=app',
    scope: '/',
    display: 'standalone',
    background_color: '#0d1b2e',
    theme_color: '#0d1b2e',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
