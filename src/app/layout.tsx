import type { Metadata } from "next"
import { Onest } from "next/font/google"
import "./globals.css"
import LayoutClient from "./layout-client"

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
})

export const metadata: Metadata = {
  title: "Поиск метров",
  description: "Поиск метров — бесплатный сервис бронирования новостроек",
  openGraph: {
    title: "Поиск метров",
    siteName: "Поиск метров",
    locale: "ru_RU",
    description: "Поиск метров — бесплатный сервис бронирования новостроек",
    type: "website",
    url: "https://poisk.metrov.site",
    images: [
      {
        url: "/images/image.jpg",
        width: 1200,
        height: 630,
        alt: "Поиск метров",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Поиск метров",
    description: "Поиск метров — бесплатный сервис бронирования новостроек",
    images: ["/images/image.jpg"],
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: "https://poisk.metrov.site",
      name: "Поиск метров",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://poisk.metrov.site/?s={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    }),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://poisk.metrov.site",
              name: "Поиск метров",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://poisk.metrov.site/?s={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={onest.className}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}
