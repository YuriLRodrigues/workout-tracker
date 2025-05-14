import Link from 'next/link'
import { Suspense } from 'react'

import { Container } from '@/components/interface/container'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'

import { findWorkoutById } from '@/http/kubb-gen'
import { cn } from '@/lib/utils'
import { icons } from 'lucide-react'

import { CreateExercise, CreateExerciseSkeleton } from '../create-exercise'

type WorkoutHeaderProps = {
  id: string
}

export const WorkoutHeader = async ({ id }: WorkoutHeaderProps) => {
  const { color, description, icon, name } = await findWorkoutById({
    id,
  })

  return (
    <Container.Header className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:flex-nowrap">
        <Link href="/dashboard/workouts" className="w-fit">
          <Button variant="outline" size="icon">
            <Icon name="ArrowLeft" className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <div className={cn('size-fit rounded-full bg-neutral-100 p-2 dark:bg-zinc-800', color)}>
            <Icon name={icon as keyof typeof icons} className="h-5 w-5" />
          </div>
          <div className="space-y-2">
            <Container.Title className="line-clamp-2">{name}</Container.Title>
            <Container.Description className="line-clamp-2">{description}</Container.Description>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href={`/dashboard/workouts/exec/${id}`} className="w-fit">
          <Button variant="outline" size="icon" className="flex w-fit items-center gap-2 p-2">
            <Icon name="Play" className="h-4 w-4" />
            <span className="text-wrap">Iniciar treino</span>{' '}
          </Button>
        </Link>
        <Suspense fallback={<CreateExerciseSkeleton />}>
          <CreateExercise />
        </Suspense>
      </div>
    </Container.Header>
  )
}

export const WorkoutHeaderSkeleton = () => {
  return (
    <Container.Header className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:flex-nowrap">
        <Button variant="outline" size="icon" asChild>
          <Link href="/treinos">
            <Icon name="ArrowLeft" className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <div className="size-fit rounded-full bg-neutral-100 p-2 dark:bg-zinc-800">
            <Skeleton className="h-4 w-4" />
          </div>
          <div className="space-y-2">
            <Container.Title animationType="text" as="div">
              <Skeleton className="h-10 w-36 max-w-full sm:w-60" />
            </Container.Title>
            <Skeleton className="h-5 w-32 max-w-full" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-9 w-48" />
      </div>
    </Container.Header>
  )
}
