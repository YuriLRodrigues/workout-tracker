import { notFound } from 'next/navigation'
import type React from 'react'
import { Suspense } from 'react'

import { ExercisesList, ExercisesListSkeleton } from './components/exercises-list'
import { WorkoutDetails, WorkoutDetailsSkeleton } from './components/workout-details'
import { WorkoutProgress, WorkoutProgressSkeleton } from './components/workout-progress'
import { Container } from '@/components/interface/container'

type ExecWorkoutPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function ExecWorkoutPage({ params }: ExecWorkoutPageProps) {
  const { id } = await params
  if (!id) notFound()

  return (
    <Container.Content className="@container">
      <Suspense fallback={<WorkoutDetailsSkeleton />}>
        <WorkoutDetails id={id} />
      </Suspense>
      <div className="w-full space-y-6">
        <Suspense fallback={<WorkoutProgressSkeleton />}>
          <WorkoutProgress workoutId={id} />
        </Suspense>
        <Suspense fallback={<ExercisesListSkeleton />}>
          <ExercisesList workoutId={id} />
        </Suspense>
      </div>
    </Container.Content>
  )
}
