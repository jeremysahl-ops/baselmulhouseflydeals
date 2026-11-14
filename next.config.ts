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
  // Ensure trailing slashes are consistent
  trailingSlash: false,
  // Un package-lock.json parasite dans le dossier utilisateur : sans ça, Turbopack le prend pour racine.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
