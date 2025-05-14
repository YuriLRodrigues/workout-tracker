import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { findLogTodayByExerciseId } from '../../clients/LogController/findLogTodayByExerciseId'
import type {
  FindLogTodayByExerciseIdQueryResponseType,
  FindLogTodayByExerciseIdPathParamsType,
  FindLogTodayByExerciseId400Type,
  FindLogTodayByExerciseId404Type,
} from '../../types/FindLogTodayByExerciseIdType'

export const findLogTodayByExerciseIdQueryKey = ({
  exerciseId,
}: {
  exerciseId: FindLogTodayByExerciseIdPathParamsType['exerciseId']
}) => [{ url: '/log/exercise/:exerciseId', params: { exerciseId: exerciseId } }] as const

export type FindLogTodayByExerciseIdQueryKey = ReturnType<typeof findLogTodayByExerciseIdQueryKey>

export function findLogTodayByExerciseIdQueryOptions(
  { exerciseId }: { exerciseId: FindLogTodayByExerciseIdPathParamsType['exerciseId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findLogTodayByExerciseIdQueryKey({ exerciseId })
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
export function useFindLogTodayByExerciseId<
  TData = FindLogTodayByExerciseIdQueryResponseType,
  TQueryData = FindLogTodayByExerciseIdQueryResponseType,
  TQueryKey extends QueryKey = FindLogTodayByExerciseIdQueryKey,
>(
  { exerciseId }: { exerciseId: FindLogTodayByExerciseIdPathParamsType['exerciseId'] },
  options: {
    query?: Partial<
      QueryObserverOptions<
        FindLogTodayByExerciseIdQueryResponseType,
        ResponseErrorConfig<FindLogTodayByExerciseId400Type | FindLogTodayByExerciseId404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findLogTodayByExerciseIdQueryKey({ exerciseId })

  const query = useQuery(
    {
      ...(findLogTodayByExerciseIdQueryOptions({ exerciseId }, config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<TData, ResponseErrorConfig<FindLogTodayByExerciseId400Type | FindLogTodayByExerciseId404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
