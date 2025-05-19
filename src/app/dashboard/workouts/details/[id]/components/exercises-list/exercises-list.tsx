import { notFound } from 'next/navigation'

import { MetricsCard } from '@/app/dashboard/components/metrics-card'
import { Container } from '@/components/interface/container'
import { NumberTicker } from '@/components/magicui/number-ticker'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ExpandableText } from '@/components/ui/expandable-text'
import { Icon } from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'

import { ExecutionType, MuscleType } from '@/@types/exercise'
import { findAllExercisesByWorkoutId } from '@/http/kubb-gen'

import { DeleteExerciseButton } from '../delete-exercise/delete-exercise'
import { ExerciseLogs, ExerciseLogsSkeleton } from '../exercise-logs'
import { UpdateExercise } from '../update-exercise'
import { UpdateExerciseForm } from '../update-exercise/form'

type ExercisesListProps = {
  workoutId: string
  limit?: number
  page?: number
}

export const ExercisesList = async ({ workoutId, limit, page }: ExercisesListProps) => {
  if (!workoutId) notFound()

  const { results: exercises } = await findAllExercisesByWorkoutId(
    { workoutId, params: { limit, page } },
    { next: { tags: ['findAllExercisesByWorkoutId'] } },
  )

  if (!exercises || exercises.length === 0) {
    return <EmptyExercisesList />
  }

  return (
    <Container.Animated
      SkeletonBase={<ExercisesListSkeleton />}
      className="grid grid-cols-1 gap-4 @2xl:grid-cols-2 @min-5xl:grid-cols-3 @min-7xl:grid-cols-4"
    >
      {exercises.map((exercise) => (
        <Card
          key={exercise.id}
          className="from-background to-muted/30 group animate-fade-up animate-once flex h-full flex-col border-none bg-gradient-to-br shadow-md transition-all hover:shadow-lg"
        >
          <CardHeader className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <ExpandableText maxLines={1} type="dot" asChild>
                <CardTitle className="max-w-70 text-xl font-semibold first-letter:uppercase">{exercise.name}</CardTitle>
              </ExpandableText>
              <ExpandableText maxLines={2} type="dot" asChild>
                <CardDescription className="max-w-70 first-letter:uppercase">{exercise.description}</CardDescription>
              </ExpandableText>
            </div>
            <div className="flex items-center gap-2">
              <UpdateExercise>
                <UpdateExerciseForm
                  exerciseId={exercise.id}
                  defaultValues={{
                    description: exercise.description,
                    executionType: exercise.executionType as ExecutionType,
                    muscleType: exercise.muscleType as MuscleType,
                    name: exercise.name,
                    targetRepetitions: exercise.targetRepetitions,
                    targetResTime: exercise.targetResTime,
                    targetSets: exercise.targetSets,
                    videoReference: exercise.videoReference,
                  }}
                />
              </UpdateExercise>
              <DeleteExerciseButton id={exercise.id} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <MetricsCard.Content>
                <MetricsCard.Title className="text-muted-foreground">Séries</MetricsCard.Title>
                <MetricsCard.Description className="font-medium">
                  <NumberTicker value={exercise.targetSets} />
                </MetricsCard.Description>
              </MetricsCard.Content>
              <MetricsCard.Content>
                <MetricsCard.Title className="text-muted-foreground">
                  {exercise.executionType === 'REPETITION' ? 'Repetições' : 'Tempo'}
                </MetricsCard.Title>
                <MetricsCard.Description className="flex items-center gap-0.5 font-medium">
                  <NumberTicker value={exercise.targetRepetitions} />
                  <span>{exercise.executionType === 'TIME' && 's'}</span>
                </MetricsCard.Description>
              </MetricsCard.Content>
              <MetricsCard.Content className="col-span-1 @2xs:col-span-2 @min-sm:col-span-2 @xl:col-span-2 @3xl:col-span-1">
                <MetricsCard.Title className="text-muted-foreground">Tempo de descanso</MetricsCard.Title>
                <MetricsCard.Description className="font-medium">
                  <NumberTicker value={exercise.targetResTime} />
                </MetricsCard.Description>
              </MetricsCard.Content>
            </div>
          </CardContent>
          <CardFooter className="mt-auto">
            <Accordion
              className="flex w-full flex-col space-y-4"
              transition={{ type: 'tween', stiffness: 120, damping: 20 }}
            >
              <div className="space-y-0.5 *:text-center">
                <h2 className="text-lg first-letter:uppercase">{exercise.name}</h2>
                <p className="text-muted-foreground text-sm">Histórico de progresso</p>
              </div>
              <AccordionItem value="register-execution" className="space-y-4">
                <AccordionTrigger className="flex w-full flex-col items-center gap-3">
                  <Button effect="shine" variant="outline" className="mx-auto flex h-fit flex-wrap items-center gap-2">
                    <Icon name="Eye" className="h-4 w-4 group-data-expanded:hidden" />
                    <Icon name="EyeClosed" className="hidden h-4 w-4 group-data-expanded:block" />
                    <span className="text-wrap group-data-expanded:hidden">Visualizar registro de execuções</span>
                    <span className="hidden text-wrap group-data-expanded:block">Fechar registro de execuções</span>
                  </Button>
                </AccordionTrigger>
                <AccordionContent className="p-0">
                  <ExerciseLogs exerciseName={exercise.name} exerciseId={exercise.id} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardFooter>
        </Card>
      ))}
    </Container.Animated>
  )
}

const EmptyExercisesList = () => {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
      <Card className="from-background to-muted/30 animate-fade-up animate-once col-span-full mx-auto h-fit max-h-fit max-w-md border-none bg-gradient-to-br shadow-md">
        <CardHeader className="text-center">
          <div className="bg-muted mx-auto flex h-20 w-20 items-center justify-center rounded-full">
            <Icon name="Dumbbell" className="text-muted-foreground h-10 w-10" />
          </div>
          <CardTitle className="mt-4 text-xl">Nenhum exercício encontrado</CardTitle>
          <CardDescription>
            Você ainda não possui nenhum exercício nesse treino. Comece criando seu primeiro exercício agora.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="border-muted-foreground/50 rounded-lg border border-dashed p-6 text-center">
            <p className="text-muted-foreground text-sm">
              Crie exercícios personalizados para cada treino, contendo séries, cargas e referências.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export const ExercisesListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2 @min-5xl:grid-cols-3 @min-7xl:grid-cols-4">
      {[...Array(6)].map((_, index) => (
        <Card
          key={index}
          className="from-background to-muted/30 group animate-fade-up animate-once flex flex-col border-none bg-gradient-to-br shadow-md transition-all hover:shadow-lg"
        >
          <CardHeader className="flex flex-wrap items-start justify-between gap-3 pb-2">
            <div className="space-y-1">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="size-10 rounded-lg" />
              <Skeleton className="size-10 rounded-lg" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <MetricsCard.Content>
                <MetricsCard.Title className="text-muted-foreground">Séries</MetricsCard.Title>
                <Skeleton className="h-4 w-12" />
              </MetricsCard.Content>
              <MetricsCard.Content className="space-y-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-12" />
              </MetricsCard.Content>
              <MetricsCard.Content className="col-span-1 @2xs:col-span-2 @min-sm:col-span-2 @xl:col-span-2 @3xl:col-span-1">
                <MetricsCard.Title className="text-muted-foreground">Tempo de descanso</MetricsCard.Title>
                <Skeleton className="h-5 w-12" />
              </MetricsCard.Content>
            </div>
          </CardContent>
          <CardFooter className="mt-auto flex w-full flex-col items-center justify-center gap-1 space-y-1">
            <Skeleton className="mx-auto h-6 w-28 sm:w-50" />
            <Skeleton className="mx-auto h-4 w-28" />
            <ExerciseLogsSkeleton />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
