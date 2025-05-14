import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { findTotalLoadByWeek } from '../../clients/SessionController/findTotalLoadByWeek'
import type {
  FindTotalLoadByWeekQueryResponseType,
  FindTotalLoadByWeek400Type,
  FindTotalLoadByWeek404Type,
} from '../../types/FindTotalLoadByWeekType'

export const findTotalLoadByWeekSuspenseQueryKey = () => [{ url: '/session/total-load-by-week' }] as const

export type FindTotalLoadByWeekSuspenseQueryKey = ReturnType<typeof findTotalLoadByWeekSuspenseQueryKey>

export function findTotalLoadByWeekSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findTotalLoadByWeekSuspenseQueryKey()
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
export function useFindTotalLoadByWeekSuspense<
  TData = FindTotalLoadByWeekQueryResponseType,
  TQueryData = FindTotalLoadByWeekQueryResponseType,
  TQueryKey extends QueryKey = FindTotalLoadByWeekSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FindTotalLoadByWeekQueryResponseType,
        ResponseErrorConfig<FindTotalLoadByWeek400Type | FindTotalLoadByWeek404Type>,
        TData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findTotalLoadByWeekSuspenseQueryKey()

  const query = useSuspenseQuery(
    {
      ...(findTotalLoadByWeekSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<TData, ResponseErrorConfig<FindTotalLoadByWeek400Type | FindTotalLoadByWeek404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
