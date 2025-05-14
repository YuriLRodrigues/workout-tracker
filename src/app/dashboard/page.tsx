import Link from 'next/link'
import { Suspense } from 'react'

import { RecentlyHistory, RecentlyHistorySkeleton } from './components/history/history'
import { PlayWorkoutList, PlayWorkoutListSkeleton } from './components/play-workout'
import { AvgWorkoutByWeek } from './components/stats-cards/avg-workout-by-week'
import { StatsCardSkeleton } from './components/stats-cards/stats-card-skeleton'
import { TotalLoadByWeek } from './components/stats-cards/total-load-by-week'
import { TotalSeriesByWeek } from './components/stats-cards/total-series-by-week'
import { AvgTimeByWeek } from '@/app/dashboard/components/stats-cards/avg-time-by-week/avg-time-by-week'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { authToken } from '@/auth'

export default async function DashboardPage() {
  const user = await authToken()

  return (
    <section className="mx-auto space-y-8 py-6">
      <article className="flex flex-col gap-2">
        <h1 className="animate-fade-right animate-once text-3xl font-bold tracking-tight first-letter:uppercase">
          Olá, {user?.name}!
        </h1>
        <p className="text-muted-foreground animate-fade-right animate-once animate-delay-100">
          Aqui você pode acompanhar seu progresso e suas conquistas.
        </p>
      </article>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<StatsCardSkeleton />}>
          <AvgWorkoutByWeek />
        </Suspense>
        <Suspense fallback={<StatsCardSkeleton />}>
          <AvgTimeByWeek />
        </Suspense>
        <Suspense fallback={<StatsCardSkeleton />}>
          <TotalLoadByWeek />
        </Suspense>
        <Suspense fallback={<StatsCardSkeleton />}>
          <TotalSeriesByWeek />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Suspense fallback={<PlayWorkoutListSkeleton />}>
          <PlayWorkoutList />
        </Suspense>
      </div>
      <Tabs defaultValue="history" className="mb-3 w-full">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-[calc(100%-120px)]">
            <ScrollArea className="w-full">
              <TabsList className="mb-2 inline-flex h-10 w-max">
                <TabsTrigger value="history">Histórico Recente</TabsTrigger>
                <TabsTrigger value="progress" disabled>
                  Progresso (em breve)
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" className="h-2 opacity-100" />
            </ScrollArea>
          </div>
          <Button asChild variant="outline" effect="shineHover" className="self-end px-4 py-2 sm:ml-auto sm:self-auto">
            <Link href="/dashboard/history">Ver tudo</Link>
          </Button>
        </div>
        <TabsContent value="history" className="flex flex-col gap-3">
          <Suspense fallback={<RecentlyHistorySkeleton />}>
            <RecentlyHistory />
          </Suspense>
        </TabsContent>
      </Tabs>

      {/* <TabsContent value="progresso" >
            <Card className="from-background to-muted/30 border-none bg-gradient-to-br shadow-md">
              <CardHeader>
                <CardTitle>Evolução de Carga</CardTitle>
                <CardDescription>Progresso dos últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <ProgressChart />
                <div className="text-muted-foreground mt-2 flex justify-between text-sm">
                  <div>Semana 1</div>
                  <div>Semana 2</div>
                  <div>Semana 3</div>
                  <div>Semana 4</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}
    </section>
  )
}
