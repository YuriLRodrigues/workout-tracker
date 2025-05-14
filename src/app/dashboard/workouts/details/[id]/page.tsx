import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { ExercisesList, ExercisesListSkeleton } from './components/exercises-list'
import { WorkoutHeader, WorkoutHeaderSkeleton } from './components/workout-header'
import { Container } from '@/components/interface/container'

interface TreinoPageProps {
  params: Promise<{
    id?: string
  }>
  searchParams: Promise<{
    limit?: number
    page?: number
  }>
}

export default async function WorkoutPage({ params, searchParams }: TreinoPageProps) {
  const { id } = await params
  if (!id) notFound()

  const { limit, page } = await searchParams

  return (
    <Container.Content className="@container">
      <Suspense fallback={<WorkoutHeaderSkeleton />}>
        <WorkoutHeader id={id} />
      </Suspense>

      <Suspense fallback={<ExercisesListSkeleton />}>
        <ExercisesList workoutId={id} limit={limit} page={page} />
      </Suspense>
    </Container.Content>
  )
}
