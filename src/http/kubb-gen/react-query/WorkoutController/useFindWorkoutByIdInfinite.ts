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

import { findWorkoutById } from '../../clients/WorkoutController/findWorkoutById'
import type {
  FindWorkoutByIdQueryResponseType,
  FindWorkoutByIdPathParamsType,
  FindWorkoutById400Type,
  FindWorkoutById404Type,
} from '../../types/FindWorkoutByIdType'

export const findWorkoutByIdInfiniteQueryKey = ({ id }: { id: FindWorkoutByIdPathParamsType['id'] }) =>
  [{ url: '/workout/by-id/:id', params: { id: id } }] as const

export type FindWorkoutByIdInfiniteQueryKey = ReturnType<typeof findWorkoutByIdInfiniteQueryKey>

export function findWorkoutByIdInfiniteQueryOptions(
  { id }: { id: FindWorkoutByIdPathParamsType['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = findWorkoutByIdInfiniteQueryKey({ id })
  return infiniteQueryOptions<
    FindWorkoutByIdQueryResponseType,
    ResponseErrorConfig<FindWorkoutById400Type | FindWorkoutById404Type>,
    FindWorkoutByIdQueryResponseType,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findWorkoutById({ id }, config)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      Array.isArray(lastPage) && lastPage.length === 0 ? undefined : lastPageParam + 1,
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
      firstPageParam <= 1 ? undefined : firstPageParam - 1,
  })
}

/**
 * {@link /workout/by-id/:id}
 */
export function useFindWorkoutByIdInfinite<
  TData = InfiniteData<FindWorkoutByIdQueryResponseType>,
  TQueryData = FindWorkoutByIdQueryResponseType,
  TQueryKey extends QueryKey = FindWorkoutByIdInfiniteQueryKey,
>(
  { id }: { id: FindWorkoutByIdPathParamsType['id'] },
  options: {
    query?: Partial<
      InfiniteQueryObserverOptions<
        FindWorkoutByIdQueryResponseType,
        ResponseErrorConfig<FindWorkoutById400Type | FindWorkoutById404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findWorkoutByIdInfiniteQueryKey({ id })

  const query = useInfiniteQuery(
    {
      ...(findWorkoutByIdInfiniteQueryOptions({ id }, config) as unknown as InfiniteQueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseInfiniteQueryResult<TData, ResponseErrorConfig<FindWorkoutById400Type | FindWorkoutById404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
