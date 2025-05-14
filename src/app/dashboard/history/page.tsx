import { Suspense } from 'react'

import { Frequency } from './components/frequency'
import { HistoryCardSkeleton } from './components/history-card-skeleton'
import { HistoryList, HistoryListSkeleton } from './components/history-list'
import { PaginationHistory } from './components/pagination-history'
import { TotalAndAvgTime } from './components/total-and-avg-time'
import { TotalWorkouts } from './components/total-workouts'
import { WorkoutsTabs, WorkoutsTabsSkeleton } from './components/workouts-tabs'
import { Container } from '@/components/interface/container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs } from '@/components/ui/tabs'

type HistoryPageProps = {
  searchParams: Promise<{
    page?: number
    limit?: number
    query?: string
  }>
}

export default async function HistoryPage({ searchParams }: HistoryPageProps) {
  const { limit, page, query } = await searchParams

  return (
    <Container.Content className="@container">
      <Container.Header>
        <Container.Title>Histórico de Treinos</Container.Title>
        <Container.Description>Visualize seu histórico de treinos e desempenho</Container.Description>
      </Container.Header>

      <div className="grid gap-4 @sm:grid-cols-2 @3xl:grid-cols-3">
        <Suspense fallback={<HistoryCardSkeleton />}>
          <TotalWorkouts />
        </Suspense>
        <Suspense fallback={<HistoryCardSkeleton />}>
          <TotalAndAvgTime />
        </Suspense>
        <Suspense fallback={<HistoryCardSkeleton />}>
          <Frequency />
        </Suspense>
      </div>

      <Tabs defaultValue="all" className="mb-3 w-full">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full">
            <ScrollArea className="w-full">
              <Suspense fallback={<WorkoutsTabsSkeleton />}>
                <WorkoutsTabs query={query} />
              </Suspense>
              <ScrollBar orientation="horizontal" className="h-2 opacity-100" />
            </ScrollArea>
          </div>
        </div>
        <div className="mt-6 flex-1 outline-none">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Treinos</CardTitle>
              <CardDescription>Todos os treinos realizados</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Suspense key={page} fallback={<HistoryListSkeleton />}>
                <HistoryList limit={limit} page={page} query={query || undefined} />
              </Suspense>
            </CardContent>
          </Card>
          <Suspense fallback={null}>
            <PaginationHistory limit={limit} page={page} query={query} />
          </Suspense>
        </div>
      </Tabs>
    </Container.Content>
  )
}
