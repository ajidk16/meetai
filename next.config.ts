import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",

  // Temporary disabled eslint and typescript errors
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  devIndicators: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "down-id.img.susercontent.com",
        port: "",
        pathname: "/file/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
