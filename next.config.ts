import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/**" },
      { protocol: "https", hostname: "source.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // experimental: {
  //   serverActions: { bodySizeLimit: "10mb" },
  // },

  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Link",
            value:
              "<https://www.youtube.com>; rel=preconnect, <https://www.youtube.com>; rel=dns-prefetch, <https://cdn.sanity.io>; rel=preconnect, <https://cdn.sanity.io>; rel=dns-prefetch",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [{ source: "/home", destination: "/", permanent: true }];
  },

  env: {
    SITE_NAME: "iHome Real Estate",
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },

  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
};

export default withNextIntl(nextConfig); // ✅ plugin applied correctly
