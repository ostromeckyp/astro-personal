import type { NextConfig } from "next";
import { OLD_HOST, SITE_URL } from "./lib/site";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Use-case images are UI screenshots: higher quality keeps small text sharp, AVIF keeps the files small.
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 90, 100] },
  async redirects() {
    return [
      { source: "/resume", destination: "/about", permanent: true },
      { source: "/pl/resume", destination: "/pl/about", permanent: true },
      { source: "/approach", destination: "/#how-i-work", permanent: true },
      { source: "/pl/approach", destination: "/pl#how-i-work", permanent: true },
      { source: "/:path*", has: [{ type: "host", value: OLD_HOST }], destination: `${SITE_URL}/:path*`, permanent: true },
    ];
  },
};

export default nextConfig;
