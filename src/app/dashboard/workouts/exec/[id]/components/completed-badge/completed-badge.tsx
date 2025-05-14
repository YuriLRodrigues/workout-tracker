'use client'

import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

import { findLogTodayByExerciseIdQueryKey, useFindLogTodayByExerciseId } from '@/http/kubb-gen'

type CompletedBadgeProps = {
  exerciseId: string
}

export const CompletedBadge = ({ exerciseId }: CompletedBadgeProps) => {
  const { data, isLoading } = useFindLogTodayByExerciseId(
    { exerciseId },
    { query: { queryKey: findLogTodayByExerciseIdQueryKey({ exerciseId }) } },
  )

  if (isLoading) {
    return <Skeleton className="h-5 w-18" />
  }

  return (
    <>
      {data?.id && <Badge className="border border-green-600 bg-green-100 text-green-600">Completo</Badge>}
      {(!data?.id || !data) && (
        <Badge className="border border-neutral-200 bg-neutral-100 text-neutral-800 dark:border-neutral-400 dark:bg-neutral-500 dark:text-neutral-100">
          Pendente
        </Badge>
      )}
    </>
  )
}
