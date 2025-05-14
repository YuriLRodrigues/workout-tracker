import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { findPhysicalStatsByUserId } from '../../clients/PhysicalController/findPhysicalStatsByUserId'
import type {
  FindPhysicalStatsByUserIdQueryResponseType,
  FindPhysicalStatsByUserId400Type,
} from '../../types/FindPhysicalStatsByUserIdType'

export const findPhysicalStatsByUserIdQueryKey = () => [{ url: '/physical' }] as const

export type FindPhysicalStatsByUserIdQueryKey = ReturnType<typeof findPhysicalStatsByUserIdQueryKey>

export function findPhysicalStatsByUserIdQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findPhysicalStatsByUserIdQueryKey()
  return queryOptions<
    FindPhysicalStatsByUserIdQueryResponseType,
    ResponseErrorConfig<FindPhysicalStatsByUserId400Type>,
    FindPhysicalStatsByUserIdQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findPhysicalStatsByUserId(config)
    },
  })
}

/**
 * {@link /physical}
 */
export function useFindPhysicalStatsByUserId<
  TData = FindPhysicalStatsByUserIdQueryResponseType,
  TQueryData = FindPhysicalStatsByUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindPhysicalStatsByUserIdQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        FindPhysicalStatsByUserIdQueryResponseType,
        ResponseErrorConfig<FindPhysicalStatsByUserId400Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findPhysicalStatsByUserIdQueryKey()

  const query = useQuery(
    {
      ...(findPhysicalStatsByUserIdQueryOptions(config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<TData, ResponseErrorConfig<FindPhysicalStatsByUserId400Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
