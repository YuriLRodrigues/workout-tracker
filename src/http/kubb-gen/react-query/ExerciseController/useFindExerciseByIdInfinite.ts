import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type {
  InfiniteData,
  QueryKey,
  QueryClient,
  InfiniteQueryObserverOptions,
  UseInfiniteQueryResult,
} from '@tanstack/react-query'
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'

import { findExerciseById } from '../../clients/ExerciseController/findExerciseById'
import type {
  FindExerciseByIdQueryResponseType,
  FindExerciseByIdPathParamsType,
  FindExerciseById400Type,
  FindExerciseById404Type,
} from '../../types/FindExerciseByIdType'

export const findExerciseByIdInfiniteQueryKey = ({ id }: { id: FindExerciseByIdPathParamsType['id'] }) =>
  [{ url: '/exercise/:id', params: { id: id } }] as const

export type FindExerciseByIdInfiniteQueryKey = ReturnType<typeof findExerciseByIdInfiniteQueryKey>

export function findExerciseByIdInfiniteQueryOptions(
  { id }: { id: FindExerciseByIdPathParamsType['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findExerciseByIdInfiniteQueryKey({ id })
  return infiniteQueryOptions<
    FindExerciseByIdQueryResponseType,
    ResponseErrorConfig<FindExerciseById400Type | FindExerciseById404Type>,
    FindExerciseByIdQueryResponseType,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findExerciseById({ id }, config)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      Array.isArray(lastPage) && lastPage.length === 0 ? undefined : lastPageParam + 1,
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
      firstPageParam <= 1 ? undefined : firstPageParam - 1,
  })
}

/**
 * {@link /exercise/:id}
 */
export function useFindExerciseByIdInfinite<
  TData = InfiniteData<FindExerciseByIdQueryResponseType>,
  TQueryData = FindExerciseByIdQueryResponseType,
  TQueryKey extends QueryKey = FindExerciseByIdInfiniteQueryKey,
>(
  { id }: { id: FindExerciseByIdPathParamsType['id'] },
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
        FindExerciseByIdQueryResponseType,
        ResponseErrorConfig<FindExerciseById400Type | FindExerciseById404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findExerciseByIdInfiniteQueryKey({ id })

  const query = useInfiniteQuery(
    {
      ...(findExerciseByIdInfiniteQueryOptions({ id }, config) as unknown as InfiniteQueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseInfiniteQueryResult<TData, ResponseErrorConfig<FindExerciseById400Type | FindExerciseById404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
