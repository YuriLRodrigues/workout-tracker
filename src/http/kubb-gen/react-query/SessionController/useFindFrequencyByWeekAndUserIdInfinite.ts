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

import { findFrequencyByWeekAndUserId } from '../../clients/SessionController/findFrequencyByWeekAndUserId'
import type {
  FindFrequencyByWeekAndUserIdQueryResponseType,
  FindFrequencyByWeekAndUserId400Type,
  FindFrequencyByWeekAndUserId404Type,
} from '../../types/FindFrequencyByWeekAndUserIdType'

export const findFrequencyByWeekAndUserIdInfiniteQueryKey = () => [{ url: '/session/frequency' }] as const

export type FindFrequencyByWeekAndUserIdInfiniteQueryKey = ReturnType<
  typeof findFrequencyByWeekAndUserIdInfiniteQueryKey
>

export function findFrequencyByWeekAndUserIdInfiniteQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findFrequencyByWeekAndUserIdInfiniteQueryKey()
  return infiniteQueryOptions<
    FindFrequencyByWeekAndUserIdQueryResponseType,
    ResponseErrorConfig<FindFrequencyByWeekAndUserId400Type | FindFrequencyByWeekAndUserId404Type>,
    FindFrequencyByWeekAndUserIdQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findFrequencyByWeekAndUserId(config)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      Array.isArray(lastPage) && lastPage.length === 0 ? undefined : lastPageParam + 1,
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
      firstPageParam <= 1 ? undefined : firstPageParam - 1,
  })
}

/**
 * {@link /session/frequency}
 */
export function useFindFrequencyByWeekAndUserIdInfinite<
  TData = InfiniteData<FindFrequencyByWeekAndUserIdQueryResponseType>,
  TQueryData = FindFrequencyByWeekAndUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindFrequencyByWeekAndUserIdInfiniteQueryKey,
>(
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
        FindFrequencyByWeekAndUserIdQueryResponseType,
        ResponseErrorConfig<FindFrequencyByWeekAndUserId400Type | FindFrequencyByWeekAndUserId404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findFrequencyByWeekAndUserIdInfiniteQueryKey()

  const query = useInfiniteQuery(
    {
      ...(findFrequencyByWeekAndUserIdInfiniteQueryOptions(config) as unknown as InfiniteQueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseInfiniteQueryResult<
    TData,
    ResponseErrorConfig<FindFrequencyByWeekAndUserId400Type | FindFrequencyByWeekAndUserId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
