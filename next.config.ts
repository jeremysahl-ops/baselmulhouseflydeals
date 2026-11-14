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
  async redirects() {
    return [{ source: '/vol-hotel', destination: '/', permanent: false }];
  },
  // Un package-lock.json parasite dans le dossier utilisateur : sans ça, Turbopack le prend pour racine.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
