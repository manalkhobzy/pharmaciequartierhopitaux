import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
