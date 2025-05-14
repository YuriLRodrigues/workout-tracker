import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { findAllLogsToday } from '../../clients/LogController/findAllLogsToday'
import type {
  FindAllLogsTodayQueryResponseType,
  FindAllLogsTodayPathParamsType,
  FindAllLogsToday400Type,
  FindAllLogsToday404Type,
} from '../../types/FindAllLogsTodayType'

export const findAllLogsTodaySuspenseQueryKey = ({
  workoutId,
}: {
  workoutId: FindAllLogsTodayPathParamsType['workoutId']
}) => [{ url: '/log/metrics/:workoutId', params: { workoutId: workoutId } }] as const

export type FindAllLogsTodaySuspenseQueryKey = ReturnType<typeof findAllLogsTodaySuspenseQueryKey>

export function findAllLogsTodaySuspenseQueryOptions(
  { workoutId }: { workoutId: FindAllLogsTodayPathParamsType['workoutId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findAllLogsTodaySuspenseQueryKey({ workoutId })
  return queryOptions<
    FindAllLogsTodayQueryResponseType,
    ResponseErrorConfig<FindAllLogsToday400Type | FindAllLogsToday404Type>,
    FindAllLogsTodayQueryResponseType,
    typeof queryKey
  >({
    enabled: !!workoutId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findAllLogsToday({ workoutId }, config)
    },
  })
}

/**
 * {@link /log/metrics/:workoutId}
 */
export function useFindAllLogsTodaySuspense<
  TData = FindAllLogsTodayQueryResponseType,
  TQueryData = FindAllLogsTodayQueryResponseType,
  TQueryKey extends QueryKey = FindAllLogsTodaySuspenseQueryKey,
>(
  { workoutId }: { workoutId: FindAllLogsTodayPathParamsType['workoutId'] },
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FindAllLogsTodayQueryResponseType,
        ResponseErrorConfig<FindAllLogsToday400Type | FindAllLogsToday404Type>,
        TData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findAllLogsTodaySuspenseQueryKey({ workoutId })

  const query = useSuspenseQuery(
    {
      ...(findAllLogsTodaySuspenseQueryOptions({ workoutId }, config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<TData, ResponseErrorConfig<FindAllLogsToday400Type | FindAllLogsToday404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
