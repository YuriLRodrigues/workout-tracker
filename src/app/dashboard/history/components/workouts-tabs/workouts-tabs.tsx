import Link from 'next/link'

import { Icon } from '@/components/ui/icon'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'

import { findAllWorkoutsByUserId } from '@/http/kubb-gen'

type WorkoutsTabsProps = {
  query?: string
}

export const WorkoutsTabs = async ({ query }: WorkoutsTabsProps) => {
  const { results: workouts } = await findAllWorkoutsByUserId(
    { params: { limit: 1000, page: 1 } },
    { next: { tags: ['findAllWorkoutsByUserId'] } },
  )

  const hasQuerySearch = !!query

  return (
    <TabsList className="mb-2 inline-flex h-10 w-max">
      <TabsTrigger value="all" data-state={!hasQuerySearch && 'active'}>
        <Link href="/dashboard/history" className="first-letter:uppercase">
          Todos os Treinos
        </Link>
      </TabsTrigger>
      {workouts?.map((workout) => (
        <TabsTrigger key={workout.id} value={workout.id} data-state={query === workout.id && 'active'} asChild>
          <Link href={`/dashboard/history?query=${workout.id}`} className="first-letter:uppercase">
            {workout.name}
          </Link>
        </TabsTrigger>
      ))}
    </TabsList>
  )
}

export const WorkoutsTabsSkeleton = () => {
  return (
    <TabsList className="mb-2 inline-flex h-10 w-max">
      <TabsTrigger value="all">Todos os Treinos</TabsTrigger>
      {[...Array(4)].map((_, i) => (
        <TabsTrigger key={i} value={i.toString()}>
          <span className="flex animate-pulse items-center gap-2">
            <Icon name="Loader" className="animate-spin" /> Carregando...
          </span>
        </TabsTrigger>
      ))}
    </TabsList>
  )
}
