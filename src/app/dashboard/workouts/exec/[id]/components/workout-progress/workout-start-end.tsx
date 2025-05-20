'use client'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'

import { useWorkoutStartEnd } from './use-start-end-workout'

type WorkoutStartEndProps = {
  totalExercises: number
  totalCompleted: number
}

export const WorkoutStartEnd = ({ totalExercises, totalCompleted }: WorkoutStartEndProps) => {
  const { createSession, updateSession, data, formatted, isLoading, isSuccess, sessionIsLoading } = useWorkoutStartEnd()

  if (isLoading || sessionIsLoading || !isSuccess)
    return (
      <Button variant="default" className="group relative overflow-hidden" disabled>
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-22" />
      </Button>
    )

  return (
    <div>
      {(!data?.startTime || !data) && (
        <Button
          variant="default"
          className="group relative overflow-hidden text-wrap"
          disabled={totalExercises === 0}
          onClick={createSession}
        >
          <Icon name="Play" />
          <span className="text-wrap">Iniciar treino</span>
        </Button>
      )}
      {data?.startTime && !data?.endTime && (
        <Button
          variant="default"
          className="group relative overflow-hidden text-wrap"
          disabled={totalCompleted !== totalExercises}
          onClick={() => updateSession(data?.id)}
        >
          <Icon name="CircleStop" />
          <span className="text-wrap">Finalizar treino</span>
        </Button>
      )}
      {data?.startTime && data?.endTime && (
        <Button
          disabled
          variant="default"
          className="group relative overflow-hidden border border-green-700 bg-green-100 text-wrap text-green-700"
        >
          <span className="text-wrap">Treino diário concluído - {formatted}</span>
        </Button>
      )}
    </div>
  )
}
