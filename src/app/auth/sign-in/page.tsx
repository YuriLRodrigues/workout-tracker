import Image from 'next/image'

import AuthFeatures from './components/auth-features'
import { SignInForm } from './components/form'
import SignInHeader from './components/sign-in-header'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function SignInPage() {
  return (
    <main className="grid h-screen overflow-hidden md:grid-cols-2">
      <div className="relative">
        <Image
          src="/assets/sign-in.png"
          alt="Sign-In-Image-Form"
          className="h-full max-h-screen w-full object-cover object-top md:block"
          width={1920}
          height={1080}
        />
        <div className="bg-background/70 absolute bottom-0 left-0 z-20 mt-auto hidden w-full p-2 md:block">
          <AuthFeatures />
        </div>
      </div>
      <div className="fixed flex min-h-screen w-full flex-col items-center justify-center bg-white/30 px-8 py-3 backdrop-blur-md md:static md:flex md:bg-transparent dark:bg-black/60 dark:md:bg-transparent">
        <div className="grid w-[100vw] px-1 sm:w-full">
          <ScrollArea
            className="max-h-[calc(100vh-25px)] w-full max-w-[100vw] flex-1 px-0 sm:max-w-full md:px-3"
            type="scroll"
            scrollHideDelay={550}
          >
            <SignInHeader />
            <SignInForm />
          </ScrollArea>
        </div>
      </div>
    </main>
  )
}
