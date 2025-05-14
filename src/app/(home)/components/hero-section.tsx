import Image from 'next/image'
import Link from 'next/link'

import Animate from '@/components/ui/animate'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

export function HeroSection() {
  return (
    <section className="from-primary/5 via-background to-primary/5 relative overflow-hidden bg-gradient-to-br px-3 py-24 md:px-0 md:py-32">
      <div className="bg-grid-pattern absolute inset-0 opacity-5"></div>
      <div className="relative z-10 container mx-auto">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <Animate type="slide" delay={0.1} duration={0.8} direction="right" className="space-y-6">
            <Animate type="bounce" delay={0.1} duration={0.8} direction="down">
              <BackgroundGradient className="w-fit max-w-fit min-w-0">
                <div className="bg-background inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold">
                  🚀 Novo lançamento v1.0
                </div>
              </BackgroundGradient>
            </Animate>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Transforme seus <span className="text-primary">treinos</span> em resultados reais
            </h1>
            <p className="text-muted-foreground text-xl">
              Acompanhe sua evolução, gerencie seus treinos e alcance seus objetivos com o sistema de treinos mais
              completo do mercado.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                asChild
                effect="ringHover"
                className="group animate-infinite animate-duration-[3000ms] animate-pulse"
              >
                <Link href="/auth/sign-in">
                  Começar Agora
                  <Icon name="ChevronRight" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              {/* <Button size="lg" variant="outline" asChild>
                <Link href="#demo">Ver Demonstração</Link>
              </Button> */}
            </div>
            <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Icon name="CircleCheckBig" className="h-4 w-4 text-green-500" />
                <span>Grátis</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="CircleCheckBig" className="h-4 w-4 text-green-500" />
                <span>Sem cartão</span>
              </div>
            </div>
          </Animate>
          <Animate
            type="slide"
            delay={0.1}
            duration={0.8}
            direction="left"
            className="mx-auto w-full overflow-hidden rounded-md md:ml-auto md:w-fit"
          >
            <Image
              src="/assets/home-presentation.jpg"
              alt="workout-tracker-presentation"
              className="aspect-square h-[300px] w-full object-cover object-center transition-all duration-500 hover:scale-110 md:h-[700px] md:w-[500px]"
              quality={100}
              width={300}
              height={500}
            />
          </Animate>
        </div>
      </div>
    </section>
  )
}
