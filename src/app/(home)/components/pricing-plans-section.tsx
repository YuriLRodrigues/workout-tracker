'use client'

import { useState } from 'react'

import Animate from '@/components/ui/animate'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export default function PricingPlansSection() {
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      name: 'Grátis',
      price: 'R$ 0',
      period: '',
      description: 'Perfeito para quem está começando.',
      features: [
        '3 treinos personalizados',
        'Histórico dos últimos 7 treinos',
        'Perfil do usuário',
        'Envio de imagem de perfil',
      ],
      highlighted: false,
      buttonText: 'Começar agora',
      className: '',
    },
    {
      name: 'Comum',
      price: isYearly ? 'R$99' : 'R$9,90',
      period: isYearly ? '/ano' : '/mês',
      description: 'Ideal para quem quer mais treinos e dados essenciais.',
      features: [
        'Até 10 treinos personalizados',
        'Acesso a recursos básicos',
        'Histórico completo paginado',
        'Criação e vinculação de exercícios',
        'Suporte por email',
      ],
      highlighted: false,
      buttonText: 'Escolher Comum',
      className: '',
    },
    {
      name: 'Personal',
      price: isYearly ? 'R$199' : 'R$19,90',
      period: isYearly ? '/ano' : '/mês',
      description: 'Ideal para profissionais que atendem alunos.',
      features: [
        'Todos os recursos dos planos anteriores',
        'Treinos ilimitados',
        'Vinculação de até 10 usuários',
        'Dashboard semanal e histórico completo',
        'Criação e vinculação de exercícios a outros usuários',
      ],
      highlighted: true,
      buttonText: 'Escolher Personal',
      className: 'personal-shine',
    },
    {
      name: 'Premium',
      price: isYearly ? 'R$299' : 'R$29,90',
      period: isYearly ? '/ano' : '/mês',
      description: 'Plano completo com IA e recursos avançados.',
      features: [
        'Todos os recursos dos planos anteriores',
        'Treinos ilimitados',
        'Vinculação de usuários ilimitados (para personal)',
        'Gráficos detalhados de desempenho',
        'Notificações de treino',
        'Grupos de amigos',
        'Feed de postagens',
        'Suporte 24/7',
        'Assistente com IA (FAQ, criação de treino, dúvidas)',
      ],
      highlighted: true,
      buttonText: 'Escolher Premium',
      className: 'premium-shine',
    },
  ]

  return (
    <section className="from-muted/80 to-muted/30 bg-gradient-to-b px-3 py-20 md:px-0">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <Animate direction="down" duration={0.8} threshold={1} once={true} amount={1} type="bounce" asChild>
            <div className="animate-fade-up animate-once animate-duration-[800ms] mx-auto mb-16 max-w-3xl space-y-2 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                Escolha o plano ideal para você{' '}
                <span className="text-muted-foreground text-sm md:text-lg">(em breve)</span>
              </h2>
              <Animate direction="down" duration={0.8} threshold={1} once={true} amount={1} type="fade" asChild>
                <p className="text-muted-foreground text-lg md:text-xl">
                  Oferecemos opções flexíveis para atender às suas necessidades. Comece gratuitamente e faça upgrade
                  conforme você cresce.
                </p>
              </Animate>
            </div>
          </Animate>
          <Animate
            direction="down"
            duration={0.8}
            delay={0.2}
            threshold={1}
            once={true}
            amount={1}
            type="bounce"
            asChild
          >
            <div className="flex items-center space-x-2">
              <span className={cn('text-sm font-medium', !isYearly && 'text-foreground')}>Mensal</span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="bg-primary/10 focus-visible:ring-ring focus-visible:ring-offset-background relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <span
                  className={cn(
                    'bg-primary inline-block h-4 w-4 rounded-full transition-transform',
                    isYearly ? 'translate-x-6' : 'translate-x-1',
                  )}
                />
              </button>
              <span className={cn('text-sm font-medium', isYearly && 'text-foreground')}>Anual</span>
              <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                Economize 20%
              </span>
            </div>
          </Animate>
        </div>

        <div className="mx-auto grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <Animate
              key={plan.name}
              direction="right"
              once={true}
              delay={0.2 * plans.indexOf(plan)}
              type="fade"
              asChild
            >
              <div
                key={plan.name}
                className={cn(
                  'bg-background relative flex flex-col overflow-hidden rounded-xl border p-6 shadow-lg',
                  plan.highlighted && 'border-primary shadow-xl',
                  plan.className,
                )}
              >
                <div className="mb-5 flex flex-col space-y-2">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="flex items-baseline text-2xl font-bold">
                    {plan.price}
                    <span className="text-muted-foreground ml-1 text-base font-medium">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>
                <ul className="mb-6 space-y-2 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 flex-none text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Button
                    disabled
                    className={cn(
                      'w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:cursor-pointer',
                      plan.highlighted
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                    )}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}
