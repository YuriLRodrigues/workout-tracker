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

import { findTotalAndAvgTimeByUserId } from '../../clients/WorkoutController/findTotalAndAvgTimeByUserId'
import type {
  FindTotalAndAvgTimeByUserIdQueryResponseType,
  FindTotalAndAvgTimeByUserId400Type,
  FindTotalAndAvgTimeByUserId404Type,
} from '../../types/FindTotalAndAvgTimeByUserIdType'

export const findTotalAndAvgTimeByUserIdInfiniteQueryKey = () => [{ url: '/workout/metrics/time' }] as const

export type FindTotalAndAvgTimeByUserIdInfiniteQueryKey = ReturnType<typeof findTotalAndAvgTimeByUserIdInfiniteQueryKey>

export function findTotalAndAvgTimeByUserIdInfiniteQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findTotalAndAvgTimeByUserIdInfiniteQueryKey()
  return infiniteQueryOptions<
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
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      Array.isArray(lastPage) && lastPage.length === 0 ? undefined : lastPageParam + 1,
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
      firstPageParam <= 1 ? undefined : firstPageParam - 1,
  })
}

/**
 * {@link /workout/metrics/time}
 */
export function useFindTotalAndAvgTimeByUserIdInfinite<
  TData = InfiniteData<FindTotalAndAvgTimeByUserIdQueryResponseType>,
  TQueryData = FindTotalAndAvgTimeByUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindTotalAndAvgTimeByUserIdInfiniteQueryKey,
>(
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
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
  const queryKey = queryOptions?.queryKey ?? findTotalAndAvgTimeByUserIdInfiniteQueryKey()

  const query = useInfiniteQuery(
    {
      ...(findTotalAndAvgTimeByUserIdInfiniteQueryOptions(config) as unknown as InfiniteQueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseInfiniteQueryResult<
    TData,
    ResponseErrorConfig<FindTotalAndAvgTimeByUserId400Type | FindTotalAndAvgTimeByUserId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
