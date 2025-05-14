import Animate from '@/components/ui/animate'
import { GlowingEffect } from '@/components/ui/glowing-effect'

import { cn } from '@/lib/utils'
import { Dumbbell, BarChart3, Calendar, Clock, Zap, CheckCircle2 } from 'lucide-react'

const features = [
  {
    icon: <Dumbbell className="text-primary h-7 w-7" />,
    title: 'Gerenciamento de Treinos',
    description:
      'Crie e personalize seus treinos com facilidade. Adicione exercícios, séries, repetições e organize tudo do seu jeito.',
  },
  {
    icon: <BarChart3 className="text-primary h-7 w-7" />,
    title: 'Estatísticas Detalhadas',
    description:
      'Acompanhe sua evolução com gráficos e estatísticas detalhadas. Veja seu progresso em cada exercício e grupo muscular.',
  },
  {
    icon: <Calendar className="text-primary h-7 w-7" />,
    title: 'Histórico Completo',
    description:
      'Acesse todo seu histórico de treinos, com detalhes de cada sessão, cargas utilizadas e tempo de execução.',
  },
  {
    icon: <Clock className="text-primary h-7 w-7" />,
    title: 'Cronômetro Inteligente',
    description:
      'Controle o tempo de descanso entre séries com nosso cronômetro inteligente, otimizando seu tempo na academia.',
  },
  {
    icon: <Zap className="text-primary h-7 w-7" />,
    title: 'Conquistas e Motivação',
    description: 'Desbloqueie conquistas conforme evolui e mantenha-se motivado com nosso sistema de recompensas.',
  },
  {
    icon: <CheckCircle2 className="text-primary h-7 w-7" />,
    title: 'Acompanhamento de Metas',
    description: 'Defina metas de treino, peso, medidas e acompanhe seu progresso rumo aos seus objetivos.',
  },
]

export function FeaturesSection() {
  return (
    <section id="resources" className="bg-background px-3 py-20 md:px-0">
      <div className="container mx-auto">
        <Animate direction="down" duration={0.8} threshold={1} once={true} amount={1} type="bounce" asChild>
          <div className="animate-fade-up animate-once animate-duration-[800ms] mx-auto mb-16 max-w-3xl space-y-2 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Tudo que você precisa para evoluir</h2>
            <Animate direction="down" duration={0.8} threshold={1} once={true} amount={1} type="fade" asChild>
              <p className="text-muted-foreground text-lg md:text-xl">
                Nossa plataforma foi desenvolvida para oferecer a melhor experiência de acompanhamento de treinos, com
                recursos que realmente fazem diferença.
              </p>
            </Animate>
          </div>
        </Animate>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Animate
              key={feature.title}
              direction="right"
              once={true}
              delay={0.1 * features.indexOf(feature)}
              type="fade"
              asChild
            >
              <GridItem area="" icon={feature.icon} title={feature.title} description={feature.description} />
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}

interface GridItemProps {
  area: string
  icon: React.ReactNode
  title: string
  description: React.ReactNode
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn('min-h-[14rem] list-none', area)}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect spread={30} glow={true} borderWidth={2} disabled={false} proximity={50} inactiveZone={0.01} />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 shadow-[0px_0px_27px_0px_#D2D2D2] dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-neutral-300 p-2 duration-200 hover:scale-110 dark:border-neutral-600">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
