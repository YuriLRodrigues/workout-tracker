import Link from 'next/link'

import Animate from '@/components/ui/animate'
import { Button } from '@/components/ui/button'

import { ChevronRight } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="from-primary/20 via-primary/10 to-primary/5 bg-gradient-to-br py-20">
      <div className="container mx-auto px-3 md:px-0">
        <Animate direction="down" duration={0.8} threshold={1} once={true} amount={1} type="bounce" asChild>
          <div className="animate-fade-up animate-once animate-duration-[800ms] mx-auto mb-16 max-w-3xl space-y-2 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Pronto para transformar seus treinos?</h2>
            <Animate direction="down" duration={0.8} threshold={1} once={true} amount={1} type="fade" asChild>
              <p className="text-muted-foreground text-lg md:text-xl">
                Registre seus treinos, acompanhe sua evolução e alcance seus objetivos com o WorkoutTracker.
              </p>
            </Animate>
          </div>
        </Animate>

        <Animate direction="right" type="slide" className="mx-auto w-fit">
          <Button size="lg" asChild>
            <Link href="/dashboard">
              Começar Agora
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </Animate>
      </div>
    </section>
  )
}
