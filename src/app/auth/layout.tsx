import '../globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Autenticação Sistema Pessoal de Treinos',
  description: 'Acompanhe seus treinos e evolução na academia',
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
