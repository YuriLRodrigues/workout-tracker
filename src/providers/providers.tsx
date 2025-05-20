'use client'
import { ReactNode } from 'react'

import { Toaster } from '@/components/ui/sonner'

import { TanStackProvider } from './query-client.provider'
import { ThemeProvider } from './theme-provider'

type ProvidersProps = {
  children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <TanStackProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Toaster richColors closeButton position="top-right" />
        {children}
      </ThemeProvider>
    </TanStackProvider>
  )
}
