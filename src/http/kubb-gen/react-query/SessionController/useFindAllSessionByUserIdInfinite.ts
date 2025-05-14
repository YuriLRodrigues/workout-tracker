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

import { findAllSessionByUserId } from '../../clients/SessionController/findAllSessionByUserId'
import type {
  FindAllSessionByUserIdQueryResponseType,
  FindAllSessionByUserIdPathParamsType,
  FindAllSessionByUserId400Type,
  FindAllSessionByUserId404Type,
} from '../../types/FindAllSessionByUserIdType'

export const findAllSessionByUserIdInfiniteQueryKey = ({
  page,
  limit,
}: {
  page: FindAllSessionByUserIdPathParamsType['page']
  limit: FindAllSessionByUserIdPathParamsType['limit']
}) => [{ url: '/session/all' }] as const

export type FindAllSessionByUserIdInfiniteQueryKey = ReturnType<typeof findAllSessionByUserIdInfiniteQueryKey>

export function findAllSessionByUserIdInfiniteQueryOptions(
  {
    page,
    limit,
  }: { page: FindAllSessionByUserIdPathParamsType['page']; limit: FindAllSessionByUserIdPathParamsType['limit'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findAllSessionByUserIdInfiniteQueryKey({ page, limit })
  return infiniteQueryOptions<
    FindAllSessionByUserIdQueryResponseType,
    ResponseErrorConfig<FindAllSessionByUserId400Type | FindAllSessionByUserId404Type>,
    FindAllSessionByUserIdQueryResponseType,
    typeof queryKey
  >({
    enabled: !!(page && limit),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findAllSessionByUserId({ page, limit }, config)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      Array.isArray(lastPage) && lastPage.length === 0 ? undefined : lastPageParam + 1,
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
      firstPageParam <= 1 ? undefined : firstPageParam - 1,
  })
}

/**
 * {@link /session/all}
 */
export function useFindAllSessionByUserIdInfinite<
  TData = InfiniteData<FindAllSessionByUserIdQueryResponseType>,
  TQueryData = FindAllSessionByUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindAllSessionByUserIdInfiniteQueryKey,
>(
  {
    page,
    limit,
  }: { page: FindAllSessionByUserIdPathParamsType['page']; limit: FindAllSessionByUserIdPathParamsType['limit'] },
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
        FindAllSessionByUserIdQueryResponseType,
        ResponseErrorConfig<FindAllSessionByUserId400Type | FindAllSessionByUserId404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findAllSessionByUserIdInfiniteQueryKey({ page, limit })

  const query = useInfiniteQuery(
    {
      ...(findAllSessionByUserIdInfiniteQueryOptions(
        { page, limit },
        config,
      ) as unknown as InfiniteQueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseInfiniteQueryResult<
    TData,
    ResponseErrorConfig<FindAllSessionByUserId400Type | FindAllSessionByUserId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
