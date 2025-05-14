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

import { me } from '../../clients/UserController/me'
import type { MeQueryResponseType, Me400Type, Me404Type } from '../../types/MeType'

export const meInfiniteQueryKey = () => [{ url: '/user/me' }] as const

export type MeInfiniteQueryKey = ReturnType<typeof meInfiniteQueryKey>

export function meInfiniteQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = meInfiniteQueryKey()
  return infiniteQueryOptions<
    MeQueryResponseType,
    ResponseErrorConfig<Me400Type | Me404Type>,
    MeQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return me(config)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      Array.isArray(lastPage) && lastPage.length === 0 ? undefined : lastPageParam + 1,
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
      firstPageParam <= 1 ? undefined : firstPageParam - 1,
  })
}

/**
 * {@link /user/me}
 */
export function useMeInfinite<
  TData = InfiniteData<MeQueryResponseType>,
  TQueryData = MeQueryResponseType,
  TQueryKey extends QueryKey = MeInfiniteQueryKey,
>(
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
        MeQueryResponseType,
        ResponseErrorConfig<Me400Type | Me404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & {
      client?: QueryClient
    }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? meInfiniteQueryKey()

  const query = useInfiniteQuery(
    {
      ...(meInfiniteQueryOptions(config) as unknown as InfiniteQueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseInfiniteQueryResult<TData, ResponseErrorConfig<Me400Type | Me404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
