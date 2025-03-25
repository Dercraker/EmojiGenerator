import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "assets.aceternity.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "i.pravatar.cc",
      },
    ],
  },
} satisfies NextConfig;

export default nextConfig;
