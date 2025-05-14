import { WorkoutCard, WorkoutCardSkeleton } from '@/app/dashboard/components/workout-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import { ScrollArea } from '@/components/ui/scroll-area'

import { findAllWorkoutsByUserId } from '@/http/kubb-gen'
import { icons } from 'lucide-react'

export const PlayWorkoutList = async () => {
  const { results: workouts } = await findAllWorkoutsByUserId({ params: { limit: 1000 } })

  if (!workouts || workouts.length === 0) return <EmptyPlayWorkoutList />

  return (
    <Card className="from-background to-muted/30 animate-fade-up animate-once @container col-span-4 border-none bg-gradient-to-br shadow-md">
      <CardHeader>
        <CardTitle>Iniciar Treino</CardTitle>
        <CardDescription>Selecione o treino que deseja realizar hoje</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid">
          <ScrollArea className="max-h-[33vh] w-full transition-all duration-300 hover:px-3" scrollHideDelay={0}>
            <div className="grid gap-4 @xs:grid-cols-2 @xl:grid-cols-3 @3xl:grid-cols-4">
              {workouts?.map((workout) => (
                <WorkoutCard
                  key={workout.id}
                  name={workout.name}
                  description={workout.description}
                  iconName={workout.icon as keyof typeof icons}
                  color={workout.color}
                  href={`/dashboard/workouts/exec/${workout.id}`}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}

const EmptyPlayWorkoutList = () => {
  return (
    <Card className="from-background to-muted/30 animate-fade-up animate-once col-span-4 border-none bg-gradient-to-br shadow-md">
      <CardHeader>
        <CardTitle>Iniciar Treino</CardTitle>
        <CardDescription>Selecione o treino que deseja realizar hoje</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mx-auto w-full space-y-2 border-none bg-transparent shadow-none">
          <div className="text-center">
            <div className="bg-muted mx-auto flex h-20 w-20 items-center justify-center rounded-full">
              <Icon name="CircleAlert" className="text-muted-foreground h-10 w-10" />
            </div>
            <p className="mt-4 text-xl">Nenhum treino disponível</p>
            <p className="text-muted-foreground">Você ainda não registrou nenhum treino no sistema.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="border-muted-foreground/50 rounded-lg border border-dashed p-6 text-center">
              <p className="text-muted-foreground text-sm">
                Para começar, inicie um treino e registre seus exercícios. Assim, você poderá acompanhar sua evolução
                por aqui.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const PlayWorkoutListSkeleton = () => {
  return (
    <Card className="from-background to-muted/30 animate-fade-up animate-once @container col-span-4 border-none bg-gradient-to-br shadow-md">
      <CardHeader>
        <CardTitle>Iniciar Treino</CardTitle>
        <CardDescription>Selecione o treino que deseja realizar hoje</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid">
          <ScrollArea scrollHideDelay={10} className="max-h-[33vh] w-full transition-all duration-300 hover:px-3">
            <div className="grid gap-4 @xs:grid-cols-2 @xl:grid-cols-3 @3xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <WorkoutCardSkeleton key={i} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}
