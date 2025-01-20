import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // Allow any protocol (http, https, etc.)
        hostname: "**", // Allow any domain
      },
      {
        protocol: "https", // Allow any protocol (http, https, etc.)
        hostname: "**", // Allow any domain
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
