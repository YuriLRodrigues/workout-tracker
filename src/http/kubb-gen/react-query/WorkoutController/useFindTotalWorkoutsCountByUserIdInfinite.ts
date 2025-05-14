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

import { findTotalWorkoutsCountByUserId } from '../../clients/WorkoutController/findTotalWorkoutsCountByUserId'
import type {
  FindTotalWorkoutsCountByUserIdQueryResponseType,
  FindTotalWorkoutsCountByUserId400Type,
  FindTotalWorkoutsCountByUserId404Type,
} from '../../types/FindTotalWorkoutsCountByUserIdType'

export const findTotalWorkoutsCountByUserIdInfiniteQueryKey = () => [{ url: '/workout/metrics/count' }] as const

export type FindTotalWorkoutsCountByUserIdInfiniteQueryKey = ReturnType<
  typeof findTotalWorkoutsCountByUserIdInfiniteQueryKey
>

export function findTotalWorkoutsCountByUserIdInfiniteQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findTotalWorkoutsCountByUserIdInfiniteQueryKey()
  return infiniteQueryOptions<
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
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      Array.isArray(lastPage) && lastPage.length === 0 ? undefined : lastPageParam + 1,
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
      firstPageParam <= 1 ? undefined : firstPageParam - 1,
  })
}

/**
 * {@link /workout/metrics/count}
 */
export function useFindTotalWorkoutsCountByUserIdInfinite<
  TData = InfiniteData<FindTotalWorkoutsCountByUserIdQueryResponseType>,
  TQueryData = FindTotalWorkoutsCountByUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindTotalWorkoutsCountByUserIdInfiniteQueryKey,
>(
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
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
  const queryKey = queryOptions?.queryKey ?? findTotalWorkoutsCountByUserIdInfiniteQueryKey()

  const query = useInfiniteQuery(
    {
      ...(findTotalWorkoutsCountByUserIdInfiniteQueryOptions(config) as unknown as InfiniteQueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseInfiniteQueryResult<
    TData,
    ResponseErrorConfig<FindTotalWorkoutsCountByUserId400Type | FindTotalWorkoutsCountByUserId404Type>
  > & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
