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

import { findAverageTimeByWeek } from '../../clients/SessionController/findAverageTimeByWeek'
import type {
  FindAverageTimeByWeekQueryResponseType,
  FindAverageTimeByWeek400Type,
  FindAverageTimeByWeek404Type,
} from '../../types/FindAverageTimeByWeekType'

export const findAverageTimeByWeekInfiniteQueryKey = () => [{ url: '/session/avg-time-by-week' }] as const

export type FindAverageTimeByWeekInfiniteQueryKey = ReturnType<typeof findAverageTimeByWeekInfiniteQueryKey>

export function findAverageTimeByWeekInfiniteQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findAverageTimeByWeekInfiniteQueryKey()
  return infiniteQueryOptions<
    FindAverageTimeByWeekQueryResponseType,
    ResponseErrorConfig<FindAverageTimeByWeek400Type | FindAverageTimeByWeek404Type>,
    FindAverageTimeByWeekQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findAverageTimeByWeek(config)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      Array.isArray(lastPage) && lastPage.length === 0 ? undefined : lastPageParam + 1,
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
      firstPageParam <= 1 ? undefined : firstPageParam - 1,
  })
}

/**
 * {@link /session/avg-time-by-week}
 */
export function useFindAverageTimeByWeekInfinite<
  TData = InfiniteData<FindAverageTimeByWeekQueryResponseType>,
  TQueryData = FindAverageTimeByWeekQueryResponseType,
  TQueryKey extends QueryKey = FindAverageTimeByWeekInfiniteQueryKey,
>(
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
        FindAverageTimeByWeekQueryResponseType,
        ResponseErrorConfig<FindAverageTimeByWeek400Type | FindAverageTimeByWeek404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findAverageTimeByWeekInfiniteQueryKey()

  const query = useInfiniteQuery(
    {
      ...(findAverageTimeByWeekInfiniteQueryOptions(config) as unknown as InfiniteQueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseInfiniteQueryResult<
    TData,
    ResponseErrorConfig<FindAverageTimeByWeek400Type | FindAverageTimeByWeek404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
