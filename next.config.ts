import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // appDir: true,
  },
  images: {
    domains: ['localhost'], // Add your image domains here
  },
  // Enable bundle analysis with: ANALYZE=true npm run build
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
