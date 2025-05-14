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

import { findTodaySessionByUserId } from '../../clients/SessionController/findTodaySessionByUserId'
import type {
  FindTodaySessionByUserIdQueryResponseType,
  FindTodaySessionByUserIdPathParamsType,
  FindTodaySessionByUserId400Type,
  FindTodaySessionByUserId404Type,
} from '../../types/FindTodaySessionByUserIdType'

export const findTodaySessionByUserIdInfiniteQueryKey = ({
  workoutId,
}: {
  workoutId: FindTodaySessionByUserIdPathParamsType['workoutId']
}) => [{ url: '/session/today/:workoutId', params: { workoutId: workoutId } }] as const

export type FindTodaySessionByUserIdInfiniteQueryKey = ReturnType<typeof findTodaySessionByUserIdInfiniteQueryKey>

export function findTodaySessionByUserIdInfiniteQueryOptions(
  { workoutId }: { workoutId: FindTodaySessionByUserIdPathParamsType['workoutId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findTodaySessionByUserIdInfiniteQueryKey({ workoutId })
  return infiniteQueryOptions<
    FindTodaySessionByUserIdQueryResponseType,
    ResponseErrorConfig<FindTodaySessionByUserId400Type | FindTodaySessionByUserId404Type>,
    FindTodaySessionByUserIdQueryResponseType,
    typeof queryKey
  >({
    enabled: !!workoutId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findTodaySessionByUserId({ workoutId }, config)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      Array.isArray(lastPage) && lastPage.length === 0 ? undefined : lastPageParam + 1,
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
      firstPageParam <= 1 ? undefined : firstPageParam - 1,
  })
}

/**
 * {@link /session/today/:workoutId}
 */
export function useFindTodaySessionByUserIdInfinite<
  TData = InfiniteData<FindTodaySessionByUserIdQueryResponseType>,
  TQueryData = FindTodaySessionByUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindTodaySessionByUserIdInfiniteQueryKey,
>(
  { workoutId }: { workoutId: FindTodaySessionByUserIdPathParamsType['workoutId'] },
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
        FindTodaySessionByUserIdQueryResponseType,
        ResponseErrorConfig<FindTodaySessionByUserId400Type | FindTodaySessionByUserId404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findTodaySessionByUserIdInfiniteQueryKey({ workoutId })

  const query = useInfiniteQuery(
    {
      ...(findTodaySessionByUserIdInfiniteQueryOptions(
        { workoutId },
        config,
      ) as unknown as InfiniteQueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseInfiniteQueryResult<
    TData,
    ResponseErrorConfig<FindTodaySessionByUserId400Type | FindTodaySessionByUserId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
