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

import { findWorkoutsHistoryByUserId } from '../../clients/WorkoutController/findWorkoutsHistoryByUserId'
import type {
  FindWorkoutsHistoryByUserIdQueryResponseType,
  FindWorkoutsHistoryByUserIdQueryParamsType,
  FindWorkoutsHistoryByUserId400Type,
  FindWorkoutsHistoryByUserId404Type,
} from '../../types/FindWorkoutsHistoryByUserIdType'

export const findWorkoutsHistoryByUserIdInfiniteQueryKey = (params?: FindWorkoutsHistoryByUserIdQueryParamsType) =>
  [{ url: '/workout/history' }, ...(params ? [params] : [])] as const

export type FindWorkoutsHistoryByUserIdInfiniteQueryKey = ReturnType<typeof findWorkoutsHistoryByUserIdInfiniteQueryKey>

export function findWorkoutsHistoryByUserIdInfiniteQueryOptions(
  { params }: { params?: FindWorkoutsHistoryByUserIdQueryParamsType },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findWorkoutsHistoryByUserIdInfiniteQueryKey(params)
  return infiniteQueryOptions<
    FindWorkoutsHistoryByUserIdQueryResponseType,
    ResponseErrorConfig<FindWorkoutsHistoryByUserId400Type | FindWorkoutsHistoryByUserId404Type>,
    FindWorkoutsHistoryByUserIdQueryResponseType,
    typeof queryKey,
    number
  >({
    queryKey,
    queryFn: async ({ signal, pageParam }) => {
      config.signal = signal

      if (params) {
        params['pageSize'] = pageParam as unknown as FindWorkoutsHistoryByUserIdQueryParamsType['pageSize']
      }
      return findWorkoutsHistoryByUserId({ params }, config)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      Array.isArray(lastPage) && lastPage.length === 0 ? undefined : lastPageParam + 1,
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
      firstPageParam <= 1 ? undefined : firstPageParam - 1,
  })
}

/**
 * {@link /workout/history}
 */
export function useFindWorkoutsHistoryByUserIdInfinite<
  TData = InfiniteData<FindWorkoutsHistoryByUserIdQueryResponseType>,
  TQueryData = FindWorkoutsHistoryByUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindWorkoutsHistoryByUserIdInfiniteQueryKey,
>(
  { params }: { params?: FindWorkoutsHistoryByUserIdQueryParamsType },
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
        FindWorkoutsHistoryByUserIdQueryResponseType,
        ResponseErrorConfig<FindWorkoutsHistoryByUserId400Type | FindWorkoutsHistoryByUserId404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findWorkoutsHistoryByUserIdInfiniteQueryKey(params)

  const query = useInfiniteQuery(
    {
      ...(findWorkoutsHistoryByUserIdInfiniteQueryOptions(
        { params },
        config,
      ) as unknown as InfiniteQueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseInfiniteQueryResult<
    TData,
    ResponseErrorConfig<FindWorkoutsHistoryByUserId400Type | FindWorkoutsHistoryByUserId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
