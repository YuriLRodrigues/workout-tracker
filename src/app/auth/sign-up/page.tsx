import Image from 'next/image'

import { SignUpForm } from './components/form'
import SignUpHeader from './components/sign-up-header'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function SignUpPage() {
  return (
    <main className="grid h-screen overflow-hidden md:grid-cols-2">
      <div className="fixed flex min-h-screen w-full flex-col items-center justify-center bg-white/30 px-8 py-3 backdrop-blur-md md:static md:flex md:bg-transparent dark:bg-black/60 dark:md:bg-transparent">
        <div className="grid w-[100vw] px-1 sm:w-full">
          <ScrollArea
            className="max-h-[calc(100vh-25px)] w-full max-w-[100vw] flex-1 px-0 sm:max-w-full md:px-3"
            type="scroll"
            scrollHideDelay={550}
          >
            <SignUpHeader />
            <SignUpForm />
          </ScrollArea>
        </div>
      </div>
      <Image
        src="/assets/sign-up.png"
        alt="Sign-Up-Image-Form"
        className="h-full max-h-screen w-full object-cover object-center md:block"
        width={1920}
        height={1080}
      />
    </main>
  )
}
