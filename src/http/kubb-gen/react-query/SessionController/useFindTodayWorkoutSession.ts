import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { findTodayWorkoutSession } from '../../clients/SessionController/findTodayWorkoutSession'
import type {
  FindTodayWorkoutSessionQueryResponseType,
  FindTodayWorkoutSessionPathParamsType,
  FindTodayWorkoutSession400Type,
  FindTodayWorkoutSession404Type,
} from '../../types/FindTodayWorkoutSessionType'

export const findTodayWorkoutSessionQueryKey = ({
  workoutId,
}: {
  workoutId: FindTodayWorkoutSessionPathParamsType['workoutId']
}) => [{ url: '/session/workout/:workoutId', params: { workoutId: workoutId } }] as const

export type FindTodayWorkoutSessionQueryKey = ReturnType<typeof findTodayWorkoutSessionQueryKey>

export function findTodayWorkoutSessionQueryOptions(
  { workoutId }: { workoutId: FindTodayWorkoutSessionPathParamsType['workoutId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findTodayWorkoutSessionQueryKey({ workoutId })
  return queryOptions<
    FindTodayWorkoutSessionQueryResponseType,
    ResponseErrorConfig<FindTodayWorkoutSession400Type | FindTodayWorkoutSession404Type>,
    FindTodayWorkoutSessionQueryResponseType,
    typeof queryKey
  >({
    enabled: !!workoutId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findTodayWorkoutSession({ workoutId }, config)
    },
  })
}

/**
 * {@link /session/workout/:workoutId}
 */
export function useFindTodayWorkoutSession<
  TData = FindTodayWorkoutSessionQueryResponseType,
  TQueryData = FindTodayWorkoutSessionQueryResponseType,
  TQueryKey extends QueryKey = FindTodayWorkoutSessionQueryKey,
>(
  { workoutId }: { workoutId: FindTodayWorkoutSessionPathParamsType['workoutId'] },
  options: {
    query?: Partial<
      QueryObserverOptions<
        FindTodayWorkoutSessionQueryResponseType,
        ResponseErrorConfig<FindTodayWorkoutSession400Type | FindTodayWorkoutSession404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findTodayWorkoutSessionQueryKey({ workoutId })

  const query = useQuery(
    {
      ...(findTodayWorkoutSessionQueryOptions({ workoutId }, config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<TData, ResponseErrorConfig<FindTodayWorkoutSession400Type | FindTodayWorkoutSession404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
