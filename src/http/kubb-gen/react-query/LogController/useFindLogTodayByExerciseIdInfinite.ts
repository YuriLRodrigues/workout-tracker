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

import { findLogTodayByExerciseId } from '../../clients/LogController/findLogTodayByExerciseId'
import type {
  FindLogTodayByExerciseIdQueryResponseType,
  FindLogTodayByExerciseIdPathParamsType,
  FindLogTodayByExerciseId400Type,
  FindLogTodayByExerciseId404Type,
} from '../../types/FindLogTodayByExerciseIdType'

export const findLogTodayByExerciseIdInfiniteQueryKey = ({
  exerciseId,
}: {
  exerciseId: FindLogTodayByExerciseIdPathParamsType['exerciseId']
}) => [{ url: '/log/exercise/:exerciseId', params: { exerciseId: exerciseId } }] as const

export type FindLogTodayByExerciseIdInfiniteQueryKey = ReturnType<typeof findLogTodayByExerciseIdInfiniteQueryKey>

export function findLogTodayByExerciseIdInfiniteQueryOptions(
  { exerciseId }: { exerciseId: FindLogTodayByExerciseIdPathParamsType['exerciseId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findLogTodayByExerciseIdInfiniteQueryKey({ exerciseId })
  return infiniteQueryOptions<
    FindLogTodayByExerciseIdQueryResponseType,
    ResponseErrorConfig<FindLogTodayByExerciseId400Type | FindLogTodayByExerciseId404Type>,
    FindLogTodayByExerciseIdQueryResponseType,
    typeof queryKey
  >({
    enabled: !!exerciseId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findLogTodayByExerciseId({ exerciseId }, config)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      Array.isArray(lastPage) && lastPage.length === 0 ? undefined : lastPageParam + 1,
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
      firstPageParam <= 1 ? undefined : firstPageParam - 1,
  })
}

/**
 * {@link /log/exercise/:exerciseId}
 */
export function useFindLogTodayByExerciseIdInfinite<
  TData = InfiniteData<FindLogTodayByExerciseIdQueryResponseType>,
  TQueryData = FindLogTodayByExerciseIdQueryResponseType,
  TQueryKey extends QueryKey = FindLogTodayByExerciseIdInfiniteQueryKey,
>(
  { exerciseId }: { exerciseId: FindLogTodayByExerciseIdPathParamsType['exerciseId'] },
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
        FindLogTodayByExerciseIdQueryResponseType,
        ResponseErrorConfig<FindLogTodayByExerciseId400Type | FindLogTodayByExerciseId404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findLogTodayByExerciseIdInfiniteQueryKey({ exerciseId })

  const query = useInfiniteQuery(
    {
      ...(findLogTodayByExerciseIdInfiniteQueryOptions(
        { exerciseId },
        config,
      ) as unknown as InfiniteQueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseInfiniteQueryResult<
    TData,
    ResponseErrorConfig<FindLogTodayByExerciseId400Type | FindLogTodayByExerciseId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
