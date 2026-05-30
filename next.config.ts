import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.myqcloud.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.cos.ap-guangzhou.myqcloud.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "youqiankeji.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
