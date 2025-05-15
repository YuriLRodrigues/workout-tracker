import Link from 'next/link'

import { MetricsCard } from '../../../components/metrics-card'
import { Container } from '@/components/interface/container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExpandableText } from '@/components/ui/expandable-text'
import { Icon } from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'

import { findAllWorkoutsByUserId } from '@/http/kubb-gen'
import { cn } from '@/lib/utils'
import { icons } from 'lucide-react'

import { DeleteWorkout, DeleteWorkoutSkeleton } from './delete-workout'

type WorkoutsListProps = {
  limit?: number
  page?: number
}

export const WorkoutsList = async ({ limit, page }: WorkoutsListProps) => {
  const { results } = await findAllWorkoutsByUserId(
    { params: { limit, page } },
    { next: { tags: ['findAllWorkoutsByUserId'] } },
  )

  if (!results || results.length === 0) {
    return <EmptyWorkoutsList />
  }

  return (
    <Container.Animated
      SkeletonBase={<WorkoutsListSkeleton />}
      className={cn(
        '@container grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
        (results?.length === 0 || !results) && 'min-h-[69vh] items-center justify-center',
      )}
    >
      {results.map((workout) => {
        const iconName = workout.icon as keyof typeof icons
        return (
          <Card
            key={workout.id}
            className="from-background to-muted/30 group animate-fade-up animate-once h-full border-none bg-gradient-to-br shadow-md transition-all hover:shadow-lg"
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className={`rounded-full p-2 ${workout.color}`}>
                    <Icon name={iconName} className={cn('h-5 w-5', workout.color)} />
                  </div>
                  <div className="space-y-1">
                    <ExpandableText maxLines={1} type="dot" asChild>
                      <CardTitle className="first-letter:uppercase">{workout.name}</CardTitle>
                    </ExpandableText>

                    <ExpandableText asChild maxLines={1} type="dot">
                      <CardDescription className="first-letter:uppercase">{workout.description}</CardDescription>
                    </ExpandableText>
                  </div>
                </div>
                <div className="space-y-3">
                  {/* <Button variant="ghost" size="icon" className="group-hover:animate-caret-blink transition-all">
                    <Icon name="Pencil" className="size-4" />
                  </Button> */}
                  <DeleteWorkout id={workout.id} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="mt-auto flex flex-col gap-y-5">
              <div className="grid grid-cols-1 gap-4 text-sm @2xs:grid-cols-2 @min-sm:grid-cols-2 @xl:grid-cols-2 @min-6xl:grid-cols-3">
                <MetricsCard.Content>
                  <MetricsCard.Title className="text-muted-foreground">Exercícios</MetricsCard.Title>
                  <MetricsCard.Description className="font-medium">{workout.totalExercises}</MetricsCard.Description>
                </MetricsCard.Content>
                <MetricsCard.Content>
                  <MetricsCard.Title className="text-muted-foreground">Séries</MetricsCard.Title>
                  <MetricsCard.Description className="font-medium">{workout.totalSets}</MetricsCard.Description>
                </MetricsCard.Content>
                <MetricsCard.Content className="col-span-1 @2xs:col-span-2 @min-sm:col-span-2 @xl:col-span-2 @3xl:col-span-1">
                  <MetricsCard.Title className="text-muted-foreground">Repetições</MetricsCard.Title>
                  <MetricsCard.Description className="font-medium">{workout.totalRepetitions}</MetricsCard.Description>
                </MetricsCard.Content>
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm" asChild className="group flex-1">
                  <Link href={`/dashboard/workouts/details/${workout.id}`}>
                    <span>Detalhes</span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="group flex-1">
                  <Link href={`/dashboard/workouts/exec/${workout.id}`}>
                    <Icon name="Play" className="group-hover:text-primary mr-2 h-4 w-4 transition-colors" />
                    <span>Iniciar</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </Container.Animated>
  )
}

const EmptyWorkoutsList = () => {
  return (
    <section className="flex items-center justify-center sm:min-h-[65vh]">
      <Card className="from-background to-muted/30 animate-fade-up animate-once col-span-full mx-auto h-fit max-h-fit max-w-md border-none bg-gradient-to-br shadow-md">
        <CardHeader className="text-center">
          <div className="bg-muted mx-auto flex h-20 w-20 items-center justify-center rounded-full">
            <Icon name="Dumbbell" className="text-muted-foreground h-10 w-10" />
          </div>
          <CardTitle className="mt-4 text-xl">Nenhum treino encontrado</CardTitle>
          <CardDescription>
            Você ainda não possui nenhum treino cadastrado. Comece criando seu primeiro treino agora.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="border-muted-foreground/50 rounded-lg border border-dashed p-6 text-center">
            <p className="text-muted-foreground text-sm">
              Crie treinos personalizados com exercícios, séries e repetições para acompanhar seu progresso.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export const WorkoutsListSkeleton = () => {
  return (
    <section className="@container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(9)].map((_, index) => {
        return (
          <Card
            key={index}
            className="from-background to-muted/30 group animate-fade-up animate-once border-none bg-gradient-to-br shadow-md transition-all hover:shadow-lg"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full p-2">
                    <Skeleton className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle>
                      <Skeleton className="h-5 w-20" />
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      <Skeleton className="h-4 w-32" />
                    </CardDescription>
                  </div>
                </div>
                <DeleteWorkoutSkeleton />
              </div>
            </CardHeader>
            <CardContent className="mt-auto flex flex-col gap-y-5">
              <div className="grid grid-cols-1 gap-4 text-sm @2xs:grid-cols-2 @min-sm:grid-cols-2 @xl:grid-cols-2 @min-6xl:grid-cols-3">
                <MetricsCard.Content>
                  <MetricsCard.Title className="text-muted-foreground">Exercícios</MetricsCard.Title>
                  <Skeleton className="h-5 w-10" />
                </MetricsCard.Content>
                <MetricsCard.Content>
                  <MetricsCard.Title className="text-muted-foreground">Séries</MetricsCard.Title>
                  <Skeleton className="h-5 w-10" />
                </MetricsCard.Content>
                <MetricsCard.Content className="col-span-1 @2xs:col-span-2 @min-sm:col-span-2 @xl:col-span-2 @3xl:col-span-1">
                  <MetricsCard.Title className="text-muted-foreground">Repetições</MetricsCard.Title>
                  <Skeleton className="h-5 w-10" />
                </MetricsCard.Content>
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm" asChild className="group flex-1">
                  <span>Detalhes</span>
                </Button>
                <Button variant="outline" size="sm" asChild disabled className="group flex-1">
                  <div className="flex items-center gap-2">
                    <Icon name="Play" className="group-hover:text-primary mr-2 h-4 w-4 transition-colors" />
                    <span>Iniciar</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}
