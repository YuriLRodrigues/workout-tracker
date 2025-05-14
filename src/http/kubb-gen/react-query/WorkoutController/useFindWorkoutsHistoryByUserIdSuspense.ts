import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { findWorkoutsHistoryByUserId } from '../../clients/WorkoutController/findWorkoutsHistoryByUserId'
import type {
  FindWorkoutsHistoryByUserIdQueryResponseType,
  FindWorkoutsHistoryByUserIdQueryParamsType,
  FindWorkoutsHistoryByUserId400Type,
  FindWorkoutsHistoryByUserId404Type,
} from '../../types/FindWorkoutsHistoryByUserIdType'

export const findWorkoutsHistoryByUserIdSuspenseQueryKey = (params?: FindWorkoutsHistoryByUserIdQueryParamsType) =>
  [{ url: '/workout/history' }, ...(params ? [params] : [])] as const

export type FindWorkoutsHistoryByUserIdSuspenseQueryKey = ReturnType<typeof findWorkoutsHistoryByUserIdSuspenseQueryKey>

export function findWorkoutsHistoryByUserIdSuspenseQueryOptions(
  { params }: { params?: FindWorkoutsHistoryByUserIdQueryParamsType },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findWorkoutsHistoryByUserIdSuspenseQueryKey(params)
  return queryOptions<
    FindWorkoutsHistoryByUserIdQueryResponseType,
    ResponseErrorConfig<FindWorkoutsHistoryByUserId400Type | FindWorkoutsHistoryByUserId404Type>,
    FindWorkoutsHistoryByUserIdQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findWorkoutsHistoryByUserId({ params }, config)
    },
  })
}

/**
 * {@link /workout/history}
 */
export function useFindWorkoutsHistoryByUserIdSuspense<
  TData = FindWorkoutsHistoryByUserIdQueryResponseType,
  TQueryData = FindWorkoutsHistoryByUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindWorkoutsHistoryByUserIdSuspenseQueryKey,
>(
  { params }: { params?: FindWorkoutsHistoryByUserIdQueryParamsType },
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FindWorkoutsHistoryByUserIdQueryResponseType,
        ResponseErrorConfig<FindWorkoutsHistoryByUserId400Type | FindWorkoutsHistoryByUserId404Type>,
        TData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findWorkoutsHistoryByUserIdSuspenseQueryKey(params)

  const query = useSuspenseQuery(
    {
      ...(findWorkoutsHistoryByUserIdSuspenseQueryOptions({ params }, config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<FindWorkoutsHistoryByUserId400Type | FindWorkoutsHistoryByUserId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
