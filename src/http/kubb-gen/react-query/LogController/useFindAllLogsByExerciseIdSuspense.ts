import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { findAllLogsByExerciseId } from '../../clients/LogController/findAllLogsByExerciseId'
import type {
  FindAllLogsByExerciseIdQueryResponseType,
  FindAllLogsByExerciseIdPathParamsType,
  FindAllLogsByExerciseIdQueryParamsType,
  FindAllLogsByExerciseId400Type,
  FindAllLogsByExerciseId404Type,
} from '../../types/FindAllLogsByExerciseIdType'

export const findAllLogsByExerciseIdSuspenseQueryKey = (
  { exerciseId }: { exerciseId: FindAllLogsByExerciseIdPathParamsType['exerciseId'] },
  params?: FindAllLogsByExerciseIdQueryParamsType,
) => [{ url: '/log/many/:exerciseId', params: { exerciseId: exerciseId } }, ...(params ? [params] : [])] as const

export type FindAllLogsByExerciseIdSuspenseQueryKey = ReturnType<typeof findAllLogsByExerciseIdSuspenseQueryKey>

export function findAllLogsByExerciseIdSuspenseQueryOptions(
  {
    exerciseId,
    params,
  }: {
    exerciseId: FindAllLogsByExerciseIdPathParamsType['exerciseId']
    params?: FindAllLogsByExerciseIdQueryParamsType
  },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findAllLogsByExerciseIdSuspenseQueryKey({ exerciseId }, params)
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
export function useFindAllLogsByExerciseIdSuspense<
  TData = FindAllLogsByExerciseIdQueryResponseType,
  TQueryData = FindAllLogsByExerciseIdQueryResponseType,
  TQueryKey extends QueryKey = FindAllLogsByExerciseIdSuspenseQueryKey,
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
      UseSuspenseQueryOptions<
        FindAllLogsByExerciseIdQueryResponseType,
        ResponseErrorConfig<FindAllLogsByExerciseId400Type | FindAllLogsByExerciseId404Type>,
        TData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findAllLogsByExerciseIdSuspenseQueryKey({ exerciseId }, params)

  const query = useSuspenseQuery(
    {
      ...(findAllLogsByExerciseIdSuspenseQueryOptions(
        { exerciseId, params },
        config,
      ) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<FindAllLogsByExerciseId400Type | FindAllLogsByExerciseId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
