import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/shop", destination: "/products" },
      { source: "/active", destination: "/products?category=activewear" },
      { source: "/swim", destination: "/products?category=swimwear" },
      { source: "/intimates", destination: "/products?category=intimates" },
    ];
  },
};

export default nextConfig;
