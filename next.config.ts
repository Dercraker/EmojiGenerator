import type { NextConfig } from "next";

const nextConfig = {
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
