import Link from 'next/link'

import Animate from '@/components/ui/animate'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { cn } from '@/lib/utils'
import { CheckCircle2 } from 'lucide-react'

const plans = [
  {
    name: 'Gratuito',
    price: 'R$0',
    period: '/mês',
    description: 'Perfeito para quem está começando',
    features: ['3 treinos personalizados', 'Histórico básico', 'Cronômetro de descanso', 'Acesso mobile'],
    buttonText: 'Começar Grátis',
    buttonVariant: 'outline' as const,
    href: '/login?tab=cadastro',
    popular: false,
  },
  {
    name: 'Pro',
    price: 'R$29',
    period: '/mês',
    description: 'Para atletas dedicados',
    features: [
      'Treinos ilimitados',
      'Histórico completo',
      'Estatísticas avançadas',
      'Cronômetro personalizado',
      'Suporte prioritário',
      'Sem anúncios',
    ],
    buttonText: 'Assinar Agora',
    buttonVariant: 'default' as const,
    href: '/login?tab=cadastro&plan=pro',
    popular: true,
  },
  {
    name: 'Elite',
    price: 'R$49',
    period: '/mês',
    description: 'Para profissionais e atletas',
    features: [
      'Tudo do plano Pro',
      'Análise de desempenho IA',
      'Exportação de dados',
      'Integração com wearables',
      'Planos de nutrição',
      'Acesso antecipado a novidades',
    ],
    buttonText: 'Assinar Elite',
    buttonVariant: 'outline' as const,
    href: '/login?tab=cadastro&plan=elite',
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="plans" className="bg-background px-3 py-20 md:px-0">
      <div className="container mx-auto">
        <Animate direction="down" duration={0.8} threshold={1} once={true} amount={1} type="bounce" asChild>
          <div className="animate-fade-up animate-once animate-duration-[800ms] mx-auto mb-16 max-w-3xl text-center">
            <Animate direction="down" duration={0.8} threshold={1} once={true} amount={1} type="fade" asChild>
              <h3 className="mb-4 text-3xl font-bold">Planos para todos os perfis</h3>
            </Animate>
            <Animate direction="down" duration={0.8} threshold={1} once={true} amount={1} type="fade" asChild>
              <p className="text-muted-foreground text-lg">
                Escolha o plano ideal para suas necessidades e comece a transformar seus treinos hoje mesmo
              </p>
            </Animate>
          </div>
        </Animate>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Animate key={index} className="h-full">
              <Card
                className={cn(
                  'border-primary/10 animate-fade-up animate-once h-full',
                  plan.popular && 'border-primary relative',
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground absolute top-0 right-0 rounded-tr-lg rounded-bl-lg px-3 py-1 text-xs font-bold">
                    POPULAR
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-1">{plan.period}</span>
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="text-primary h-4 w-4" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.buttonVariant} asChild>
                      <Link href={plan.href}>{plan.buttonText}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}
