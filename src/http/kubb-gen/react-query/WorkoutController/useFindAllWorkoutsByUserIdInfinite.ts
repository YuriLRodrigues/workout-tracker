import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type {
  InfiniteData,
  QueryKey,
  QueryClient,
  InfiniteQueryObserverOptions,
  UseInfiniteQueryResult,
} from '@tanstack/react-query'
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'

import { findAllWorkoutsByUserId } from '../../clients/WorkoutController/findAllWorkoutsByUserId'
import type {
  FindAllWorkoutsByUserIdQueryResponseType,
  FindAllWorkoutsByUserIdQueryParamsType,
  FindAllWorkoutsByUserId400Type,
  FindAllWorkoutsByUserId404Type,
} from '../../types/FindAllWorkoutsByUserIdType'

export const findAllWorkoutsByUserIdInfiniteQueryKey = (params?: FindAllWorkoutsByUserIdQueryParamsType) =>
  [{ url: '/workout/many' }, ...(params ? [params] : [])] as const

export type FindAllWorkoutsByUserIdInfiniteQueryKey = ReturnType<typeof findAllWorkoutsByUserIdInfiniteQueryKey>

export function findAllWorkoutsByUserIdInfiniteQueryOptions(
  { params }: { params?: FindAllWorkoutsByUserIdQueryParamsType },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findAllWorkoutsByUserIdInfiniteQueryKey(params)
  return infiniteQueryOptions<
    FindAllWorkoutsByUserIdQueryResponseType,
    ResponseErrorConfig<FindAllWorkoutsByUserId400Type | FindAllWorkoutsByUserId404Type>,
    FindAllWorkoutsByUserIdQueryResponseType,
    typeof queryKey,
    number
  >({
    queryKey,
    queryFn: async ({ signal, pageParam }) => {
      config.signal = signal

      if (params) {
        params['pageSize'] = pageParam as unknown as FindAllWorkoutsByUserIdQueryParamsType['pageSize']
      }
      return findAllWorkoutsByUserId({ params }, config)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      Array.isArray(lastPage) && lastPage.length === 0 ? undefined : lastPageParam + 1,
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
      firstPageParam <= 1 ? undefined : firstPageParam - 1,
  })
}

/**
 * {@link /workout/many}
 */
export function useFindAllWorkoutsByUserIdInfinite<
  TData = InfiniteData<FindAllWorkoutsByUserIdQueryResponseType>,
  TQueryData = FindAllWorkoutsByUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindAllWorkoutsByUserIdInfiniteQueryKey,
>(
  { params }: { params?: FindAllWorkoutsByUserIdQueryParamsType },
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
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
  const queryKey = queryOptions?.queryKey ?? findAllWorkoutsByUserIdInfiniteQueryKey(params)

  const query = useInfiniteQuery(
    {
      ...(findAllWorkoutsByUserIdInfiniteQueryOptions({ params }, config) as unknown as InfiniteQueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseInfiniteQueryResult<
    TData,
    ResponseErrorConfig<FindAllWorkoutsByUserId400Type | FindAllWorkoutsByUserId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
