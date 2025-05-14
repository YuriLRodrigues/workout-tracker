import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { findAllWorkoutsByUserId } from '../../clients/WorkoutController/findAllWorkoutsByUserId'
import type {
  FindAllWorkoutsByUserIdQueryResponseType,
  FindAllWorkoutsByUserIdQueryParamsType,
  FindAllWorkoutsByUserId400Type,
  FindAllWorkoutsByUserId404Type,
} from '../../types/FindAllWorkoutsByUserIdType'

export const findAllWorkoutsByUserIdQueryKey = (params?: FindAllWorkoutsByUserIdQueryParamsType) =>
  [{ url: '/workout/many' }, ...(params ? [params] : [])] as const

export type FindAllWorkoutsByUserIdQueryKey = ReturnType<typeof findAllWorkoutsByUserIdQueryKey>

export function findAllWorkoutsByUserIdQueryOptions(
  { params }: { params?: FindAllWorkoutsByUserIdQueryParamsType },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findAllWorkoutsByUserIdQueryKey(params)
  return queryOptions<
    FindAllWorkoutsByUserIdQueryResponseType,
    ResponseErrorConfig<FindAllWorkoutsByUserId400Type | FindAllWorkoutsByUserId404Type>,
    FindAllWorkoutsByUserIdQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findAllWorkoutsByUserId({ params }, config)
    },
  })
}

/**
 * {@link /workout/many}
 */
export function useFindAllWorkoutsByUserId<
  TData = FindAllWorkoutsByUserIdQueryResponseType,
  TQueryData = FindAllWorkoutsByUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindAllWorkoutsByUserIdQueryKey,
>(
  { params }: { params?: FindAllWorkoutsByUserIdQueryParamsType },
  options: {
    query?: Partial<
      QueryObserverOptions<
        FindAllWorkoutsByUserIdQueryResponseType,
        ResponseErrorConfig<FindAllWorkoutsByUserId400Type | FindAllWorkoutsByUserId404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findAllWorkoutsByUserIdQueryKey(params)

  const query = useQuery(
    {
      ...(findAllWorkoutsByUserIdQueryOptions({ params }, config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<TData, ResponseErrorConfig<FindAllWorkoutsByUserId400Type | FindAllWorkoutsByUserId404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
