import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    authInterrupts: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "assets.aceternity.com",
      },
      {
        hostname: "n07swn4304.ufs.sh",
      },
    ],
  },
} satisfies NextConfig;

export default nextConfig;
