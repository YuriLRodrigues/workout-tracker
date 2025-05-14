import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { findAverageWorkoutByWeek } from '../../clients/SessionController/findAverageWorkoutByWeek'
import type {
  FindAverageWorkoutByWeekQueryResponseType,
  FindAverageWorkoutByWeek400Type,
  FindAverageWorkoutByWeek404Type,
} from '../../types/FindAverageWorkoutByWeekType'

export const findAverageWorkoutByWeekQueryKey = () => [{ url: '/session/avg-workout-by-week' }] as const

export type FindAverageWorkoutByWeekQueryKey = ReturnType<typeof findAverageWorkoutByWeekQueryKey>

export function findAverageWorkoutByWeekQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = findAverageWorkoutByWeekQueryKey()
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
export function useFindAverageWorkoutByWeek<
  TData = FindAverageWorkoutByWeekQueryResponseType,
  TQueryData = FindAverageWorkoutByWeekQueryResponseType,
  TQueryKey extends QueryKey = FindAverageWorkoutByWeekQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        FindAverageWorkoutByWeekQueryResponseType,
        ResponseErrorConfig<FindAverageWorkoutByWeek400Type | FindAverageWorkoutByWeek404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findAverageWorkoutByWeekQueryKey()

  const query = useQuery(
    {
      ...(findAverageWorkoutByWeekQueryOptions(config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<TData, ResponseErrorConfig<FindAverageWorkoutByWeek400Type | FindAverageWorkoutByWeek404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
