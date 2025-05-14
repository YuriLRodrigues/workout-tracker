import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { findTodayWorkoutSession } from '../../clients/SessionController/findTodayWorkoutSession'
import type {
  FindTodayWorkoutSessionQueryResponseType,
  FindTodayWorkoutSessionPathParamsType,
  FindTodayWorkoutSession400Type,
  FindTodayWorkoutSession404Type,
} from '../../types/FindTodayWorkoutSessionType'

export const findTodayWorkoutSessionSuspenseQueryKey = ({
  workoutId,
}: {
  workoutId: FindTodayWorkoutSessionPathParamsType['workoutId']
}) => [{ url: '/session/workout/:workoutId', params: { workoutId: workoutId } }] as const

export type FindTodayWorkoutSessionSuspenseQueryKey = ReturnType<typeof findTodayWorkoutSessionSuspenseQueryKey>

export function findTodayWorkoutSessionSuspenseQueryOptions(
  { workoutId }: { workoutId: FindTodayWorkoutSessionPathParamsType['workoutId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findTodayWorkoutSessionSuspenseQueryKey({ workoutId })
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
export function useFindTodayWorkoutSessionSuspense<
  TData = FindTodayWorkoutSessionQueryResponseType,
  TQueryData = FindTodayWorkoutSessionQueryResponseType,
  TQueryKey extends QueryKey = FindTodayWorkoutSessionSuspenseQueryKey,
>(
  { workoutId }: { workoutId: FindTodayWorkoutSessionPathParamsType['workoutId'] },
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FindTodayWorkoutSessionQueryResponseType,
        ResponseErrorConfig<FindTodayWorkoutSession400Type | FindTodayWorkoutSession404Type>,
        TData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findTodayWorkoutSessionSuspenseQueryKey({ workoutId })

  const query = useSuspenseQuery(
    {
      ...(findTodayWorkoutSessionSuspenseQueryOptions({ workoutId }, config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<FindTodayWorkoutSession400Type | FindTodayWorkoutSession404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
