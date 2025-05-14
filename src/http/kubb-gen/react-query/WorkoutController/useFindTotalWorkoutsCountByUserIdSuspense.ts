import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { findTotalWorkoutsCountByUserId } from '../../clients/WorkoutController/findTotalWorkoutsCountByUserId'
import type {
  FindTotalWorkoutsCountByUserIdQueryResponseType,
  FindTotalWorkoutsCountByUserId400Type,
  FindTotalWorkoutsCountByUserId404Type,
} from '../../types/FindTotalWorkoutsCountByUserIdType'

export const findTotalWorkoutsCountByUserIdSuspenseQueryKey = () => [{ url: '/workout/metrics/count' }] as const

export type FindTotalWorkoutsCountByUserIdSuspenseQueryKey = ReturnType<
  typeof findTotalWorkoutsCountByUserIdSuspenseQueryKey
>

export function findTotalWorkoutsCountByUserIdSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findTotalWorkoutsCountByUserIdSuspenseQueryKey()
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
export function useFindTotalWorkoutsCountByUserIdSuspense<
  TData = FindTotalWorkoutsCountByUserIdQueryResponseType,
  TQueryData = FindTotalWorkoutsCountByUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindTotalWorkoutsCountByUserIdSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FindTotalWorkoutsCountByUserIdQueryResponseType,
        ResponseErrorConfig<FindTotalWorkoutsCountByUserId400Type | FindTotalWorkoutsCountByUserId404Type>,
        TData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findTotalWorkoutsCountByUserIdSuspenseQueryKey()

  const query = useSuspenseQuery(
    {
      ...(findTotalWorkoutsCountByUserIdSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<FindTotalWorkoutsCountByUserId400Type | FindTotalWorkoutsCountByUserId404Type>
  > & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
