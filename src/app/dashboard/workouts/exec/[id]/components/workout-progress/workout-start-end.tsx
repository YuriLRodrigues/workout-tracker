'use client'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'

import { useWorkoutStartEnd } from './use-start-end-workout'

type WorkoutStartEndProps = {
  totalExercises: number
  totalCompleted: number
  sessionHasStarted?: {
    startTime?: Date | string
    endTime?: Date | string
    id?: string
  } | null
}

export const WorkoutStartEnd = ({ totalExercises, totalCompleted, sessionHasStarted }: WorkoutStartEndProps) => {
  const { createSession, updateSession, formatted, sessionIsLoading } = useWorkoutStartEnd({ sessionHasStarted })

  if (sessionIsLoading)
    return (
      <Button variant="default" className="group relative overflow-hidden" disabled>
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-22" />
      </Button>
    )

  return (
    <div>
      {(!sessionHasStarted?.startTime || !sessionHasStarted) && (
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
      {sessionHasStarted?.startTime && !sessionHasStarted?.endTime && (
        <Button
          variant="default"
          className="group relative overflow-hidden text-wrap"
          disabled={totalCompleted !== totalExercises}
          onClick={() => updateSession(sessionHasStarted?.id)}
        >
          <Icon name="CircleStop" />
          {totalCompleted !== totalExercises && (
            <span className="text-wrap">Finalizar treino (execuções obrigatórias)</span>
          )}
          {totalCompleted === totalExercises && <span className="text-wrap">Finalizar treino (disponível)</span>}
        </Button>
      )}
      {sessionHasStarted?.startTime && sessionHasStarted?.endTime && (
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
