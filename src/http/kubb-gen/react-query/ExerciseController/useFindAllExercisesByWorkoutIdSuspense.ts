import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { findAllExercisesByWorkoutId } from '../../clients/ExerciseController/findAllExercisesByWorkoutId'
import type {
  FindAllExercisesByWorkoutIdQueryResponseType,
  FindAllExercisesByWorkoutIdPathParamsType,
  FindAllExercisesByWorkoutIdQueryParamsType,
  FindAllExercisesByWorkoutId400Type,
  FindAllExercisesByWorkoutId404Type,
} from '../../types/FindAllExercisesByWorkoutIdType'

export const findAllExercisesByWorkoutIdSuspenseQueryKey = (
  { workoutId }: { workoutId: FindAllExercisesByWorkoutIdPathParamsType['workoutId'] },
  params?: FindAllExercisesByWorkoutIdQueryParamsType,
) => [{ url: '/exercise/many/:workoutId', params: { workoutId: workoutId } }, ...(params ? [params] : [])] as const

export type FindAllExercisesByWorkoutIdSuspenseQueryKey = ReturnType<typeof findAllExercisesByWorkoutIdSuspenseQueryKey>

export function findAllExercisesByWorkoutIdSuspenseQueryOptions(
  {
    workoutId,
    params,
  }: {
    workoutId: FindAllExercisesByWorkoutIdPathParamsType['workoutId']
    params?: FindAllExercisesByWorkoutIdQueryParamsType
  },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findAllExercisesByWorkoutIdSuspenseQueryKey({ workoutId }, params)
  return queryOptions<
    FindAllExercisesByWorkoutIdQueryResponseType,
    ResponseErrorConfig<FindAllExercisesByWorkoutId400Type | FindAllExercisesByWorkoutId404Type>,
    FindAllExercisesByWorkoutIdQueryResponseType,
    typeof queryKey
  >({
    enabled: !!workoutId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findAllExercisesByWorkoutId({ workoutId, params }, config)
    },
  })
}

/**
 * {@link /exercise/many/:workoutId}
 */
export function useFindAllExercisesByWorkoutIdSuspense<
  TData = FindAllExercisesByWorkoutIdQueryResponseType,
  TQueryData = FindAllExercisesByWorkoutIdQueryResponseType,
  TQueryKey extends QueryKey = FindAllExercisesByWorkoutIdSuspenseQueryKey,
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
      UseSuspenseQueryOptions<
        FindAllExercisesByWorkoutIdQueryResponseType,
        ResponseErrorConfig<FindAllExercisesByWorkoutId400Type | FindAllExercisesByWorkoutId404Type>,
        TData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findAllExercisesByWorkoutIdSuspenseQueryKey({ workoutId }, params)

  const query = useSuspenseQuery(
    {
      ...(findAllExercisesByWorkoutIdSuspenseQueryOptions(
        { workoutId, params },
        config,
      ) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<FindAllExercisesByWorkoutId400Type | FindAllExercisesByWorkoutId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
