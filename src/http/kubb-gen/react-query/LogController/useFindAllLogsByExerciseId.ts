import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { findAllLogsByExerciseId } from '../../clients/LogController/findAllLogsByExerciseId'
import type {
  FindAllLogsByExerciseIdQueryResponseType,
  FindAllLogsByExerciseIdPathParamsType,
  FindAllLogsByExerciseIdQueryParamsType,
  FindAllLogsByExerciseId400Type,
  FindAllLogsByExerciseId404Type,
} from '../../types/FindAllLogsByExerciseIdType'

export const findAllLogsByExerciseIdQueryKey = (
  { exerciseId }: { exerciseId: FindAllLogsByExerciseIdPathParamsType['exerciseId'] },
  params?: FindAllLogsByExerciseIdQueryParamsType,
) => [{ url: '/log/many/:exerciseId', params: { exerciseId: exerciseId } }, ...(params ? [params] : [])] as const

export type FindAllLogsByExerciseIdQueryKey = ReturnType<typeof findAllLogsByExerciseIdQueryKey>

export function findAllLogsByExerciseIdQueryOptions(
  {
    exerciseId,
    params,
  }: {
    exerciseId: FindAllLogsByExerciseIdPathParamsType['exerciseId']
    params?: FindAllLogsByExerciseIdQueryParamsType
  },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findAllLogsByExerciseIdQueryKey({ exerciseId }, params)
  return queryOptions<
    FindAllLogsByExerciseIdQueryResponseType,
    ResponseErrorConfig<FindAllLogsByExerciseId400Type | FindAllLogsByExerciseId404Type>,
    FindAllLogsByExerciseIdQueryResponseType,
    typeof queryKey
  >({
    enabled: !!exerciseId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findAllLogsByExerciseId({ exerciseId, params }, config)
    },
  })
}

/**
 * {@link /log/many/:exerciseId}
 */
export function useFindAllLogsByExerciseId<
  TData = FindAllLogsByExerciseIdQueryResponseType,
  TQueryData = FindAllLogsByExerciseIdQueryResponseType,
  TQueryKey extends QueryKey = FindAllLogsByExerciseIdQueryKey,
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
      QueryObserverOptions<
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
  const queryKey = queryOptions?.queryKey ?? findAllLogsByExerciseIdQueryKey({ exerciseId }, params)

  const query = useQuery(
    {
      ...(findAllLogsByExerciseIdQueryOptions({ exerciseId, params }, config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<TData, ResponseErrorConfig<FindAllLogsByExerciseId400Type | FindAllLogsByExerciseId404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
