import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { findPhysicalStatsByUserId } from '../../clients/PhysicalController/findPhysicalStatsByUserId'
import type {
  FindPhysicalStatsByUserIdQueryResponseType,
  FindPhysicalStatsByUserId400Type,
} from '../../types/FindPhysicalStatsByUserIdType'

export const findPhysicalStatsByUserIdSuspenseQueryKey = () => [{ url: '/physical' }] as const

export type FindPhysicalStatsByUserIdSuspenseQueryKey = ReturnType<typeof findPhysicalStatsByUserIdSuspenseQueryKey>

export function findPhysicalStatsByUserIdSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findPhysicalStatsByUserIdSuspenseQueryKey()
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
export function useFindPhysicalStatsByUserIdSuspense<
  TData = FindPhysicalStatsByUserIdQueryResponseType,
  TQueryData = FindPhysicalStatsByUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindPhysicalStatsByUserIdSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FindPhysicalStatsByUserIdQueryResponseType,
        ResponseErrorConfig<FindPhysicalStatsByUserId400Type>,
        TData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findPhysicalStatsByUserIdSuspenseQueryKey()

  const query = useSuspenseQuery(
    {
      ...(findPhysicalStatsByUserIdSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<TData, ResponseErrorConfig<FindPhysicalStatsByUserId400Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
