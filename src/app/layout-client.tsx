"use client"

import { usePathname } from "next/navigation"

import Footer from "@/components/footer"
import Header from "@/components/header"

import QueryProvider from "@/providers/query-provider"


interface LayoutClientProps {
  children: React.ReactNode
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const pathname = usePathname()
  const hideHeader = pathname.includes("candidatesSecurityBlock")

  return (
    <QueryProvider>
      {!hideHeader && <Header />}
      <main className="container">{children}</main>
      {!hideHeader && <Footer />}
    </QueryProvider>
  )
}
