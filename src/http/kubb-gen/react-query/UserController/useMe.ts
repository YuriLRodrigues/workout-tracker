import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { me } from '../../clients/UserController/me'
import type { MeQueryResponseType, Me400Type, Me404Type } from '../../types/MeType'

export const meQueryKey = () => [{ url: '/user/me' }] as const

export type MeQueryKey = ReturnType<typeof meQueryKey>

export function meQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = meQueryKey()
  return queryOptions<
    MeQueryResponseType,
    ResponseErrorConfig<Me400Type | Me404Type>,
    MeQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return me(config)
    },
  })
}

/**
 * {@link /user/me}
 */
export function useMe<
  TData = MeQueryResponseType,
  TQueryData = MeQueryResponseType,
  TQueryKey extends QueryKey = MeQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        MeQueryResponseType,
        ResponseErrorConfig<Me400Type | Me404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & {
      client?: QueryClient
    }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? meQueryKey()

  const query = useQuery(
    {
      ...(meQueryOptions(config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<TData, ResponseErrorConfig<Me400Type | Me404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
