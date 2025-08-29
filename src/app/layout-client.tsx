"use client"

import { usePathname } from "next/navigation"

import Footer from "@/components/footer"
import Header from "@/components/header"

import QueryProvider from "@/providers/query-provider"


interface LayoutClientProps {
  children: React.ReactNode
  initialCity: { name: string; id: string; slug: string } | null
}

export default function LayoutClient({
  children,
  initialCity,
}: LayoutClientProps) {
  const pathname = usePathname()
  const hideHeader = pathname.includes("candidatesSecurityBlock")

  return (
    <QueryProvider>
      {!hideHeader && <Header initialCity={initialCity} />}
      <main className="container">{children}</main>
      {!hideHeader && <Footer />}
    </QueryProvider>
  )
}
