import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { findTotalWorkoutsCountByUserId } from '../../clients/WorkoutController/findTotalWorkoutsCountByUserId'
import type {
  FindTotalWorkoutsCountByUserIdQueryResponseType,
  FindTotalWorkoutsCountByUserId400Type,
  FindTotalWorkoutsCountByUserId404Type,
} from '../../types/FindTotalWorkoutsCountByUserIdType'

export const findTotalWorkoutsCountByUserIdQueryKey = () => [{ url: '/workout/metrics/count' }] as const

export type FindTotalWorkoutsCountByUserIdQueryKey = ReturnType<typeof findTotalWorkoutsCountByUserIdQueryKey>

export function findTotalWorkoutsCountByUserIdQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findTotalWorkoutsCountByUserIdQueryKey()
  return queryOptions<
    FindTotalWorkoutsCountByUserIdQueryResponseType,
    ResponseErrorConfig<FindTotalWorkoutsCountByUserId400Type | FindTotalWorkoutsCountByUserId404Type>,
    FindTotalWorkoutsCountByUserIdQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findTotalWorkoutsCountByUserId(config)
    },
  })
}

/**
 * {@link /workout/metrics/count}
 */
export function useFindTotalWorkoutsCountByUserId<
  TData = FindTotalWorkoutsCountByUserIdQueryResponseType,
  TQueryData = FindTotalWorkoutsCountByUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindTotalWorkoutsCountByUserIdQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        FindTotalWorkoutsCountByUserIdQueryResponseType,
        ResponseErrorConfig<FindTotalWorkoutsCountByUserId400Type | FindTotalWorkoutsCountByUserId404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findTotalWorkoutsCountByUserIdQueryKey()

  const query = useQuery(
    {
      ...(findTotalWorkoutsCountByUserIdQueryOptions(config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<
    TData,
    ResponseErrorConfig<FindTotalWorkoutsCountByUserId400Type | FindTotalWorkoutsCountByUserId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
