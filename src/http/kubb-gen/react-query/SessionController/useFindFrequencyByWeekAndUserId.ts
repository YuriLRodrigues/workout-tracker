import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { findFrequencyByWeekAndUserId } from '../../clients/SessionController/findFrequencyByWeekAndUserId'
import type {
  FindFrequencyByWeekAndUserIdQueryResponseType,
  FindFrequencyByWeekAndUserId400Type,
  FindFrequencyByWeekAndUserId404Type,
} from '../../types/FindFrequencyByWeekAndUserIdType'

export const findFrequencyByWeekAndUserIdQueryKey = () => [{ url: '/session/frequency' }] as const

export type FindFrequencyByWeekAndUserIdQueryKey = ReturnType<typeof findFrequencyByWeekAndUserIdQueryKey>

export function findFrequencyByWeekAndUserIdQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findFrequencyByWeekAndUserIdQueryKey()
  return queryOptions<
    FindFrequencyByWeekAndUserIdQueryResponseType,
    ResponseErrorConfig<FindFrequencyByWeekAndUserId400Type | FindFrequencyByWeekAndUserId404Type>,
    FindFrequencyByWeekAndUserIdQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findFrequencyByWeekAndUserId(config)
    },
  })
}

/**
 * {@link /session/frequency}
 */
export function useFindFrequencyByWeekAndUserId<
  TData = FindFrequencyByWeekAndUserIdQueryResponseType,
  TQueryData = FindFrequencyByWeekAndUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindFrequencyByWeekAndUserIdQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        FindFrequencyByWeekAndUserIdQueryResponseType,
        ResponseErrorConfig<FindFrequencyByWeekAndUserId400Type | FindFrequencyByWeekAndUserId404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findFrequencyByWeekAndUserIdQueryKey()

  const query = useQuery(
    {
      ...(findFrequencyByWeekAndUserIdQueryOptions(config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<
    TData,
    ResponseErrorConfig<FindFrequencyByWeekAndUserId400Type | FindFrequencyByWeekAndUserId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
