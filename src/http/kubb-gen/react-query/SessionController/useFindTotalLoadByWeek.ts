import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { findTotalLoadByWeek } from '../../clients/SessionController/findTotalLoadByWeek'
import type {
  FindTotalLoadByWeekQueryResponseType,
  FindTotalLoadByWeek400Type,
  FindTotalLoadByWeek404Type,
} from '../../types/FindTotalLoadByWeekType'

export const findTotalLoadByWeekQueryKey = () => [{ url: '/session/total-load-by-week' }] as const

export type FindTotalLoadByWeekQueryKey = ReturnType<typeof findTotalLoadByWeekQueryKey>

export function findTotalLoadByWeekQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = findTotalLoadByWeekQueryKey()
  return queryOptions<
    FindTotalLoadByWeekQueryResponseType,
    ResponseErrorConfig<FindTotalLoadByWeek400Type | FindTotalLoadByWeek404Type>,
    FindTotalLoadByWeekQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findTotalLoadByWeek(config)
    },
  })
}

/**
 * {@link /session/total-load-by-week}
 */
export function useFindTotalLoadByWeek<
  TData = FindTotalLoadByWeekQueryResponseType,
  TQueryData = FindTotalLoadByWeekQueryResponseType,
  TQueryKey extends QueryKey = FindTotalLoadByWeekQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        FindTotalLoadByWeekQueryResponseType,
        ResponseErrorConfig<FindTotalLoadByWeek400Type | FindTotalLoadByWeek404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findTotalLoadByWeekQueryKey()

  const query = useQuery(
    {
      ...(findTotalLoadByWeekQueryOptions(config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<TData, ResponseErrorConfig<FindTotalLoadByWeek400Type | FindTotalLoadByWeek404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
