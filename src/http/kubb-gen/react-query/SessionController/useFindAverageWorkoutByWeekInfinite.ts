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

import { findAverageWorkoutByWeek } from '../../clients/SessionController/findAverageWorkoutByWeek'
import type {
  FindAverageWorkoutByWeekQueryResponseType,
  FindAverageWorkoutByWeek400Type,
  FindAverageWorkoutByWeek404Type,
} from '../../types/FindAverageWorkoutByWeekType'

export const findAverageWorkoutByWeekInfiniteQueryKey = () => [{ url: '/session/avg-workout-by-week' }] as const

export type FindAverageWorkoutByWeekInfiniteQueryKey = ReturnType<typeof findAverageWorkoutByWeekInfiniteQueryKey>

export function findAverageWorkoutByWeekInfiniteQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findAverageWorkoutByWeekInfiniteQueryKey()
  return infiniteQueryOptions<
    FindAverageWorkoutByWeekQueryResponseType,
    ResponseErrorConfig<FindAverageWorkoutByWeek400Type | FindAverageWorkoutByWeek404Type>,
    FindAverageWorkoutByWeekQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findAverageWorkoutByWeek(config)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      Array.isArray(lastPage) && lastPage.length === 0 ? undefined : lastPageParam + 1,
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
      firstPageParam <= 1 ? undefined : firstPageParam - 1,
  })
}

/**
 * {@link /session/avg-workout-by-week}
 */
export function useFindAverageWorkoutByWeekInfinite<
  TData = InfiniteData<FindAverageWorkoutByWeekQueryResponseType>,
  TQueryData = FindAverageWorkoutByWeekQueryResponseType,
  TQueryKey extends QueryKey = FindAverageWorkoutByWeekInfiniteQueryKey,
>(
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
        FindAverageWorkoutByWeekQueryResponseType,
        ResponseErrorConfig<FindAverageWorkoutByWeek400Type | FindAverageWorkoutByWeek404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findAverageWorkoutByWeekInfiniteQueryKey()

  const query = useInfiniteQuery(
    {
      ...(findAverageWorkoutByWeekInfiniteQueryOptions(config) as unknown as InfiniteQueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseInfiniteQueryResult<
    TData,
    ResponseErrorConfig<FindAverageWorkoutByWeek400Type | FindAverageWorkoutByWeek404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
