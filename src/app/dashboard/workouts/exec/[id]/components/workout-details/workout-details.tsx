import Link from 'next/link'

import { Container } from '@/components/interface/container'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'

import { findWorkoutById } from '@/http/kubb-gen'
import { cn } from '@/lib/utils'
import { icons } from 'lucide-react'

type WorkoutDetailsProps = {
  id: string
}

export const WorkoutDetails = async ({ id }: WorkoutDetailsProps) => {
  const { color, description, icon, name } = await findWorkoutById({
    id,
  })

  return (
    <Container.Header className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <Button variant="outline" size="icon" asChild>
        <Link href="/dashboard/workouts">
          <Icon name="ArrowLeft" className="h-5 w-5" />
        </Link>
      </Button>
      <div className="flex flex-wrap items-center gap-3">
        <div className={cn('size-fit rounded-full bg-neutral-100 p-2 dark:bg-zinc-800', color)}>
          <Icon name={icon as keyof typeof icons} className="h-5 w-5" />
        </div>
        <div className="space-y-2">
          <Container.Title className="line-clamp-2">{name}</Container.Title>
          <Container.Description className="line-clamp-2">{description}</Container.Description>
        </div>
      </div>
    </Container.Header>
  )
}

export const WorkoutDetailsSkeleton = () => {
  return (
    <Container.Header className="flex flex-col gap-x-5 gap-y-2 sm:flex-row sm:items-center">
      <Button variant="outline" size="icon" asChild>
        <Link href="/dashboard/workouts">
          <Icon name="ArrowLeft" className="h-5 w-5" />
        </Link>
      </Button>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="size-fit rounded-full bg-neutral-100 p-2 dark:bg-zinc-800">
          <Skeleton className="h-5 w-5" />
        </div>
        <div className="space-y-2">
          <Container.Title animationType="text" as="div">
            <Skeleton className="h-10 w-60 max-w-full" />
          </Container.Title>
          <Skeleton className="h-5 w-32" />
        </div>
      </div>
    </Container.Header>
  )
}
