import Link from 'next/link'
import { Suspense } from 'react'

import { MetricsCard } from '@/app/dashboard/components/metrics-card'
import { NumberTicker } from '@/components/magicui/number-ticker'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

import { ExecutionType } from '@/@types/exercise'
import { findAllExercisesByWorkoutId } from '@/http/kubb-gen'
import { mappingMuscleType } from '@/utils/mappings'

import { CompletedBadge } from '../completed-badge/completed-badge'
import { ExerciseVideoDialogSkeleton, ExerciseVideoDialog } from '../exercise-video-dialog'
import { SaveLogAccordion, SaveLogAccordionSkeleton } from '../save-logs'
import { ExerciseStats, ExerciseStatsSkeleton } from './exercise-stats'

type ExercisesListProps = {
  workoutId: string
}

export const ExercisesList = async ({ workoutId }: ExercisesListProps) => {
  const { results: exercises } = await findAllExercisesByWorkoutId({ workoutId })

  if (!exercises || exercises.length === 0) {
    return <NoExercisesFallback workoutId={workoutId} />
  }

  return (
    <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2 @min-5xl:grid-cols-3 @min-7xl:grid-cols-4">
      {exercises?.map((exercise) => (
        <Card key={exercise.id} className="border-none shadow-md">
          <CardHeader className="space-y-2">
            <div className="flex w-full justify-between gap-3 sm:gap-8">
              <div className="space-y-1.5">
                <CardTitle className="line-clamp-2 first-letter:uppercase">{exercise.name}</CardTitle>
                <CardDescription>{mappingMuscleType[exercise.muscleType]}</CardDescription>
              </div>
              <ExerciseVideoDialog videoReference={exercise.videoReference} />
            </div>
            <CompletedBadge exerciseId={exercise.id} />
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <MetricsCard.Content>
                <MetricsCard.Title className="text-muted-foreground">Séries</MetricsCard.Title>
                <MetricsCard.Description className="font-medium">
                  <NumberTicker value={exercise.targetSets} />
                </MetricsCard.Description>
              </MetricsCard.Content>
              <MetricsCard.Content>
                <MetricsCard.Title className="text-muted-foreground">
                  {exercise.executionType == 'REPETITION' ? 'Repetições' : 'Tempo'}
                </MetricsCard.Title>
                <MetricsCard.Description className="font-medium">
                  <NumberTicker value={exercise.targetRepetitions} />
                </MetricsCard.Description>
              </MetricsCard.Content>
              <MetricsCard.Content className="col-span-1 @2xs:col-span-2 @min-sm:col-span-2 @xl:col-span-2 @3xl:col-span-1">
                <MetricsCard.Title className="text-muted-foreground">Tempo de descanso</MetricsCard.Title>
                <MetricsCard.Description className="font-medium">
                  <NumberTicker value={exercise.targetResTime} />
                </MetricsCard.Description>
              </MetricsCard.Content>
            </div>
            <Separator />

            <Suspense fallback={<SaveLogAccordionSkeleton />}>
              <SaveLogAccordion
                exerciseId={exercise.id}
                workoutId={workoutId}
                executionType={exercise.executionType as ExecutionType}
              />
            </Suspense>

            <Separator />

            <Suspense fallback={<ExerciseStatsSkeleton />}>
              <ExerciseStats lastWeight={exercise.lastWeight} maxWeight={exercise.maxWeight} />
            </Suspense>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export const NoExercisesFallback = ({ workoutId }: ExercisesListProps) => {
  return (
    <div className="relative flex min-h-[40vh] items-center justify-center">
      <Card className="flex w-full max-w-full flex-col items-center justify-center sm:min-h-[300px]">
        <CardHeader className="w-full *:text-center">
          <CardTitle>Nenhum exercício adicionado</CardTitle>
          <CardDescription>Parece que você não adicionou nenhum exercício ao seu treino ainda</CardDescription>
        </CardHeader>
        <CardContent className="mx-auto w-fit">
          <Link href={`/dashboard/workouts/${workoutId}`}>
            <Button variant="outline" effect="shine" className="flex flex-wrap items-center gap-2">
              <Icon name="DiamondPlus" />
              <span className="text-wrap">Adicionar exercício</span>
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

export const ExercisesListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2 @min-5xl:grid-cols-3 @min-7xl:grid-cols-4">
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="border-none shadow-md">
          <CardHeader className="pb-2">
            <div className="flex w-full justify-between gap-3 sm:gap-8">
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32 max-w-full sm:w-50" />
                <Skeleton className="h-4 w-20 max-w-full" />
              </div>
              <ExerciseVideoDialogSkeleton />
            </div>
            <Skeleton className="h-5 w-18" />
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <MetricsCard.Content>
                <MetricsCard.Title className="text-muted-foreground">Séries</MetricsCard.Title>
                <Skeleton className="h-4 w-9" />
              </MetricsCard.Content>
              <MetricsCard.Content>
                <MetricsCard.Title className="text-muted-foreground">Repetições</MetricsCard.Title>
                <Skeleton className="h-4 w-9" />
              </MetricsCard.Content>
              <MetricsCard.Content className="col-span-1 @2xs:col-span-2 @min-sm:col-span-2 @xl:col-span-2 @3xl:col-span-1">
                <MetricsCard.Title className="text-muted-foreground">Tempo de descanso</MetricsCard.Title>
                <Skeleton className="h-4 w-9" />
              </MetricsCard.Content>
            </div>
            <Separator />
            <SaveLogAccordionSkeleton />
            <Separator />
            <ExerciseStatsSkeleton />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
