import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { findFrequencyByWeekAndUserId } from '../../clients/SessionController/findFrequencyByWeekAndUserId'
import type {
  FindFrequencyByWeekAndUserIdQueryResponseType,
  FindFrequencyByWeekAndUserId400Type,
  FindFrequencyByWeekAndUserId404Type,
} from '../../types/FindFrequencyByWeekAndUserIdType'

export const findFrequencyByWeekAndUserIdSuspenseQueryKey = () => [{ url: '/session/frequency' }] as const

export type FindFrequencyByWeekAndUserIdSuspenseQueryKey = ReturnType<
  typeof findFrequencyByWeekAndUserIdSuspenseQueryKey
>

export function findFrequencyByWeekAndUserIdSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findFrequencyByWeekAndUserIdSuspenseQueryKey()
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
export function useFindFrequencyByWeekAndUserIdSuspense<
  TData = FindFrequencyByWeekAndUserIdQueryResponseType,
  TQueryData = FindFrequencyByWeekAndUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindFrequencyByWeekAndUserIdSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FindFrequencyByWeekAndUserIdQueryResponseType,
        ResponseErrorConfig<FindFrequencyByWeekAndUserId400Type | FindFrequencyByWeekAndUserId404Type>,
        TData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findFrequencyByWeekAndUserIdSuspenseQueryKey()

  const query = useSuspenseQuery(
    {
      ...(findFrequencyByWeekAndUserIdSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<FindFrequencyByWeekAndUserId400Type | FindFrequencyByWeekAndUserId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
