'use client'

import { useState, useRef } from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion-scn'
import Animate from '@/components/ui/animate'

import { motion, useInView, Variants } from 'framer-motion'
import {
  Dumbbell,
  Smartphone,
  BarChart,
  TrendingUp,
  BarChart2,
  UserCheck,
  Video,
  History,
  ClipboardList,
  PlusCircle,
} from 'lucide-react'

const faqs = [
  {
    question: 'Como posso começar a salvar meus treinos?',
    answer:
      "Basta criar uma conta, acessar o painel principal e clicar em 'Criar Treino'. Você pode inserir todos os detalhes do seu treino, incluindo exercícios, séries, repetições e pesos utilizados.",
    icon: <Dumbbell className="h-5 w-5" />,
  },
  {
    question: 'É possível acompanhar meu progresso ao longo do tempo?',
    answer:
      'Sim! Nosso sistema exibe todos os registros de treino no seu histórico, permitindo acompanhar sua evolução detalhadamente — incluindo os pesos utilizados, número de repetições, volume total e frequência dos treinos. Em breve, também teremos gráficos de estatísticas e progresso para uma visualização ainda mais clara da sua evolução.',
    icon: <BarChart className="h-5 w-5" />,
  },
  {
    question: 'Posso acessar meus treinos em diferentes dispositivos?',
    answer:
      'Absolutamente. Nossa plataforma é totalmente responsiva e sincronizada na nuvem, permitindo que você acesse seus treinos de qualquer dispositivo, seja smartphone, tablet ou computador, apenas utilizando a mesma conta registrada.',
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    question: 'Posso criar meus próprios exercícios?',
    answer:
      'Sim! Você pode cadastrar exercícios personalizados com nome, grupo muscular, vídeo de referência e descrição, para adaptar seus treinos da forma que preferir.',
    icon: <PlusCircle className="h-5 w-5" />,
  },
  {
    question: 'Consigo registrar todos os detalhes da execução de um treino?',
    answer:
      'Com certeza. Você pode registrar todas as execuções dos exercícios com detalhes como carga utilizada, número de séries, repetições e observações específicas para cada sessão.',
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    question: 'Existe um histórico dos meus treinos anteriores?',
    answer:
      'Sim! Todos os seus treinos e execuções ficam salvos no histórico. Você pode acessá-los a qualquer momento para revisar seu desempenho anterior e acompanhar sua evolução.',
    icon: <History className="h-5 w-5" />,
  },
  {
    question: 'Posso adicionar vídeos aos exercícios?',
    answer:
      'Sim! Ao criar um exercício, você pode adicionar um link de vídeo como referência de execução correta, facilitando a lembrança da técnica durante o treino.',
    icon: <Video className="h-5 w-5" />,
  },
  {
    question: 'O sistema terá integração com personal trainers?',
    answer:
      'Estamos desenvolvendo uma funcionalidade que permitirá a conexão com personal trainers. Eles poderão acompanhar seus treinos, fornecer feedback personalizado e ajustar seus planos de acordo com seu desempenho.',
    icon: <UserCheck className="h-5 w-5" />,
  },
  {
    question: 'Haverá gráficos de estatísticas e evolução?',
    answer:
      'Sim! Em breve, o sistema contará com gráficos detalhados que mostrarão sua evolução ao longo do tempo, incluindo progressão de cargas, frequência de treinos e outros indicadores-chave de desempenho.',
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    question: 'Será possível comparar meu desempenho com outros usuários?',
    answer:
      'Sim! Em breve, você poderá comparar seu desempenho com amigos ou outros usuários da plataforma, promovendo uma competição saudável e incentivando melhorias contínuas.',
    icon: <BarChart2 className="h-5 w-5" />,
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
