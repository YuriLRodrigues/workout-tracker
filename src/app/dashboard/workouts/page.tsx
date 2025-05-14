import { Suspense } from 'react'

import { CreateWorkout } from './components/create-workout'
import { PaginationWorkouts } from './components/pagination-workouts'
import { WorkoutsList, WorkoutsListSkeleton } from './components/workouts-list'
import { Container } from '@/components/interface/container'

type WorkoutsPageProps = {
  searchParams: Promise<{
    limit: number
    page: number
  }>
}

export default async function WorkoutsPage({ searchParams }: WorkoutsPageProps) {
  const { limit, page } = await searchParams

  return (
    <Container.Content>
      <Container.Header>
        <Container.Title>Meus Treinos</Container.Title>
        <Container.Description>
          Aqui estão todos os seus treinos. Gerencie, acompanhe e continue evoluindo!
        </Container.Description>
      </Container.Header>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <CreateWorkout />
      </div>

      <Suspense key={page} fallback={<WorkoutsListSkeleton />}>
        <WorkoutsList limit={limit} page={page} />
      </Suspense>

      <Suspense fallback={null}>
        <PaginationWorkouts limit={limit} page={page} />
      </Suspense>
    </Container.Content>
  )
}
