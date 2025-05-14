import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { me } from '../../clients/UserController/me'
import type { MeQueryResponseType, Me400Type, Me404Type } from '../../types/MeType'

export const meSuspenseQueryKey = () => [{ url: '/user/me' }] as const

export type MeSuspenseQueryKey = ReturnType<typeof meSuspenseQueryKey>

export function meSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = meSuspenseQueryKey()
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
export function useMeSuspense<
  TData = MeQueryResponseType,
  TQueryData = MeQueryResponseType,
  TQueryKey extends QueryKey = MeSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<MeQueryResponseType, ResponseErrorConfig<Me400Type | Me404Type>, TData, TQueryKey>
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? meSuspenseQueryKey()

  const query = useSuspenseQuery(
    {
      ...(meSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Me400Type | Me404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
