import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { findExerciseById } from '../../clients/ExerciseController/findExerciseById'
import type {
  FindExerciseByIdQueryResponseType,
  FindExerciseByIdPathParamsType,
  FindExerciseById400Type,
  FindExerciseById404Type,
} from '../../types/FindExerciseByIdType'

export const findExerciseByIdQueryKey = ({ id }: { id: FindExerciseByIdPathParamsType['id'] }) =>
  [{ url: '/exercise/:id', params: { id: id } }] as const

export type FindExerciseByIdQueryKey = ReturnType<typeof findExerciseByIdQueryKey>

export function findExerciseByIdQueryOptions(
  { id }: { id: FindExerciseByIdPathParamsType['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findExerciseByIdQueryKey({ id })
  return queryOptions<
    FindExerciseByIdQueryResponseType,
    ResponseErrorConfig<FindExerciseById400Type | FindExerciseById404Type>,
    FindExerciseByIdQueryResponseType,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findExerciseById({ id }, config)
    },
  })
}

/**
 * {@link /exercise/:id}
 */
export function useFindExerciseById<
  TData = FindExerciseByIdQueryResponseType,
  TQueryData = FindExerciseByIdQueryResponseType,
  TQueryKey extends QueryKey = FindExerciseByIdQueryKey,
>(
  { id }: { id: FindExerciseByIdPathParamsType['id'] },
  options: {
    query?: Partial<
      QueryObserverOptions<
        FindExerciseByIdQueryResponseType,
        ResponseErrorConfig<FindExerciseById400Type | FindExerciseById404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findExerciseByIdQueryKey({ id })

  const query = useQuery(
    {
      ...(findExerciseByIdQueryOptions({ id }, config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<TData, ResponseErrorConfig<FindExerciseById400Type | FindExerciseById404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
