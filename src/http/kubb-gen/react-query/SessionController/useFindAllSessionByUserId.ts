import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { findAllSessionByUserId } from '../../clients/SessionController/findAllSessionByUserId'
import type {
  FindAllSessionByUserIdQueryResponseType,
  FindAllSessionByUserIdPathParamsType,
  FindAllSessionByUserId400Type,
  FindAllSessionByUserId404Type,
} from '../../types/FindAllSessionByUserIdType'

export const findAllSessionByUserIdQueryKey = ({
  page,
  limit,
}: {
  page: FindAllSessionByUserIdPathParamsType['page']
  limit: FindAllSessionByUserIdPathParamsType['limit']
}) => [{ url: '/session/all' }] as const

export type FindAllSessionByUserIdQueryKey = ReturnType<typeof findAllSessionByUserIdQueryKey>

export function findAllSessionByUserIdQueryOptions(
  {
    page,
    limit,
  }: { page: FindAllSessionByUserIdPathParamsType['page']; limit: FindAllSessionByUserIdPathParamsType['limit'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findAllSessionByUserIdQueryKey({ page, limit })
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
export function useFindAllSessionByUserId<
  TData = FindAllSessionByUserIdQueryResponseType,
  TQueryData = FindAllSessionByUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindAllSessionByUserIdQueryKey,
>(
  {
    page,
    limit,
  }: { page: FindAllSessionByUserIdPathParamsType['page']; limit: FindAllSessionByUserIdPathParamsType['limit'] },
  options: {
    query?: Partial<
      QueryObserverOptions<
        FindAllSessionByUserIdQueryResponseType,
        ResponseErrorConfig<FindAllSessionByUserId400Type | FindAllSessionByUserId404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findAllSessionByUserIdQueryKey({ page, limit })

  const query = useQuery(
    {
      ...(findAllSessionByUserIdQueryOptions({ page, limit }, config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<TData, ResponseErrorConfig<FindAllSessionByUserId400Type | FindAllSessionByUserId404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
