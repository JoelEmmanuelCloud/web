import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "paulwaynegregory.com" }],
        destination: "https://www.paulwaynegregory.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
