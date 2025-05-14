import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { findAllWorkoutsByUserId } from '../../clients/WorkoutController/findAllWorkoutsByUserId'
import type {
  FindAllWorkoutsByUserIdQueryResponseType,
  FindAllWorkoutsByUserIdQueryParamsType,
  FindAllWorkoutsByUserId400Type,
  FindAllWorkoutsByUserId404Type,
} from '../../types/FindAllWorkoutsByUserIdType'

export const findAllWorkoutsByUserIdSuspenseQueryKey = (params?: FindAllWorkoutsByUserIdQueryParamsType) =>
  [{ url: '/workout/many' }, ...(params ? [params] : [])] as const

export type FindAllWorkoutsByUserIdSuspenseQueryKey = ReturnType<typeof findAllWorkoutsByUserIdSuspenseQueryKey>

export function findAllWorkoutsByUserIdSuspenseQueryOptions(
  { params }: { params?: FindAllWorkoutsByUserIdQueryParamsType },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findAllWorkoutsByUserIdSuspenseQueryKey(params)
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
export function useFindAllWorkoutsByUserIdSuspense<
  TData = FindAllWorkoutsByUserIdQueryResponseType,
  TQueryData = FindAllWorkoutsByUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindAllWorkoutsByUserIdSuspenseQueryKey,
>(
  { params }: { params?: FindAllWorkoutsByUserIdQueryParamsType },
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FindAllWorkoutsByUserIdQueryResponseType,
        ResponseErrorConfig<FindAllWorkoutsByUserId400Type | FindAllWorkoutsByUserId404Type>,
        TData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findAllWorkoutsByUserIdSuspenseQueryKey(params)

  const query = useSuspenseQuery(
    {
      ...(findAllWorkoutsByUserIdSuspenseQueryOptions({ params }, config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<FindAllWorkoutsByUserId400Type | FindAllWorkoutsByUserId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
