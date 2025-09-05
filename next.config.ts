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
    ],
  },
}

export default nextConfig
