import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb', // Set higher to allow server-side validation
    },
  },
};

export default nextConfig;
