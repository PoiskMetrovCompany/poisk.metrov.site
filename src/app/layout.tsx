'use client'

import type { Metadata } from "next"
import { Onest } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { usePathname } from 'next/navigation'
import Footer from "@/components/footer"

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const hideHeader = pathname.includes('candidatesSecurityBlock')

  return (
    <html lang="en">
      <body className={onest.className}>
        {!hideHeader && <Header />}
        <main className="container">{children}</main>
        {!hideHeader && <Footer />}
      </body>
    </html>
  )
}