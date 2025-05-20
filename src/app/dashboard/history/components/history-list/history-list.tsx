import Link from 'next/link'

import { NumberTicker } from '@/components/magicui/number-ticker'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ExpandableText } from '@/components/ui/expandable-text'
import { Icon } from '@/components/ui/icon'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

import { findWorkoutsHistoryByUserId } from '@/http/kubb-gen'
import { cn } from '@/lib/utils'
import { calculateElapsedTime } from '@/utils/calculate-elapsed-time'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { icons } from 'lucide-react'

type HistoryListProps = {
  page?: number
  limit?: number
  query?: string
}

export const HistoryList = async ({ limit, page, query }: HistoryListProps) => {
  const { results: history } = await findWorkoutsHistoryByUserId(
    { params: { limit, page, query } },
    { next: { tags: ['findWorkoutsHistoryByUserId'] } },
  )

  if (!history || history.length === 0) return <EmptyWorkoutHistory />

  return (
    <div className="@container space-y-2 divide-y">
      {history.map((h) => (
        <div key={h.id} className="relative flex w-full space-x-3">
          <div className="sticky left-0 z-10 flex min-w-[180px] items-center gap-4 p-4 @lg:min-w-[300px]">
            <div className="bg-primary/10 rounded-full p-2">
              <Icon name={h.icon as keyof typeof icons} className={cn('h-5 w-5', h.color)} />
            </div>
            <div>
              <ExpandableText asChild maxLines={2} type="dot">
                <p className="font-medium first-letter:uppercase">{h.workoutName}</p>
              </ExpandableText>

              <ExpandableText asChild maxLines={2} type="dot">
                <p className="text-muted-foreground text-sm first-letter:uppercase">{h.workoutDescription}</p>
              </ExpandableText>
            </div>
          </div>

          <ScrollArea className="w-full overflow-x-auto">
            <div className="grid min-w-[600px] grid-cols-4 gap-4 p-4">
              <div>
                <p className="text-muted-foreground text-sm">Data</p>
                <p className="font-medium">{format(h.startTime, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Duração</p>
                <p className="font-medium">
                  {calculateElapsedTime({ startTime: h.startTime, endTime: h.endTime }).formatted}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Exercícios</p>
                <NumberTicker value={h.totalExercises} className="font-medium" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Carga Total</p>
                <span>
                  <NumberTicker value={h.totalLoad} className="font-medium" />
                  kg
                </span>
              </div>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      ))}
    </div>
  )
}

export const EmptyWorkoutHistory = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-8 p-6">
      <div className="flex max-w-md flex-col items-center space-y-3 text-center">
        <div className="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-full">
          <Icon name="Dumbbell" className="text-primary h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Nenhum treino registrado</h2>
        <p className="text-muted-foreground">
          Você ainda não possui histórico de treinos. Comece a registrar seus treinos para acompanhar seu progresso e
          desempenho.
        </p>
      </div>

      <Card className="bg-background w-full max-w-md border p-6">
        <h3 className="mb-4 text-lg font-semibold">Como começar?</h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
              <span className="text-primary font-medium">1</span>
            </div>
            <div>
              <h4 className="font-medium">Selecione um treino</h4>
              <p className="text-muted-foreground text-sm">Escolha entre os treinos disponíveis</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
              <span className="text-primary font-medium">2</span>
            </div>
            <div>
              <h4 className="font-medium">Inicie o treino</h4>
              <p className="text-muted-foreground text-sm">
                Pressione o botão &quot;Iniciar Treino&quot; e comece seus exercícios
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
              <span className="text-primary font-medium">3</span>
            </div>
            <div>
              <h4 className="font-medium">Registre seus exercícios</h4>
              <p className="text-muted-foreground text-sm">Anote as séries, repetições e cargas durante o treino</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
              <span className="text-primary font-medium">4</span>
            </div>
            <div>
              <h4 className="font-medium">Finalize o treino</h4>
              <p className="text-muted-foreground text-sm">
                Ao terminar, clique em &quot;Finalizar Treino&quot; para salvar no histórico
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex w-full max-w-md flex-col gap-4 sm:flex-row">
        <Button asChild className="flex-1">
          <Link href="/dashboard/workouts">
            <Icon name="ClipboardList" className="mr-2 h-4 w-4" />
            Ver Treinos
          </Link>
        </Button>
      </div>

      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <Icon name="CalendarClock" className="h-4 w-4" />
        <span>Seus treinos aparecerão aqui após serem finalizados</span>
      </div>
    </div>
  )
}

export const HistoryListSkeleton = () => {
  return (
    <div className="@container space-y-2 divide-y">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="relative flex w-full space-x-3">
          <div className="sticky left-0 z-10 flex min-w-[180px] items-center gap-4 p-4 @lg:min-w-[300px]">
            <div className="bg-primary/10 rounded-full p-2">
              <Skeleton className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-5 w-30" />
              <Skeleton className="h-4 w-28 sm:w-46" />
            </div>
          </div>
          <ScrollArea className="w-full overflow-x-auto">
            <div className="grid min-w-[600px] grid-cols-4 gap-4 p-4">
              <div className="space-y-1">
                <Skeleton className="h-5 w-30" />
                <Skeleton className="h-4 w-28 sm:w-46" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-5 w-30" />
                <Skeleton className="h-4 w-28 sm:w-46" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-5 w-30" />
                <Skeleton className="h-4 w-28 sm:w-46" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-5 w-30" />
                <Skeleton className="h-4 w-28 sm:w-46" />
              </div>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      ))}
    </div>
  )
}
