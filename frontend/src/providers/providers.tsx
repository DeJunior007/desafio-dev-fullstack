'use client'
import { HeroUIProvider } from "@heroui/react"
import QueryProvider from "@/providers/query-provider"
import { Toaster } from "@/components/Toaster" // Adicione este import

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <HeroUIProvider>
      <QueryProvider>
        {children}
        <Toaster /> 
      </QueryProvider>
    </HeroUIProvider>
  )
}