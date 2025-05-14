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

import { findAllLogsToday } from '../../clients/LogController/findAllLogsToday'
import type {
  FindAllLogsTodayQueryResponseType,
  FindAllLogsTodayPathParamsType,
  FindAllLogsToday400Type,
  FindAllLogsToday404Type,
} from '../../types/FindAllLogsTodayType'

export const findAllLogsTodayInfiniteQueryKey = ({
  workoutId,
}: {
  workoutId: FindAllLogsTodayPathParamsType['workoutId']
}) => [{ url: '/log/metrics/:workoutId', params: { workoutId: workoutId } }] as const

export type FindAllLogsTodayInfiniteQueryKey = ReturnType<typeof findAllLogsTodayInfiniteQueryKey>

export function findAllLogsTodayInfiniteQueryOptions(
  { workoutId }: { workoutId: FindAllLogsTodayPathParamsType['workoutId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findAllLogsTodayInfiniteQueryKey({ workoutId })
  return infiniteQueryOptions<
    FindAllLogsTodayQueryResponseType,
    ResponseErrorConfig<FindAllLogsToday400Type | FindAllLogsToday404Type>,
    FindAllLogsTodayQueryResponseType,
    typeof queryKey
  >({
    enabled: !!workoutId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findAllLogsToday({ workoutId }, config)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      Array.isArray(lastPage) && lastPage.length === 0 ? undefined : lastPageParam + 1,
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
      firstPageParam <= 1 ? undefined : firstPageParam - 1,
  })
}

/**
 * {@link /log/metrics/:workoutId}
 */
export function useFindAllLogsTodayInfinite<
  TData = InfiniteData<FindAllLogsTodayQueryResponseType>,
  TQueryData = FindAllLogsTodayQueryResponseType,
  TQueryKey extends QueryKey = FindAllLogsTodayInfiniteQueryKey,
>(
  { workoutId }: { workoutId: FindAllLogsTodayPathParamsType['workoutId'] },
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
        FindAllLogsTodayQueryResponseType,
        ResponseErrorConfig<FindAllLogsToday400Type | FindAllLogsToday404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findAllLogsTodayInfiniteQueryKey({ workoutId })

  const query = useInfiniteQuery(
    {
      ...(findAllLogsTodayInfiniteQueryOptions({ workoutId }, config) as unknown as InfiniteQueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseInfiniteQueryResult<TData, ResponseErrorConfig<FindAllLogsToday400Type | FindAllLogsToday404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
