import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { findWorkoutById } from '../../clients/WorkoutController/findWorkoutById'
import type {
  FindWorkoutByIdQueryResponseType,
  FindWorkoutByIdPathParamsType,
  FindWorkoutById400Type,
  FindWorkoutById404Type,
} from '../../types/FindWorkoutByIdType'

export const findWorkoutByIdSuspenseQueryKey = ({ id }: { id: FindWorkoutByIdPathParamsType['id'] }) =>
  [{ url: '/workout/by-id/:id', params: { id: id } }] as const

export type FindWorkoutByIdSuspenseQueryKey = ReturnType<typeof findWorkoutByIdSuspenseQueryKey>

export function findWorkoutByIdSuspenseQueryOptions(
  { id }: { id: FindWorkoutByIdPathParamsType['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findWorkoutByIdSuspenseQueryKey({ id })
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
export function useFindWorkoutByIdSuspense<
  TData = FindWorkoutByIdQueryResponseType,
  TQueryData = FindWorkoutByIdQueryResponseType,
  TQueryKey extends QueryKey = FindWorkoutByIdSuspenseQueryKey,
>(
  { id }: { id: FindWorkoutByIdPathParamsType['id'] },
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FindWorkoutByIdQueryResponseType,
        ResponseErrorConfig<FindWorkoutById400Type | FindWorkoutById404Type>,
        TData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findWorkoutByIdSuspenseQueryKey({ id })

  const query = useSuspenseQuery(
    {
      ...(findWorkoutByIdSuspenseQueryOptions({ id }, config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<TData, ResponseErrorConfig<FindWorkoutById400Type | FindWorkoutById404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
