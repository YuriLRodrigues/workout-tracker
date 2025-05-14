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

import { findTotalLoadByWeek } from '../../clients/SessionController/findTotalLoadByWeek'
import type {
  FindTotalLoadByWeekQueryResponseType,
  FindTotalLoadByWeek400Type,
  FindTotalLoadByWeek404Type,
} from '../../types/FindTotalLoadByWeekType'

export const findTotalLoadByWeekInfiniteQueryKey = () => [{ url: '/session/total-load-by-week' }] as const

export type FindTotalLoadByWeekInfiniteQueryKey = ReturnType<typeof findTotalLoadByWeekInfiniteQueryKey>

export function findTotalLoadByWeekInfiniteQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findTotalLoadByWeekInfiniteQueryKey()
  return infiniteQueryOptions<
    FindTotalLoadByWeekQueryResponseType,
    ResponseErrorConfig<FindTotalLoadByWeek400Type | FindTotalLoadByWeek404Type>,
    FindTotalLoadByWeekQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findTotalLoadByWeek(config)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      Array.isArray(lastPage) && lastPage.length === 0 ? undefined : lastPageParam + 1,
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
      firstPageParam <= 1 ? undefined : firstPageParam - 1,
  })
}

/**
 * {@link /session/total-load-by-week}
 */
export function useFindTotalLoadByWeekInfinite<
  TData = InfiniteData<FindTotalLoadByWeekQueryResponseType>,
  TQueryData = FindTotalLoadByWeekQueryResponseType,
  TQueryKey extends QueryKey = FindTotalLoadByWeekInfiniteQueryKey,
>(
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
        FindTotalLoadByWeekQueryResponseType,
        ResponseErrorConfig<FindTotalLoadByWeek400Type | FindTotalLoadByWeek404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findTotalLoadByWeekInfiniteQueryKey()

  const query = useInfiniteQuery(
    {
      ...(findTotalLoadByWeekInfiniteQueryOptions(config) as unknown as InfiniteQueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseInfiniteQueryResult<TData, ResponseErrorConfig<FindTotalLoadByWeek400Type | FindTotalLoadByWeek404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
