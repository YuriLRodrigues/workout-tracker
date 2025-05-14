import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { findAllSessionByUserId } from '../../clients/SessionController/findAllSessionByUserId'
import type {
  FindAllSessionByUserIdQueryResponseType,
  FindAllSessionByUserIdPathParamsType,
  FindAllSessionByUserId400Type,
  FindAllSessionByUserId404Type,
} from '../../types/FindAllSessionByUserIdType'

export const findAllSessionByUserIdSuspenseQueryKey = ({
  page,
  limit,
}: {
  page: FindAllSessionByUserIdPathParamsType['page']
  limit: FindAllSessionByUserIdPathParamsType['limit']
}) => [{ url: '/session/all' }] as const

export type FindAllSessionByUserIdSuspenseQueryKey = ReturnType<typeof findAllSessionByUserIdSuspenseQueryKey>

export function findAllSessionByUserIdSuspenseQueryOptions(
  {
    page,
    limit,
  }: { page: FindAllSessionByUserIdPathParamsType['page']; limit: FindAllSessionByUserIdPathParamsType['limit'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findAllSessionByUserIdSuspenseQueryKey({ page, limit })
  return queryOptions<
    FindAllSessionByUserIdQueryResponseType,
    ResponseErrorConfig<FindAllSessionByUserId400Type | FindAllSessionByUserId404Type>,
    FindAllSessionByUserIdQueryResponseType,
    typeof queryKey
  >({
    enabled: !!(page && limit),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findAllSessionByUserId({ page, limit }, config)
    },
  })
}

/**
 * {@link /session/all}
 */
export function useFindAllSessionByUserIdSuspense<
  TData = FindAllSessionByUserIdQueryResponseType,
  TQueryData = FindAllSessionByUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindAllSessionByUserIdSuspenseQueryKey,
>(
  {
    page,
    limit,
  }: { page: FindAllSessionByUserIdPathParamsType['page']; limit: FindAllSessionByUserIdPathParamsType['limit'] },
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FindAllSessionByUserIdQueryResponseType,
        ResponseErrorConfig<FindAllSessionByUserId400Type | FindAllSessionByUserId404Type>,
        TData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findAllSessionByUserIdSuspenseQueryKey({ page, limit })

  const query = useSuspenseQuery(
    {
      ...(findAllSessionByUserIdSuspenseQueryOptions({ page, limit }, config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<FindAllSessionByUserId400Type | FindAllSessionByUserId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
