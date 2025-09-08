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
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: "http://poisk-metrov-demos.ru:8080/api/:path*",
      },
    ]
  },
}

export default nextConfig
