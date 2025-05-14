import '../globals.css'
import type { Metadata } from 'next'

import DashboardLayout from '@/components/layout/dashboard/dashboard-layout'

export const metadata: Metadata = {
  title: 'Workout Tracker | Salve e acompanhe seus treinos',
  description: 'Acompanhe seus treinos, registre seus logs e veja sua evolução na academia com o Workout Tracker.',
  keywords: ['workout', 'tracker', 'treinos', 'logs', 'academia', 'fitness', 'saúde', 'musculação'],
  authors: [{ name: 'Yuri Leite Rodrigues', url: 'https://yurilrodrigues-dev.vercel.app/' }],
  creator: 'Yuri Leite Rodrigues',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Workout Tracker | Salve e acompanhe seus treinos',
    description: 'Acompanhe seus treinos, registre seus logs e veja sua evolução na academia com o Workout Tracker.',
    url: 'https://workouttracker.vercel.app',
    siteName: 'Workout Tracker',
    images: [
      {
        url: 'https://workouttracker.vercel.app/wt-logo.png',
        width: 1200,
        height: 630,
        alt: 'Workout Tracker Logo',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workout Tracker | Salve e acompanhe seus treinos',
    description: 'Acompanhe seus treinos, registre seus logs e veja sua evolução na academia com o Workout Tracker.',
    images: ['https://workouttracker.vercel.app/wt-logo.png'],
    creator: '@seuusuario',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  themeColor: '#000000',
}

export default function DashboardNextLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DashboardLayout>{children}</DashboardLayout>
}
