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

import { findAllLogsByExerciseId } from '../../clients/LogController/findAllLogsByExerciseId'
import type {
  FindAllLogsByExerciseIdQueryResponseType,
  FindAllLogsByExerciseIdPathParamsType,
  FindAllLogsByExerciseIdQueryParamsType,
  FindAllLogsByExerciseId400Type,
  FindAllLogsByExerciseId404Type,
} from '../../types/FindAllLogsByExerciseIdType'

export const findAllLogsByExerciseIdInfiniteQueryKey = (
  { exerciseId }: { exerciseId: FindAllLogsByExerciseIdPathParamsType['exerciseId'] },
  params?: FindAllLogsByExerciseIdQueryParamsType,
) => [{ url: '/log/many/:exerciseId', params: { exerciseId: exerciseId } }, ...(params ? [params] : [])] as const

export type FindAllLogsByExerciseIdInfiniteQueryKey = ReturnType<typeof findAllLogsByExerciseIdInfiniteQueryKey>

export function findAllLogsByExerciseIdInfiniteQueryOptions(
  {
    exerciseId,
    params,
  }: {
    exerciseId: FindAllLogsByExerciseIdPathParamsType['exerciseId']
    params?: FindAllLogsByExerciseIdQueryParamsType
  },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findAllLogsByExerciseIdInfiniteQueryKey({ exerciseId }, params)
  return infiniteQueryOptions<
    FindAllLogsByExerciseIdQueryResponseType,
    ResponseErrorConfig<FindAllLogsByExerciseId400Type | FindAllLogsByExerciseId404Type>,
    FindAllLogsByExerciseIdQueryResponseType,
    typeof queryKey,
    number
  >({
    enabled: !!exerciseId,
    queryKey,
    queryFn: async ({ signal, pageParam }) => {
      config.signal = signal

      if (params) {
        params['pageSize'] = pageParam as unknown as FindAllLogsByExerciseIdQueryParamsType['pageSize']
      }
      return findAllLogsByExerciseId({ exerciseId, params }, config)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      Array.isArray(lastPage) && lastPage.length === 0 ? undefined : lastPageParam + 1,
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
      firstPageParam <= 1 ? undefined : firstPageParam - 1,
  })
}

/**
 * {@link /log/many/:exerciseId}
 */
export function useFindAllLogsByExerciseIdInfinite<
  TData = InfiniteData<FindAllLogsByExerciseIdQueryResponseType>,
  TQueryData = FindAllLogsByExerciseIdQueryResponseType,
  TQueryKey extends QueryKey = FindAllLogsByExerciseIdInfiniteQueryKey,
>(
  {
    exerciseId,
    params,
  }: {
    exerciseId: FindAllLogsByExerciseIdPathParamsType['exerciseId']
    params?: FindAllLogsByExerciseIdQueryParamsType
  },
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
        FindAllLogsByExerciseIdQueryResponseType,
        ResponseErrorConfig<FindAllLogsByExerciseId400Type | FindAllLogsByExerciseId404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findAllLogsByExerciseIdInfiniteQueryKey({ exerciseId }, params)

  const query = useInfiniteQuery(
    {
      ...(findAllLogsByExerciseIdInfiniteQueryOptions(
        { exerciseId, params },
        config,
      ) as unknown as InfiniteQueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseInfiniteQueryResult<
    TData,
    ResponseErrorConfig<FindAllLogsByExerciseId400Type | FindAllLogsByExerciseId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
