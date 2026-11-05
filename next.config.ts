import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{ source: "/resume", destination: "/about", permanent: true }];
  },
};

export default nextConfig;
