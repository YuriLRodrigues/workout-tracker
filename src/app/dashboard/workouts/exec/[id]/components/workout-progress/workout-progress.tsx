import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'

import { findAllLogsToday, findTodayWorkoutSession } from '@/http/kubb-gen'

import { WorkoutStartEnd } from './workout-start-end'

type WorkoutProgressProps = {
  workoutId: string
}

export const WorkoutProgress = async ({ workoutId }: WorkoutProgressProps) => {
  const { totalCompleted, totalExercises } = await findAllLogsToday(
    { workoutId },
    { next: { tags: ['findAllLogsToday'] } },
  )

  const { data } = await findTodayWorkoutSession({ workoutId }, { next: { tags: ['findTodayWorkoutSession'] } })

  return (
    <Card className="from-background to-muted/30 overflow-hidden border-none bg-gradient-to-br shadow-md">
      <CardHeader>
        <CardTitle>Progresso do Treino</CardTitle>
        <CardDescription>
          {totalCompleted} de {totalExercises} exercícios completos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Progress value={(totalCompleted / totalExercises) * 100} className="h-2" indicatorClassName="bg-green-600" />
        <WorkoutStartEnd totalExercises={totalExercises} totalCompleted={totalCompleted} sessionHasStarted={data} />
      </CardContent>
    </Card>
  )
}

export const WorkoutProgressSkeleton = () => {
  return (
    <Card className="from-background to-muted/30 overflow-hidden border-none bg-gradient-to-br shadow-md">
      <CardHeader>
        <CardTitle>Progresso do Treino</CardTitle>
        <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
          <Skeleton className="h-4 w-6" /> de <Skeleton className="h-4 w-6" /> exercícios completos
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Progress value={0} className="h-2" />
        <Skeleton className="h-9 w-40" />
      </CardContent>
    </Card>
  )
}
