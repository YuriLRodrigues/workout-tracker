import Image from 'next/image'
import { Suspense } from 'react'

import { NewPasswordForm } from './components/form'
import Header from './components/header'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function NewPasswordPage() {
  return (
    <main className="grid h-screen max-h-screen items-center justify-center overflow-hidden">
      <Image
        src="/assets/new-password.jpg"
        width={1920}
        height={1080}
        alt="forgot-password-image"
        className="absolute z-10 h-screen max-h-screen bg-no-repeat object-cover object-center opacity-70"
      />
      <div className="fixed z-20 flex h-fit min-h-full w-full flex-col items-center justify-center bg-white/30 px-8 py-3 backdrop-blur-md sm:min-h-0 md:static md:flex md:rounded-xl dark:bg-black/60">
        <div className="grid w-[100vw] px-1 sm:w-full">
          <ScrollArea
            className="max-h-[calc(100vh-25px)] w-full max-w-[100vw] flex-1 px-0 sm:max-w-full md:px-3"
            type="scroll"
            scrollHideDelay={550}
          >
            <Header />
            <Suspense fallback={null}>
              <NewPasswordForm />
            </Suspense>
          </ScrollArea>
        </div>
      </div>
    </main>
  )
}
