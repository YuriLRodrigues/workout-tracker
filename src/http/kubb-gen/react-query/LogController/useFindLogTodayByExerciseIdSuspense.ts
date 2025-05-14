import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { findLogTodayByExerciseId } from '../../clients/LogController/findLogTodayByExerciseId'
import type {
  FindLogTodayByExerciseIdQueryResponseType,
  FindLogTodayByExerciseIdPathParamsType,
  FindLogTodayByExerciseId400Type,
  FindLogTodayByExerciseId404Type,
} from '../../types/FindLogTodayByExerciseIdType'

export const findLogTodayByExerciseIdSuspenseQueryKey = ({
  exerciseId,
}: {
  exerciseId: FindLogTodayByExerciseIdPathParamsType['exerciseId']
}) => [{ url: '/log/exercise/:exerciseId', params: { exerciseId: exerciseId } }] as const

export type FindLogTodayByExerciseIdSuspenseQueryKey = ReturnType<typeof findLogTodayByExerciseIdSuspenseQueryKey>

export function findLogTodayByExerciseIdSuspenseQueryOptions(
  { exerciseId }: { exerciseId: FindLogTodayByExerciseIdPathParamsType['exerciseId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findLogTodayByExerciseIdSuspenseQueryKey({ exerciseId })
  return queryOptions<
    FindLogTodayByExerciseIdQueryResponseType,
    ResponseErrorConfig<FindLogTodayByExerciseId400Type | FindLogTodayByExerciseId404Type>,
    FindLogTodayByExerciseIdQueryResponseType,
    typeof queryKey
  >({
    enabled: !!exerciseId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findLogTodayByExerciseId({ exerciseId }, config)
    },
  })
}

/**
 * {@link /log/exercise/:exerciseId}
 */
export function useFindLogTodayByExerciseIdSuspense<
  TData = FindLogTodayByExerciseIdQueryResponseType,
  TQueryData = FindLogTodayByExerciseIdQueryResponseType,
  TQueryKey extends QueryKey = FindLogTodayByExerciseIdSuspenseQueryKey,
>(
  { exerciseId }: { exerciseId: FindLogTodayByExerciseIdPathParamsType['exerciseId'] },
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FindLogTodayByExerciseIdQueryResponseType,
        ResponseErrorConfig<FindLogTodayByExerciseId400Type | FindLogTodayByExerciseId404Type>,
        TData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findLogTodayByExerciseIdSuspenseQueryKey({ exerciseId })

  const query = useSuspenseQuery(
    {
      ...(findLogTodayByExerciseIdSuspenseQueryOptions({ exerciseId }, config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<FindLogTodayByExerciseId400Type | FindLogTodayByExerciseId404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
