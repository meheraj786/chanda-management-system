import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.giphy.com',
        pathname: '**', 
      },
      {
        protocol: 'https',
        hostname: 'media1.giphy.com', 
      },
      {
        protocol: 'https',
        hostname: 'media2.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'giphy.com',
      },
    ],
  },
};

export default nextConfig;
