import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'

import { findAllSessionByUserId } from '@/http/kubb-gen'
import { icons } from 'lucide-react'

import { WorkoutHistoryItem, WorkoutHistoryItemSkeleton } from '../workout-card/workout-history-item'

type RecentlyHistoryProps = {
  limit?: number
  page?: number
}

export const RecentlyHistory = async ({ limit }: RecentlyHistoryProps) => {
  const { results: history } = await findAllSessionByUserId({ limit: limit || 6, page: 1 })

  if (!history || history.length === 0) return <EmptyHistory />

  return (
    <Card className="from-background to-muted/30 border-none bg-gradient-to-br shadow-md">
      <CardContent className="p-0">
        <div className="divide-y">
          {history.map((h) => (
            <WorkoutHistoryItem
              key={h.id}
              name={h.workoutName}
              color={h.color}
              description={h.workoutDescription}
              endTime={h.endTime}
              icon={h.icon as keyof typeof icons}
              startTime={h.startTime}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const EmptyHistory = () => {
  return (
    <Card className="from-background to-muted/30 animate-fade-up animate-once mx-auto w-full border-none bg-gradient-to-br shadow-md sm:min-h-[300px]">
      <CardHeader className="text-center">
        <div className="bg-muted mx-auto flex h-20 w-20 items-center justify-center rounded-full">
          <Icon name="History" className="text-muted-foreground h-10 w-10" />
        </div>
        <CardTitle className="mt-4 text-xl">Nenhum histórico encontrado</CardTitle>
        <CardDescription>Você ainda não possui nenhum histórico de treino.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="border-muted-foreground/50 rounded-lg border border-dashed p-6 text-center">
          <p className="text-muted-foreground text-sm">
            Inicie um treino e salve o seu histórico de execução para visualizar aqui seus registros.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export const RecentlyHistorySkeleton = () => {
  return (
    <Card className="from-background to-muted/30 border-none bg-gradient-to-br shadow-md">
      <CardContent className="p-0">
        <div className="divide-y">
          {[...Array(6)].map((_, i) => (
            <WorkoutHistoryItemSkeleton key={i} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
