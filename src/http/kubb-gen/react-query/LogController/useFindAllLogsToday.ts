import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { findAllLogsToday } from '../../clients/LogController/findAllLogsToday'
import type {
  FindAllLogsTodayQueryResponseType,
  FindAllLogsTodayPathParamsType,
  FindAllLogsToday400Type,
  FindAllLogsToday404Type,
} from '../../types/FindAllLogsTodayType'

export const findAllLogsTodayQueryKey = ({ workoutId }: { workoutId: FindAllLogsTodayPathParamsType['workoutId'] }) =>
  [{ url: '/log/metrics/:workoutId', params: { workoutId: workoutId } }] as const

export type FindAllLogsTodayQueryKey = ReturnType<typeof findAllLogsTodayQueryKey>

export function findAllLogsTodayQueryOptions(
  { workoutId }: { workoutId: FindAllLogsTodayPathParamsType['workoutId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findAllLogsTodayQueryKey({ workoutId })
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
export function useFindAllLogsToday<
  TData = FindAllLogsTodayQueryResponseType,
  TQueryData = FindAllLogsTodayQueryResponseType,
  TQueryKey extends QueryKey = FindAllLogsTodayQueryKey,
>(
  { workoutId }: { workoutId: FindAllLogsTodayPathParamsType['workoutId'] },
  options: {
    query?: Partial<
      QueryObserverOptions<
        FindAllLogsTodayQueryResponseType,
        ResponseErrorConfig<FindAllLogsToday400Type | FindAllLogsToday404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findAllLogsTodayQueryKey({ workoutId })

  const query = useQuery(
    {
      ...(findAllLogsTodayQueryOptions({ workoutId }, config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<TData, ResponseErrorConfig<FindAllLogsToday400Type | FindAllLogsToday404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
