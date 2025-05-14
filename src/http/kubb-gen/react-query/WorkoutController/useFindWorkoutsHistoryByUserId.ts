import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { findWorkoutsHistoryByUserId } from '../../clients/WorkoutController/findWorkoutsHistoryByUserId'
import type {
  FindWorkoutsHistoryByUserIdQueryResponseType,
  FindWorkoutsHistoryByUserIdQueryParamsType,
  FindWorkoutsHistoryByUserId400Type,
  FindWorkoutsHistoryByUserId404Type,
} from '../../types/FindWorkoutsHistoryByUserIdType'

export const findWorkoutsHistoryByUserIdQueryKey = (params?: FindWorkoutsHistoryByUserIdQueryParamsType) =>
  [{ url: '/workout/history' }, ...(params ? [params] : [])] as const

export type FindWorkoutsHistoryByUserIdQueryKey = ReturnType<typeof findWorkoutsHistoryByUserIdQueryKey>

export function findWorkoutsHistoryByUserIdQueryOptions(
  { params }: { params?: FindWorkoutsHistoryByUserIdQueryParamsType },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findWorkoutsHistoryByUserIdQueryKey(params)
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
export function useFindWorkoutsHistoryByUserId<
  TData = FindWorkoutsHistoryByUserIdQueryResponseType,
  TQueryData = FindWorkoutsHistoryByUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindWorkoutsHistoryByUserIdQueryKey,
>(
  { params }: { params?: FindWorkoutsHistoryByUserIdQueryParamsType },
  options: {
    query?: Partial<
      QueryObserverOptions<
        FindWorkoutsHistoryByUserIdQueryResponseType,
        ResponseErrorConfig<FindWorkoutsHistoryByUserId400Type | FindWorkoutsHistoryByUserId404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findWorkoutsHistoryByUserIdQueryKey(params)

  const query = useQuery(
    {
      ...(findWorkoutsHistoryByUserIdQueryOptions({ params }, config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<
    TData,
    ResponseErrorConfig<FindWorkoutsHistoryByUserId400Type | FindWorkoutsHistoryByUserId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
