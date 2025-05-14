import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { findTotalSeriesByWeek } from '../../clients/SessionController/findTotalSeriesByWeek'
import type {
  FindTotalSeriesByWeekQueryResponseType,
  FindTotalSeriesByWeek400Type,
  FindTotalSeriesByWeek404Type,
} from '../../types/FindTotalSeriesByWeekType'

export const findTotalSeriesByWeekSuspenseQueryKey = () => [{ url: '/session/total-series-by-week' }] as const

export type FindTotalSeriesByWeekSuspenseQueryKey = ReturnType<typeof findTotalSeriesByWeekSuspenseQueryKey>

export function findTotalSeriesByWeekSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findTotalSeriesByWeekSuspenseQueryKey()
  return queryOptions<
    FindTotalSeriesByWeekQueryResponseType,
    ResponseErrorConfig<FindTotalSeriesByWeek400Type | FindTotalSeriesByWeek404Type>,
    FindTotalSeriesByWeekQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findTotalSeriesByWeek(config)
    },
  })
}

/**
 * {@link /session/total-series-by-week}
 */
export function useFindTotalSeriesByWeekSuspense<
  TData = FindTotalSeriesByWeekQueryResponseType,
  TQueryData = FindTotalSeriesByWeekQueryResponseType,
  TQueryKey extends QueryKey = FindTotalSeriesByWeekSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FindTotalSeriesByWeekQueryResponseType,
        ResponseErrorConfig<FindTotalSeriesByWeek400Type | FindTotalSeriesByWeek404Type>,
        TData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findTotalSeriesByWeekSuspenseQueryKey()

  const query = useSuspenseQuery(
    {
      ...(findTotalSeriesByWeekSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<FindTotalSeriesByWeek400Type | FindTotalSeriesByWeek404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
