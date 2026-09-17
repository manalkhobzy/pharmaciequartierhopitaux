import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Anciennes adresses (renommées le 29/06/2026) : redirection permanente (301)
  // pour ne perdre ni les liens existants ni les pages déjà connues de Google.
  async redirects() {
    return [
      { source: '/services', destination: '/nos-services', permanent: true },
      { source: '/contact', destination: '/nous-contacter', permanent: true },
      { source: '/qui-sommes-nous', destination: '/notre-pharmacie', permanent: true },
      { source: '/a-propos', destination: '/notre-pharmacie', permanent: true },
      { source: '/notre-equipe', destination: '/notre-pharmacie', permanent: true },
      { source: '/conseils-sante', destination: '/actualites-et-conseils', permanent: true },
      { source: '/conseils-sante/:slug', destination: '/actualites-et-conseils/:slug', permanent: true },
      { source: '/actualites', destination: '/actualites-et-conseils', permanent: true },
      { source: '/blog', destination: '/actualites-et-conseils', permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nxebwcwntvfonixkagfq.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        // photos de profil des auteurs d'avis Google
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.ggpht.com',
      },
    ],
  },
};

export default nextConfig;
