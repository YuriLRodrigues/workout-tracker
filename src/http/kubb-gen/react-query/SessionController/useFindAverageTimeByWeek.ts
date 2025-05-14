import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { findAverageTimeByWeek } from '../../clients/SessionController/findAverageTimeByWeek'
import type {
  FindAverageTimeByWeekQueryResponseType,
  FindAverageTimeByWeek400Type,
  FindAverageTimeByWeek404Type,
} from '../../types/FindAverageTimeByWeekType'

export const findAverageTimeByWeekQueryKey = () => [{ url: '/session/avg-time-by-week' }] as const

export type FindAverageTimeByWeekQueryKey = ReturnType<typeof findAverageTimeByWeekQueryKey>

export function findAverageTimeByWeekQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = findAverageTimeByWeekQueryKey()
  return queryOptions<
    FindAverageTimeByWeekQueryResponseType,
    ResponseErrorConfig<FindAverageTimeByWeek400Type | FindAverageTimeByWeek404Type>,
    FindAverageTimeByWeekQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findAverageTimeByWeek(config)
    },
  })
}

/**
 * {@link /session/avg-time-by-week}
 */
export function useFindAverageTimeByWeek<
  TData = FindAverageTimeByWeekQueryResponseType,
  TQueryData = FindAverageTimeByWeekQueryResponseType,
  TQueryKey extends QueryKey = FindAverageTimeByWeekQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        FindAverageTimeByWeekQueryResponseType,
        ResponseErrorConfig<FindAverageTimeByWeek400Type | FindAverageTimeByWeek404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findAverageTimeByWeekQueryKey()

  const query = useQuery(
    {
      ...(findAverageTimeByWeekQueryOptions(config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<TData, ResponseErrorConfig<FindAverageTimeByWeek400Type | FindAverageTimeByWeek404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
