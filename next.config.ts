import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["d33h51bxjx5s46.cloudfront.net"],
  },
};

export default nextConfig;
