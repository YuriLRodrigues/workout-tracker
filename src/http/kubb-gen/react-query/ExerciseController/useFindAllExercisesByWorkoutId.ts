import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { findAllExercisesByWorkoutId } from '../../clients/ExerciseController/findAllExercisesByWorkoutId'
import type {
  FindAllExercisesByWorkoutIdQueryResponseType,
  FindAllExercisesByWorkoutIdPathParamsType,
  FindAllExercisesByWorkoutIdQueryParamsType,
  FindAllExercisesByWorkoutId400Type,
  FindAllExercisesByWorkoutId404Type,
} from '../../types/FindAllExercisesByWorkoutIdType'

export const findAllExercisesByWorkoutIdQueryKey = (
  { workoutId }: { workoutId: FindAllExercisesByWorkoutIdPathParamsType['workoutId'] },
  params?: FindAllExercisesByWorkoutIdQueryParamsType,
) => [{ url: '/exercise/many/:workoutId', params: { workoutId: workoutId } }, ...(params ? [params] : [])] as const

export type FindAllExercisesByWorkoutIdQueryKey = ReturnType<typeof findAllExercisesByWorkoutIdQueryKey>

export function findAllExercisesByWorkoutIdQueryOptions(
  {
    workoutId,
    params,
  }: {
    workoutId: FindAllExercisesByWorkoutIdPathParamsType['workoutId']
    params?: FindAllExercisesByWorkoutIdQueryParamsType
  },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findAllExercisesByWorkoutIdQueryKey({ workoutId }, params)
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
export function useFindAllExercisesByWorkoutId<
  TData = FindAllExercisesByWorkoutIdQueryResponseType,
  TQueryData = FindAllExercisesByWorkoutIdQueryResponseType,
  TQueryKey extends QueryKey = FindAllExercisesByWorkoutIdQueryKey,
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
      QueryObserverOptions<
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
  const queryKey = queryOptions?.queryKey ?? findAllExercisesByWorkoutIdQueryKey({ workoutId }, params)

  const query = useQuery(
    {
      ...(findAllExercisesByWorkoutIdQueryOptions({ workoutId, params }, config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<
    TData,
    ResponseErrorConfig<FindAllExercisesByWorkoutId400Type | FindAllExercisesByWorkoutId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
