import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { findTodaySessionByUserId } from '../../clients/SessionController/findTodaySessionByUserId'
import type {
  FindTodaySessionByUserIdQueryResponseType,
  FindTodaySessionByUserIdPathParamsType,
  FindTodaySessionByUserId400Type,
  FindTodaySessionByUserId404Type,
} from '../../types/FindTodaySessionByUserIdType'

export const findTodaySessionByUserIdQueryKey = ({
  workoutId,
}: {
  workoutId: FindTodaySessionByUserIdPathParamsType['workoutId']
}) => [{ url: '/session/today/:workoutId', params: { workoutId: workoutId } }] as const

export type FindTodaySessionByUserIdQueryKey = ReturnType<typeof findTodaySessionByUserIdQueryKey>

export function findTodaySessionByUserIdQueryOptions(
  { workoutId }: { workoutId: FindTodaySessionByUserIdPathParamsType['workoutId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findTodaySessionByUserIdQueryKey({ workoutId })
  return queryOptions<
    FindTodaySessionByUserIdQueryResponseType,
    ResponseErrorConfig<FindTodaySessionByUserId400Type | FindTodaySessionByUserId404Type>,
    FindTodaySessionByUserIdQueryResponseType,
    typeof queryKey
  >({
    enabled: !!workoutId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findTodaySessionByUserId({ workoutId }, config)
    },
  })
}

/**
 * {@link /session/today/:workoutId}
 */
export function useFindTodaySessionByUserId<
  TData = FindTodaySessionByUserIdQueryResponseType,
  TQueryData = FindTodaySessionByUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindTodaySessionByUserIdQueryKey,
>(
  { workoutId }: { workoutId: FindTodaySessionByUserIdPathParamsType['workoutId'] },
  options: {
    query?: Partial<
      QueryObserverOptions<
        FindTodaySessionByUserIdQueryResponseType,
        ResponseErrorConfig<FindTodaySessionByUserId400Type | FindTodaySessionByUserId404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findTodaySessionByUserIdQueryKey({ workoutId })

  const query = useQuery(
    {
      ...(findTodaySessionByUserIdQueryOptions({ workoutId }, config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<TData, ResponseErrorConfig<FindTodaySessionByUserId400Type | FindTodaySessionByUserId404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
