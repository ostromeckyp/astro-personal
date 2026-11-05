import type { NextConfig } from "next";
import { OLD_HOST, SITE_URL } from "./lib/site";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/resume", destination: "/about", permanent: true },
      { source: "/:path*", has: [{ type: "host", value: OLD_HOST }], destination: `${SITE_URL}/:path*`, permanent: true },
    ];
  },
};

export default nextConfig;
