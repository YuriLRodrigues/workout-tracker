import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

import { findAllLogsByExerciseId } from '@/http/kubb-gen'
import { formatDate } from '@/utils/format-date'
import { formatNumberBR } from '@/utils/format-number-to-br'
import { Calendar, Weight, Repeat, BarChart3, Flame } from 'lucide-react'

interface ExerciseLogsProps {
  exerciseId: string
  exerciseName: string
}

export const ExerciseLogs = async ({ exerciseId, exerciseName }: ExerciseLogsProps) => {
  const { results: logs } = await findAllLogsByExerciseId({ exerciseId, params: { limit: 5 } })

  if (!logs || logs.length === 0) {
    return <EmptyExerciseLogs />
  }

  return (
    <Card className="from-background animate-fade-up animate-once border-none bg-gradient-to-br to-neutral-700/50 shadow-md dark:shadow-neutral-800">
      <CardHeader>
        <CardTitle className="line-clamp-1">{exerciseName}</CardTitle>
        <CardDescription className="line-clamp-2">Histórico de progresso</CardDescription>
      </CardHeader>
      <div className="grid">
        <ScrollArea className="max-h-[300px] transition-all duration-300 hover:px-2">
          <CardContent className="flex flex-col gap-3 p-2">
            {logs.map((log) => (
              <ExerciseLogCard
                key={log.id}
                date={log.createdAt}
                effortLevel={log.effortLevel}
                maxReps={log.maxRepeat}
                maxSets={log.maxSeries}
                maxWeight={log.maxWeight}
              />
            ))}
          </CardContent>
        </ScrollArea>
      </div>
    </Card>
  )
}

export const EmptyExerciseLogs = () => {
  return (
    <Card className="from-background to-muted/30 animate-fade-up animate-once mx-auto w-full max-w-md border-none bg-gradient-to-br shadow-md sm:min-h-[300px]">
      <CardHeader className="text-center">
        <div className="bg-muted mx-auto flex h-20 w-20 items-center justify-center rounded-full">
          <Icon name="Logs" className="text-muted-foreground h-10 w-10" />
        </div>
        <CardTitle className="mt-4 text-xl">Nenhum histórico encontrado</CardTitle>
        <CardDescription>Você ainda não possui nenhum histórico de treino desse exercício.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="border-muted-foreground/50 rounded-lg border border-dashed p-6 text-center">
          <p className="text-muted-foreground text-sm">
            Inicie um treino e salve o seu histórico de execução para cada exercício para visualizar aqui seus
            registros.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export const ExerciseLogsSkeleton = () => {
  return <Skeleton className="mx-auto h-14 w-40 sm:h-9 sm:w-60" />
}

interface ExerciseLogCardProps {
  date: Date
  maxWeight: number
  maxSets: number
  maxReps: number
  effortLevel: number
}

export default function ExerciseLogCard({ date, maxWeight, maxSets, maxReps, effortLevel }: ExerciseLogCardProps) {
  const getEffortColor = () => {
    if (effortLevel <= 3) return 'bg-green-500'
    if (effortLevel <= 7) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <Card className="border-l-card-foreground @container w-full overflow-hidden border-l-4 transition-shadow duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="px-4 py-0">
          <div className="mb-2 flex items-center text-sm text-gray-500">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{formatDate(date)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 p-4 @xs:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-lg bg-blue-50 p-2">
            <div className="mb-1 flex items-center text-blue-700">
              <Weight className="mr-1 h-4 w-4" />
              <span className="text-xs font-medium">Carga Máx.</span>
            </div>
            <p className="text-lg font-bold text-black">{formatNumberBR(maxWeight)} kg</p>
          </div>

          <div className="flex flex-col items-center justify-center rounded-lg bg-purple-50 p-2">
            <div className="mb-1 flex items-center text-purple-700">
              <BarChart3 className="mr-1 h-4 w-4" />
              <span className="text-xs font-medium">Séries</span>
            </div>
            <p className="text-lg font-bold text-black">{formatNumberBR(maxSets)}</p>
          </div>

          <div className="flex flex-col items-center justify-center rounded-lg bg-teal-50 p-2">
            <div className="mb-1 flex items-center text-teal-700">
              <Repeat className="mr-1 h-4 w-4" />
              <span className="text-xs font-medium">Repetições</span>
            </div>
            <p className="text-lg font-bold text-black">{formatNumberBR(maxReps)}</p>
          </div>

          <div className="flex flex-col items-center justify-center rounded-lg bg-orange-50 p-2">
            <div className="mb-1 flex items-center text-orange-700">
              <Flame className="mr-1 h-4 w-4" />
              <span className="text-xs font-medium">Esforço</span>
            </div>
            <div className="mx-auto flex w-full items-center justify-center gap-2">
              <p className="text-lg font-bold text-black">{formatNumberBR(effortLevel)}/10</p>
              <div
                className={`${getEffortColor()} h-3 rounded-full transition-all`}
                style={{ width: `${effortLevel * 5}px` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
