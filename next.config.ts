import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  trailingSlash: false,
  // Ancienne rubrique « Hôtels », qui n'a jamais contenu de deal : on renvoie vers l'accueil.
  // Le site a déménagé sur www.flybsl.com (17/11/2026) : l'ancien domaine et flybsl.com sans « www »
  // renvoient définitivement vers la même page sur www.flybsl.com.
  async redirects() {
    return [
      { source: '/vol-hotel', destination: '/', permanent: false },
      { source: '/:path*', has: [{ type: 'host', value: '(www\\.)?baselmulhouseflydeals\\.com' }], destination: 'https://www.flybsl.com/:path*', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'flybsl\\.com' }], destination: 'https://www.flybsl.com/:path*', permanent: true },
    ];
  },
  // Un package-lock.json parasite dans le dossier utilisateur : sans ça, Turbopack le prend pour racine.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
