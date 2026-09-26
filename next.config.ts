import type { NextConfig } from "next";

/**
 * Category URLs (/shop, /active, /swim, /intimates) are handled by
 * dedicated redirect pages under app/*/page.tsx — no rewrites needed.
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.cjdropshipping.com" },
      { protocol: "https", hostname: "cf.cjdropshipping.com" },
      { protocol: "https", hostname: "oss.cjdropshipping.com" },
    ],
  },
};

export default nextConfig;
