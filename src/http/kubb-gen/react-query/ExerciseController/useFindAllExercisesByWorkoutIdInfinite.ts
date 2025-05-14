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

import { findAllExercisesByWorkoutId } from '../../clients/ExerciseController/findAllExercisesByWorkoutId'
import type {
  FindAllExercisesByWorkoutIdQueryResponseType,
  FindAllExercisesByWorkoutIdPathParamsType,
  FindAllExercisesByWorkoutIdQueryParamsType,
  FindAllExercisesByWorkoutId400Type,
  FindAllExercisesByWorkoutId404Type,
} from '../../types/FindAllExercisesByWorkoutIdType'

export const findAllExercisesByWorkoutIdInfiniteQueryKey = (
  { workoutId }: { workoutId: FindAllExercisesByWorkoutIdPathParamsType['workoutId'] },
  params?: FindAllExercisesByWorkoutIdQueryParamsType,
) => [{ url: '/exercise/many/:workoutId', params: { workoutId: workoutId } }, ...(params ? [params] : [])] as const

export type FindAllExercisesByWorkoutIdInfiniteQueryKey = ReturnType<typeof findAllExercisesByWorkoutIdInfiniteQueryKey>

export function findAllExercisesByWorkoutIdInfiniteQueryOptions(
  {
    workoutId,
    params,
  }: {
    workoutId: FindAllExercisesByWorkoutIdPathParamsType['workoutId']
    params?: FindAllExercisesByWorkoutIdQueryParamsType
  },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findAllExercisesByWorkoutIdInfiniteQueryKey({ workoutId }, params)
  return infiniteQueryOptions<
    FindAllExercisesByWorkoutIdQueryResponseType,
    ResponseErrorConfig<FindAllExercisesByWorkoutId400Type | FindAllExercisesByWorkoutId404Type>,
    FindAllExercisesByWorkoutIdQueryResponseType,
    typeof queryKey,
    number
  >({
    enabled: !!workoutId,
    queryKey,
    queryFn: async ({ signal, pageParam }) => {
      config.signal = signal

      if (params) {
        params['pageSize'] = pageParam as unknown as FindAllExercisesByWorkoutIdQueryParamsType['pageSize']
      }
      return findAllExercisesByWorkoutId({ workoutId, params }, config)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      Array.isArray(lastPage) && lastPage.length === 0 ? undefined : lastPageParam + 1,
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
      firstPageParam <= 1 ? undefined : firstPageParam - 1,
  })
}

/**
 * {@link /exercise/many/:workoutId}
 */
export function useFindAllExercisesByWorkoutIdInfinite<
  TData = InfiniteData<FindAllExercisesByWorkoutIdQueryResponseType>,
  TQueryData = FindAllExercisesByWorkoutIdQueryResponseType,
  TQueryKey extends QueryKey = FindAllExercisesByWorkoutIdInfiniteQueryKey,
>(
  {
    workoutId,
    params,
  }: {
    workoutId: FindAllExercisesByWorkoutIdPathParamsType['workoutId']
    params?: FindAllExercisesByWorkoutIdQueryParamsType
  },
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
        FindAllExercisesByWorkoutIdQueryResponseType,
        ResponseErrorConfig<FindAllExercisesByWorkoutId400Type | FindAllExercisesByWorkoutId404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findAllExercisesByWorkoutIdInfiniteQueryKey({ workoutId }, params)

  const query = useInfiniteQuery(
    {
      ...(findAllExercisesByWorkoutIdInfiniteQueryOptions(
        { workoutId, params },
        config,
      ) as unknown as InfiniteQueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseInfiniteQueryResult<
    TData,
    ResponseErrorConfig<FindAllExercisesByWorkoutId400Type | FindAllExercisesByWorkoutId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
