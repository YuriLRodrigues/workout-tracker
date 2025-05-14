import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { findTotalAndAvgTimeByUserId } from '../../clients/WorkoutController/findTotalAndAvgTimeByUserId'
import type {
  FindTotalAndAvgTimeByUserIdQueryResponseType,
  FindTotalAndAvgTimeByUserId400Type,
  FindTotalAndAvgTimeByUserId404Type,
} from '../../types/FindTotalAndAvgTimeByUserIdType'

export const findTotalAndAvgTimeByUserIdSuspenseQueryKey = () => [{ url: '/workout/metrics/time' }] as const

export type FindTotalAndAvgTimeByUserIdSuspenseQueryKey = ReturnType<typeof findTotalAndAvgTimeByUserIdSuspenseQueryKey>

export function findTotalAndAvgTimeByUserIdSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findTotalAndAvgTimeByUserIdSuspenseQueryKey()
  return queryOptions<
    FindTotalAndAvgTimeByUserIdQueryResponseType,
    ResponseErrorConfig<FindTotalAndAvgTimeByUserId400Type | FindTotalAndAvgTimeByUserId404Type>,
    FindTotalAndAvgTimeByUserIdQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findTotalAndAvgTimeByUserId(config)
    },
  })
}

/**
 * {@link /workout/metrics/time}
 */
export function useFindTotalAndAvgTimeByUserIdSuspense<
  TData = FindTotalAndAvgTimeByUserIdQueryResponseType,
  TQueryData = FindTotalAndAvgTimeByUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindTotalAndAvgTimeByUserIdSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FindTotalAndAvgTimeByUserIdQueryResponseType,
        ResponseErrorConfig<FindTotalAndAvgTimeByUserId400Type | FindTotalAndAvgTimeByUserId404Type>,
        TData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findTotalAndAvgTimeByUserIdSuspenseQueryKey()

  const query = useSuspenseQuery(
    {
      ...(findTotalAndAvgTimeByUserIdSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<FindTotalAndAvgTimeByUserId400Type | FindTotalAndAvgTimeByUserId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
