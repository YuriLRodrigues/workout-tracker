'use client'

import { useState, useRef } from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion-scn'
import Animate from '@/components/ui/animate'

import { motion, useInView, Variants } from 'framer-motion'
import { Dumbbell, Calendar, Trophy, Clock, Shield, Smartphone, Users, BarChart } from 'lucide-react'

const faqs = [
  {
    question: 'Como posso começar a salvar meus treinos?',
    answer:
      "Basta criar uma conta, acessar o painel principal e clicar em 'Novo Treino'. Você pode inserir todos os detalhes do seu treino, incluindo exercícios, séries, repetições e pesos utilizados.",
    icon: <Dumbbell className="h-5 w-5" />,
  },
  {
    question: 'É possível acompanhar meu progresso ao longo do tempo?',
    answer:
      'Sim! Nosso sistema oferece gráficos e estatísticas detalhadas que mostram sua evolução em cada exercício, incluindo aumento de peso, volume total e frequência de treinos.',
    icon: <BarChart className="h-5 w-5" />,
  },
  {
    question: 'Posso acessar meus treinos em diferentes dispositivos?',
    answer:
      'Absolutamente. Nossa plataforma é totalmente responsiva e sincronizada na nuvem, permitindo que você acesse seus treinos de qualquer dispositivo, seja smartphone, tablet ou computador.',
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    question: 'Como funciona o sistema de lembretes de treino?',
    answer:
      'Você pode configurar lembretes personalizados para seus dias de treino. O sistema enviará notificações nos horários escolhidos, garantindo que você nunca perca uma sessão.',
    icon: <Clock className="h-5 w-5" />,
  },
  {
    question: 'É possível compartilhar meus treinos com amigos ou treinador?',
    answer:
      'Sim, você pode compartilhar seus treinos e progresso com amigos ou seu treinador pessoal. Basta gerar um link de compartilhamento ou convidá-los diretamente pelo email.',
    icon: <Users className="h-5 w-5" />,
  },
  {
    question: 'Meus dados estão seguros na plataforma?',
    answer:
      'Absolutamente. Utilizamos criptografia de ponta a ponta e seguimos rigorosos protocolos de segurança para garantir que seus dados pessoais e de treino estejam sempre protegidos.',
    icon: <Shield className="h-5 w-5" />,
  },
  {
    question: 'Posso criar rotinas de treino semanais?',
    answer:
      'Sim, você pode criar e salvar rotinas completas para diferentes dias da semana. Isso facilita o acompanhamento do seu programa de treinamento e garante que você siga uma progressão adequada.',
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    question: 'Existe algum sistema de recompensas ou desafios?',
    answer:
      "Sim! Temos um sistema de conquistas e desafios que tornam sua jornada fitness mais divertida. Complete objetivos como 'treinar 7 dias seguidos' ou 'bater seu recorde pessoal' para ganhar distintivos exclusivos.",
    icon: <Trophy className="h-5 w-5" />,
  },
]

export const FaqSection = () => {
  const [activeIcon, setActiveIcon] = useState<number | null>(null)

  const faqsRef = useRef(null)

  const isFaqsInView = useInView(faqsRef, { once: false, amount: 0.1 })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  }

  const iconVariants: Variants = {
    inactive: { scale: 1, rotate: 0 },
    active: {
      scale: 1.2,
      rotate: [0, -15, 15, -10, 10, 0],
      transition: { duration: 1, ease: 'easeInOut' },
    },
  }

  return (
    <section
      id="faq"
      className="from-primary/5 via-background to-primary/5 relative overflow-hidden bg-gradient-to-br px-3 py-20 md:px-0"
    >
      <div className="relative container mx-auto">
        <div className="bg-primary/5 absolute top-0 left-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
        <div className="bg-primary/10 absolute right-0 bottom-0 h-72 w-72 translate-x-1/2 translate-y-1/2 rounded-full blur-3xl" />

        <Animate direction="down" duration={0.8} threshold={1} once={true} amount={1} type="bounce" asChild>
          <div className="animate-fade-up animate-once animate-duration-[800ms] mx-auto mb-16 max-w-3xl space-y-2 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Perguntas frequentes</h2>
            <Animate direction="down" duration={0.8} threshold={1} once={true} amount={1} type="fade" asChild>
              <p className="text-muted-foreground text-lg md:text-xl">
                Tudo o que você precisa saber sobre nosso sistema de salvamento de treinos
              </p>
            </Animate>
          </div>
        </Animate>

        <motion.div
          ref={faqsRef}
          className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isFaqsInView ? 'visible' : 'hidden'}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-card h-fit min-h-[70px] rounded-xl p-1 shadow-sm transition-shadow hover:shadow-md"
              variants={itemVariants}
            >
              <Accordion type="single" collapsible>
                <AccordionItem value={`item-${index}`} className="border-none">
                  <AccordionTrigger
                    className="hover:bg-muted/50 group rounded-lg px-4 py-5"
                    onClick={() => setActiveIcon(activeIcon === index ? null : index)}
                  >
                    <div className="flex flex-wrap items-center gap-1 text-left">
                      <motion.div
                        className="text-primary mr-3"
                        variants={iconVariants}
                        animate={activeIcon === index ? 'active' : 'inactive'}
                      >
                        {faq.icon}
                      </motion.div>
                      <span className="font-medium">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground px-4 pt-1 pb-5">{faq.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          ))}
        </motion.div>

        {/* <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-muted-foreground">Não encontrou o que procurava?</p>
          <a href="#contato" className="text-primary mt-2 inline-flex items-center hover:underline">
            Entre em contato com nosso suporte
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div> */}
      </div>
    </section>
  )
}
