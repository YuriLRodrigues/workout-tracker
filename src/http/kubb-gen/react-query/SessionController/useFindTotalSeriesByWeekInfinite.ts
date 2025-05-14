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

import { findTotalSeriesByWeek } from '../../clients/SessionController/findTotalSeriesByWeek'
import type {
  FindTotalSeriesByWeekQueryResponseType,
  FindTotalSeriesByWeek400Type,
  FindTotalSeriesByWeek404Type,
} from '../../types/FindTotalSeriesByWeekType'

export const findTotalSeriesByWeekInfiniteQueryKey = () => [{ url: '/session/total-series-by-week' }] as const

export type FindTotalSeriesByWeekInfiniteQueryKey = ReturnType<typeof findTotalSeriesByWeekInfiniteQueryKey>

export function findTotalSeriesByWeekInfiniteQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findTotalSeriesByWeekInfiniteQueryKey()
  return infiniteQueryOptions<
    FindTotalSeriesByWeekQueryResponseType,
    ResponseErrorConfig<FindTotalSeriesByWeek400Type | FindTotalSeriesByWeek404Type>,
    FindTotalSeriesByWeekQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findTotalSeriesByWeek(config)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      Array.isArray(lastPage) && lastPage.length === 0 ? undefined : lastPageParam + 1,
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
      firstPageParam <= 1 ? undefined : firstPageParam - 1,
  })
}

/**
 * {@link /session/total-series-by-week}
 */
export function useFindTotalSeriesByWeekInfinite<
  TData = InfiniteData<FindTotalSeriesByWeekQueryResponseType>,
  TQueryData = FindTotalSeriesByWeekQueryResponseType,
  TQueryKey extends QueryKey = FindTotalSeriesByWeekInfiniteQueryKey,
>(
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
        FindTotalSeriesByWeekQueryResponseType,
        ResponseErrorConfig<FindTotalSeriesByWeek400Type | FindTotalSeriesByWeek404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findTotalSeriesByWeekInfiniteQueryKey()

  const query = useInfiniteQuery(
    {
      ...(findTotalSeriesByWeekInfiniteQueryOptions(config) as unknown as InfiniteQueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseInfiniteQueryResult<
    TData,
    ResponseErrorConfig<FindTotalSeriesByWeek400Type | FindTotalSeriesByWeek404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
