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

import { findPhysicalStatsByUserId } from '../../clients/PhysicalController/findPhysicalStatsByUserId'
import type {
  FindPhysicalStatsByUserIdQueryResponseType,
  FindPhysicalStatsByUserId400Type,
} from '../../types/FindPhysicalStatsByUserIdType'

export const findPhysicalStatsByUserIdInfiniteQueryKey = () => [{ url: '/physical' }] as const

export type FindPhysicalStatsByUserIdInfiniteQueryKey = ReturnType<typeof findPhysicalStatsByUserIdInfiniteQueryKey>

export function findPhysicalStatsByUserIdInfiniteQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findPhysicalStatsByUserIdInfiniteQueryKey()
  return infiniteQueryOptions<
    FindPhysicalStatsByUserIdQueryResponseType,
    ResponseErrorConfig<FindPhysicalStatsByUserId400Type>,
    FindPhysicalStatsByUserIdQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findPhysicalStatsByUserId(config)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      Array.isArray(lastPage) && lastPage.length === 0 ? undefined : lastPageParam + 1,
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
      firstPageParam <= 1 ? undefined : firstPageParam - 1,
  })
}

/**
 * {@link /physical}
 */
export function useFindPhysicalStatsByUserIdInfinite<
  TData = InfiniteData<FindPhysicalStatsByUserIdQueryResponseType>,
  TQueryData = FindPhysicalStatsByUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindPhysicalStatsByUserIdInfiniteQueryKey,
>(
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
        FindPhysicalStatsByUserIdQueryResponseType,
        ResponseErrorConfig<FindPhysicalStatsByUserId400Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findPhysicalStatsByUserIdInfiniteQueryKey()

  const query = useInfiniteQuery(
    {
      ...(findPhysicalStatsByUserIdInfiniteQueryOptions(config) as unknown as InfiniteQueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseInfiniteQueryResult<TData, ResponseErrorConfig<FindPhysicalStatsByUserId400Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
