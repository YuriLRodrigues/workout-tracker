import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { findTotalSeriesByWeek } from '../../clients/SessionController/findTotalSeriesByWeek'
import type {
  FindTotalSeriesByWeekQueryResponseType,
  FindTotalSeriesByWeek400Type,
  FindTotalSeriesByWeek404Type,
} from '../../types/FindTotalSeriesByWeekType'

export const findTotalSeriesByWeekQueryKey = () => [{ url: '/session/total-series-by-week' }] as const

export type FindTotalSeriesByWeekQueryKey = ReturnType<typeof findTotalSeriesByWeekQueryKey>

export function findTotalSeriesByWeekQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = findTotalSeriesByWeekQueryKey()
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
export function useFindTotalSeriesByWeek<
  TData = FindTotalSeriesByWeekQueryResponseType,
  TQueryData = FindTotalSeriesByWeekQueryResponseType,
  TQueryKey extends QueryKey = FindTotalSeriesByWeekQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        FindTotalSeriesByWeekQueryResponseType,
        ResponseErrorConfig<FindTotalSeriesByWeek400Type | FindTotalSeriesByWeek404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findTotalSeriesByWeekQueryKey()

  const query = useQuery(
    {
      ...(findTotalSeriesByWeekQueryOptions(config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<TData, ResponseErrorConfig<FindTotalSeriesByWeek400Type | FindTotalSeriesByWeek404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
