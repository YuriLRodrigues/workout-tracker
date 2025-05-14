import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { findExerciseById } from '../../clients/ExerciseController/findExerciseById'
import type {
  FindExerciseByIdQueryResponseType,
  FindExerciseByIdPathParamsType,
  FindExerciseById400Type,
  FindExerciseById404Type,
} from '../../types/FindExerciseByIdType'

export const findExerciseByIdSuspenseQueryKey = ({ id }: { id: FindExerciseByIdPathParamsType['id'] }) =>
  [{ url: '/exercise/:id', params: { id: id } }] as const

export type FindExerciseByIdSuspenseQueryKey = ReturnType<typeof findExerciseByIdSuspenseQueryKey>

export function findExerciseByIdSuspenseQueryOptions(
  { id }: { id: FindExerciseByIdPathParamsType['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findExerciseByIdSuspenseQueryKey({ id })
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
export function useFindExerciseByIdSuspense<
  TData = FindExerciseByIdQueryResponseType,
  TQueryData = FindExerciseByIdQueryResponseType,
  TQueryKey extends QueryKey = FindExerciseByIdSuspenseQueryKey,
>(
  { id }: { id: FindExerciseByIdPathParamsType['id'] },
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FindExerciseByIdQueryResponseType,
        ResponseErrorConfig<FindExerciseById400Type | FindExerciseById404Type>,
        TData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findExerciseByIdSuspenseQueryKey({ id })

  const query = useSuspenseQuery(
    {
      ...(findExerciseByIdSuspenseQueryOptions({ id }, config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<TData, ResponseErrorConfig<FindExerciseById400Type | FindExerciseById404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
