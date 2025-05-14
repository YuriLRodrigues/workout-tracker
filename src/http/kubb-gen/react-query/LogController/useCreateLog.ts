import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import { createLog } from '../../clients/LogController/createLog'
import type {
  CreateLogMutationRequestType,
  CreateLogMutationResponseType,
  CreateLogPathParamsType,
  CreateLog400Type,
} from '../../types/CreateLogType'

export const createLogMutationKey = () => [{ url: '/log/{exerciseId}' }] as const

export type CreateLogMutationKey = ReturnType<typeof createLogMutationKey>

/**
 * {@link /log/:exerciseId}
 */
export function useCreateLog<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CreateLogMutationResponseType,
      ResponseErrorConfig<CreateLog400Type>,
      { exerciseId: CreateLogPathParamsType['exerciseId']; data: CreateLogMutationRequestType },
      TContext
    > & { client?: QueryClient }
    client?: Partial<RequestConfig<CreateLogMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: { client: queryClient, ...mutationOptions } = {}, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createLogMutationKey()

  return useMutation<
    CreateLogMutationResponseType,
    ResponseErrorConfig<CreateLog400Type>,
    { exerciseId: CreateLogPathParamsType['exerciseId']; data: CreateLogMutationRequestType },
    TContext
  >(
    {
      mutationFn: async ({ exerciseId, data }) => {
        return createLog({ exerciseId, data }, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}
