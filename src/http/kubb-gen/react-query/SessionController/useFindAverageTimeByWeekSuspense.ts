import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { findAverageTimeByWeek } from '../../clients/SessionController/findAverageTimeByWeek'
import type {
  FindAverageTimeByWeekQueryResponseType,
  FindAverageTimeByWeek400Type,
  FindAverageTimeByWeek404Type,
} from '../../types/FindAverageTimeByWeekType'

export const findAverageTimeByWeekSuspenseQueryKey = () => [{ url: '/session/avg-time-by-week' }] as const

export type FindAverageTimeByWeekSuspenseQueryKey = ReturnType<typeof findAverageTimeByWeekSuspenseQueryKey>

export function findAverageTimeByWeekSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findAverageTimeByWeekSuspenseQueryKey()
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
export function useFindAverageTimeByWeekSuspense<
  TData = FindAverageTimeByWeekQueryResponseType,
  TQueryData = FindAverageTimeByWeekQueryResponseType,
  TQueryKey extends QueryKey = FindAverageTimeByWeekSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FindAverageTimeByWeekQueryResponseType,
        ResponseErrorConfig<FindAverageTimeByWeek400Type | FindAverageTimeByWeek404Type>,
        TData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findAverageTimeByWeekSuspenseQueryKey()

  const query = useSuspenseQuery(
    {
      ...(findAverageTimeByWeekSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<FindAverageTimeByWeek400Type | FindAverageTimeByWeek404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
