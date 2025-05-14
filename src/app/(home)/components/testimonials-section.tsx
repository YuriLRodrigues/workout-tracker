import { Marquee } from '@/components/magicui/marquee'
import Animate from '@/components/ui/animate'

import { cn } from '@/lib/utils'

type Testimonial = {
  name: string
  role: string
  image: string
  content: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Gustavo Silva',
    role: 'Praticante Regular',
    image: '/assets/default-user-avatar.webp',
    content:
      'O Workout Tracker revolucionou meus treinos. Consigo acompanhar minha evolução de forma clara e isso me motiva a continuar progredindo.',
  },
  {
    name: 'Ryan Oliveira',
    role: 'Praticante Regular',
    image: '/assets/default-user-avatar.webp',
    content:
      'Como personal, recomendo o Workout Tracker para todos os meus alunos. A interface é intuitiva e os recursos de acompanhamento são excelentes.',
  },
  {
    name: 'Marcos Santos',
    role: 'Fisiculturista',
    image: '/assets/default-user-avatar.webp',
    content:
      'Uso o Workout Tracker há alguns dias e já notei uma grande diferença na minha organização e progressão de cargas. Indispensável!',
  },
  {
    name: 'Caio Ferreira',
    role: 'Personal Trainer',
    image: '/assets/default-user-avatar.webp',
    content:
      'Recomendo para meus clientes que buscam acompanhar o desempenho de carga e execução nos treinos. Excelente ferramenta!',
  },
  {
    name: 'Patrícia Gomes',
    role: 'Praticante Regular',
    image: '/assets/default-user-avatar.webp',
    content:
      'Adoro o WorkoutTracker! Ele me ajuda a planejar meus treinos na academia e acompanhar meu desempenho ao longo do tempo.',
  },
  {
    name: 'Fernanda Lopes',
    role: 'Fitness Avançado',
    image: '/assets/default-user-avatar.webp',
    content:
      'O recurso de salvar meus treinos personalizados com vídeos de referência foi um diferencial! Consigo organizar os exercícios e revisar a execução sempre que preciso.',
  },
  {
    name: 'Lucas Almeida',
    role: 'Personal Trainer',
    image: '/assets/default-user-avatar.webp',
    content:
      'Como coach, uso o sistema para montar treinos completos para meus alunos, incluindo descrição detalhada, metas e vídeos. Economiza muito tempo e profissionaliza meu atendimento.',
  },
  {
    name: 'Juliana Cardoso',
    role: 'Atleta Recreativa',
    image: '/assets/default-user-avatar.webp',
    content:
      'Amo poder acompanhar meus PRs (personal records) e ver minha evolução no log de treinos! Antes eu anotava no whatsapp, agora tenho tudo organizado.',
  },
  {
    name: 'Felipe Souza',
    role: 'Marombeiro Raiz',
    image: '/assets/default-user-avatar.webp',
    content:
      'Curti demais a função de adicionar vídeos do YouTube direto na ficha de treino. Nunca mais fiquei na dúvida sobre a execução de um exercício novo!',
  },
  {
    name: 'Renata Faria',
    role: 'Entusiasta Fitness',
    image: '/assets/default-user-avatar.webp',
    content:
      'O log de treinos com histórico das cargas me ajuda a não estagnar. Sempre sei o que fiz na última sessão e já chego focada para progredir!',
  },
]

const firstRow = testimonials.slice(0, testimonials.length / 2)
const secondRow = testimonials.slice(testimonials.length / 2)

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="from-primary/5 via-background to-primary/5 bg-gradient-to-br py-20">
      <div className="mx-auto px-3 md:px-0">
        <Animate direction="down" duration={0.8} threshold={1} once={true} amount={1} type="bounce" asChild>
          <div className="animate-fade-up animate-once animate-duration-[800ms] mx-auto mb-16 max-w-3xl space-y-2 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">O que nossos usuários dizem</h2>
            <Animate direction="down" duration={0.8} threshold={1} once={true} amount={1} type="fade" asChild>
              <p className="text-muted-foreground text-lg md:text-xl">
                Algumas pessoas já transformaram seus treinos com o WorkoutTracker
              </p>
            </Animate>
          </div>
        </Animate>

        <Animate duration={0.8} delay={0.3} type="slide" direction="right">
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
              {firstRow.map((review) => (
                <ReviewCard key={review.name} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
              {secondRow.map((review) => (
                <ReviewCard key={review.name} {...review} />
              ))}
            </Marquee>
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
          </div>
        </Animate>
      </div>
    </section>
  )
}

const ReviewCard = ({ content, image, name, role }: Testimonial) => {
  return (
    <figure
      className={cn(
        'relative h-full w-96 cursor-pointer overflow-hidden rounded-xl border p-4',
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt={name} src={image} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
          <p className="text-xs font-medium dark:text-white/40">{role}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{content}</blockquote>
    </figure>
  )
}
