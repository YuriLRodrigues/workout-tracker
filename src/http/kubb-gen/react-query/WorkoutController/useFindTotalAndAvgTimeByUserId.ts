import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { findTotalAndAvgTimeByUserId } from '../../clients/WorkoutController/findTotalAndAvgTimeByUserId'
import type {
  FindTotalAndAvgTimeByUserIdQueryResponseType,
  FindTotalAndAvgTimeByUserId400Type,
  FindTotalAndAvgTimeByUserId404Type,
} from '../../types/FindTotalAndAvgTimeByUserIdType'

export const findTotalAndAvgTimeByUserIdQueryKey = () => [{ url: '/workout/metrics/time' }] as const

export type FindTotalAndAvgTimeByUserIdQueryKey = ReturnType<typeof findTotalAndAvgTimeByUserIdQueryKey>

export function findTotalAndAvgTimeByUserIdQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findTotalAndAvgTimeByUserIdQueryKey()
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
export function useFindTotalAndAvgTimeByUserId<
  TData = FindTotalAndAvgTimeByUserIdQueryResponseType,
  TQueryData = FindTotalAndAvgTimeByUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindTotalAndAvgTimeByUserIdQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        FindTotalAndAvgTimeByUserIdQueryResponseType,
        ResponseErrorConfig<FindTotalAndAvgTimeByUserId400Type | FindTotalAndAvgTimeByUserId404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findTotalAndAvgTimeByUserIdQueryKey()

  const query = useQuery(
    {
      ...(findTotalAndAvgTimeByUserIdQueryOptions(config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<
    TData,
    ResponseErrorConfig<FindTotalAndAvgTimeByUserId400Type | FindTotalAndAvgTimeByUserId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
