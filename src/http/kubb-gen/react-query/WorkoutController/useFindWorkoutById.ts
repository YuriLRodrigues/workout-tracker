import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { findWorkoutById } from '../../clients/WorkoutController/findWorkoutById'
import type {
  FindWorkoutByIdQueryResponseType,
  FindWorkoutByIdPathParamsType,
  FindWorkoutById400Type,
  FindWorkoutById404Type,
} from '../../types/FindWorkoutByIdType'

export const findWorkoutByIdQueryKey = ({ id }: { id: FindWorkoutByIdPathParamsType['id'] }) =>
  [{ url: '/workout/by-id/:id', params: { id: id } }] as const

export type FindWorkoutByIdQueryKey = ReturnType<typeof findWorkoutByIdQueryKey>

export function findWorkoutByIdQueryOptions(
  { id }: { id: FindWorkoutByIdPathParamsType['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findWorkoutByIdQueryKey({ id })
  return queryOptions<
    FindWorkoutByIdQueryResponseType,
    ResponseErrorConfig<FindWorkoutById400Type | FindWorkoutById404Type>,
    FindWorkoutByIdQueryResponseType,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findWorkoutById({ id }, config)
    },
  })
}

/**
 * {@link /workout/by-id/:id}
 */
export function useFindWorkoutById<
  TData = FindWorkoutByIdQueryResponseType,
  TQueryData = FindWorkoutByIdQueryResponseType,
  TQueryKey extends QueryKey = FindWorkoutByIdQueryKey,
>(
  { id }: { id: FindWorkoutByIdPathParamsType['id'] },
  options: {
    query?: Partial<
      QueryObserverOptions<
        FindWorkoutByIdQueryResponseType,
        ResponseErrorConfig<FindWorkoutById400Type | FindWorkoutById404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findWorkoutByIdQueryKey({ id })

  const query = useQuery(
    {
      ...(findWorkoutByIdQueryOptions({ id }, config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<TData, ResponseErrorConfig<FindWorkoutById400Type | FindWorkoutById404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
