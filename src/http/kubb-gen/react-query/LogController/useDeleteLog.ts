import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import { deleteLog } from '../../clients/LogController/deleteLog'
import type {
  DeleteLogMutationResponseType,
  DeleteLogPathParamsType,
  DeleteLog400Type,
  DeleteLog403Type,
  DeleteLog404Type,
} from '../../types/DeleteLogType'

export const deleteLogMutationKey = () => [{ url: '/log/{id}' }] as const

export type DeleteLogMutationKey = ReturnType<typeof deleteLogMutationKey>

/**
 * {@link /log/:id}
 */
export function useDeleteLog<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeleteLogMutationResponseType,
      ResponseErrorConfig<DeleteLog400Type | DeleteLog403Type | DeleteLog404Type>,
      { id: DeleteLogPathParamsType['id'] },
      TContext
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: { client: queryClient, ...mutationOptions } = {}, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteLogMutationKey()

  return useMutation<
    DeleteLogMutationResponseType,
    ResponseErrorConfig<DeleteLog400Type | DeleteLog403Type | DeleteLog404Type>,
    { id: DeleteLogPathParamsType['id'] },
    TContext
  >(
    {
      mutationFn: async ({ id }) => {
        return deleteLog({ id }, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}
