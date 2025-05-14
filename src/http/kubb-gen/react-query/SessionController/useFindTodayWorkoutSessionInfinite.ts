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

import { findTodayWorkoutSession } from '../../clients/SessionController/findTodayWorkoutSession'
import type {
  FindTodayWorkoutSessionQueryResponseType,
  FindTodayWorkoutSessionPathParamsType,
  FindTodayWorkoutSession400Type,
  FindTodayWorkoutSession404Type,
} from '../../types/FindTodayWorkoutSessionType'

export const findTodayWorkoutSessionInfiniteQueryKey = ({
  workoutId,
}: {
  workoutId: FindTodayWorkoutSessionPathParamsType['workoutId']
}) => [{ url: '/session/workout/:workoutId', params: { workoutId: workoutId } }] as const

export type FindTodayWorkoutSessionInfiniteQueryKey = ReturnType<typeof findTodayWorkoutSessionInfiniteQueryKey>

export function findTodayWorkoutSessionInfiniteQueryOptions(
  { workoutId }: { workoutId: FindTodayWorkoutSessionPathParamsType['workoutId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findTodayWorkoutSessionInfiniteQueryKey({ workoutId })
  return infiniteQueryOptions<
    FindTodayWorkoutSessionQueryResponseType,
    ResponseErrorConfig<FindTodayWorkoutSession400Type | FindTodayWorkoutSession404Type>,
    FindTodayWorkoutSessionQueryResponseType,
    typeof queryKey
  >({
    enabled: !!workoutId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findTodayWorkoutSession({ workoutId }, config)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      Array.isArray(lastPage) && lastPage.length === 0 ? undefined : lastPageParam + 1,
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
      firstPageParam <= 1 ? undefined : firstPageParam - 1,
  })
}

/**
 * {@link /session/workout/:workoutId}
 */
export function useFindTodayWorkoutSessionInfinite<
  TData = InfiniteData<FindTodayWorkoutSessionQueryResponseType>,
  TQueryData = FindTodayWorkoutSessionQueryResponseType,
  TQueryKey extends QueryKey = FindTodayWorkoutSessionInfiniteQueryKey,
>(
  { workoutId }: { workoutId: FindTodayWorkoutSessionPathParamsType['workoutId'] },
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
        FindTodayWorkoutSessionQueryResponseType,
        ResponseErrorConfig<FindTodayWorkoutSession400Type | FindTodayWorkoutSession404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findTodayWorkoutSessionInfiniteQueryKey({ workoutId })

  const query = useInfiniteQuery(
    {
      ...(findTodayWorkoutSessionInfiniteQueryOptions(
        { workoutId },
        config,
      ) as unknown as InfiniteQueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseInfiniteQueryResult<
    TData,
    ResponseErrorConfig<FindTodayWorkoutSession400Type | FindTodayWorkoutSession404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
