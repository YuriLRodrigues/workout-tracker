import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { findAverageWorkoutByWeek } from '../../clients/SessionController/findAverageWorkoutByWeek'
import type {
  FindAverageWorkoutByWeekQueryResponseType,
  FindAverageWorkoutByWeek400Type,
  FindAverageWorkoutByWeek404Type,
} from '../../types/FindAverageWorkoutByWeekType'

export const findAverageWorkoutByWeekSuspenseQueryKey = () => [{ url: '/session/avg-workout-by-week' }] as const

export type FindAverageWorkoutByWeekSuspenseQueryKey = ReturnType<typeof findAverageWorkoutByWeekSuspenseQueryKey>

export function findAverageWorkoutByWeekSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findAverageWorkoutByWeekSuspenseQueryKey()
  return queryOptions<
    FindAverageWorkoutByWeekQueryResponseType,
    ResponseErrorConfig<FindAverageWorkoutByWeek400Type | FindAverageWorkoutByWeek404Type>,
    FindAverageWorkoutByWeekQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findAverageWorkoutByWeek(config)
    },
  })
}

/**
 * {@link /session/avg-workout-by-week}
 */
export function useFindAverageWorkoutByWeekSuspense<
  TData = FindAverageWorkoutByWeekQueryResponseType,
  TQueryData = FindAverageWorkoutByWeekQueryResponseType,
  TQueryKey extends QueryKey = FindAverageWorkoutByWeekSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FindAverageWorkoutByWeekQueryResponseType,
        ResponseErrorConfig<FindAverageWorkoutByWeek400Type | FindAverageWorkoutByWeek404Type>,
        TData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findAverageWorkoutByWeekSuspenseQueryKey()

  const query = useSuspenseQuery(
    {
      ...(findAverageWorkoutByWeekSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<FindAverageWorkoutByWeek400Type | FindAverageWorkoutByWeek404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
