import './globals.css'
import { Inter } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Providers } from '@/providers/providers'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn(inter.className)}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
