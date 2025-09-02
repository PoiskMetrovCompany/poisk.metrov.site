import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "img.nmarket.pro",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.nmarket.pro",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
