import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { findTodaySessionByUserId } from '../../clients/SessionController/findTodaySessionByUserId'
import type {
  FindTodaySessionByUserIdQueryResponseType,
  FindTodaySessionByUserIdPathParamsType,
  FindTodaySessionByUserId400Type,
  FindTodaySessionByUserId404Type,
} from '../../types/FindTodaySessionByUserIdType'

export const findTodaySessionByUserIdSuspenseQueryKey = ({
  workoutId,
}: {
  workoutId: FindTodaySessionByUserIdPathParamsType['workoutId']
}) => [{ url: '/session/today/:workoutId', params: { workoutId: workoutId } }] as const

export type FindTodaySessionByUserIdSuspenseQueryKey = ReturnType<typeof findTodaySessionByUserIdSuspenseQueryKey>

export function findTodaySessionByUserIdSuspenseQueryOptions(
  { workoutId }: { workoutId: FindTodaySessionByUserIdPathParamsType['workoutId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findTodaySessionByUserIdSuspenseQueryKey({ workoutId })
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
export function useFindTodaySessionByUserIdSuspense<
  TData = FindTodaySessionByUserIdQueryResponseType,
  TQueryData = FindTodaySessionByUserIdQueryResponseType,
  TQueryKey extends QueryKey = FindTodaySessionByUserIdSuspenseQueryKey,
>(
  { workoutId }: { workoutId: FindTodaySessionByUserIdPathParamsType['workoutId'] },
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FindTodaySessionByUserIdQueryResponseType,
        ResponseErrorConfig<FindTodaySessionByUserId400Type | FindTodaySessionByUserId404Type>,
        TData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findTodaySessionByUserIdSuspenseQueryKey({ workoutId })

  const query = useSuspenseQuery(
    {
      ...(findTodaySessionByUserIdSuspenseQueryOptions({ workoutId }, config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<FindTodaySessionByUserId400Type | FindTodaySessionByUserId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
