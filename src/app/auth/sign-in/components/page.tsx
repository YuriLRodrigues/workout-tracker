import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import AuthFeatures from './auth-features'
import { SignInForm } from './form'

export const metadata: Metadata = {
  title: 'Entrar | FitTrack Academia',
  description: 'Entre na sua conta FitTrack Academia',
}

export default function SignInPage() {
  return (
    <div className="relative container grid min-h-[90vh] flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900">
          <Image
            src="/assets/sign-in.png"
            width={1920}
            height={1080}
            alt="Gym background"
            className="h-full w-full object-cover object-top opacity-30"
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
            <line x1="6" y1="1" x2="6" y2="4"></line>
            <line x1="10" y1="1" x2="10" y2="4"></line>
            <line x1="14" y1="1" x2="14" y2="4"></line>
          </svg>
          Workout Tracker
        </div>
        <div className="relative z-20 mt-auto">
          <AuthFeatures />
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Bem-vindo de volta</h1>
            <p className="text-muted-foreground text-sm">Digite suas credenciais para entrar na sua conta</p>
          </div>
          <SignInForm />
          <p className="text-muted-foreground px-8 text-center text-sm">
            Não tem uma conta?{' '}
            <Link href="/auth/sign-up" className="hover:text-primary underline underline-offset-4">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
