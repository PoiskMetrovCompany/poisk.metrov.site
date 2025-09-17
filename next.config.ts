import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typescript: {
    // !! ВНИМАНИЕ !!
    // Опасно: это позволит сборке завершиться успешно даже при наличии TypeScript ошибок
    ignoreBuildErrors: true,
  },
  eslint: {
    // Также игнорируем ESLint ошибки при сборке
    ignoreDuringBuilds: true,
  },
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
      {
        protocol: "https",
        hostname: "cdn-dataout.trendagent.ru",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      // {
      //   source: "/:path*",
      //   destination: "https://poisk-metrov.ru:4443/api/v1/:path*",
      // },
      // {
      //   source: "/api/proxy/:path*",
      //   destination: "http://poisk-metrov-demos.ru:8080/api/:path*",
      // },
    ]
  },
}

export default nextConfig
