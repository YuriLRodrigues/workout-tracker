import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import { createSession } from '../../clients/SessionController/createSession'
import type {
  CreateSessionMutationResponseType,
  CreateSessionPathParamsType,
  CreateSession400Type,
  CreateSession404Type,
} from '../../types/CreateSessionType'

export const createSessionMutationKey = () => [{ url: '/session/{workoutId}' }] as const

export type CreateSessionMutationKey = ReturnType<typeof createSessionMutationKey>

/**
 * {@link /session/:workoutId}
 */
export function useCreateSession<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CreateSessionMutationResponseType,
      ResponseErrorConfig<CreateSession400Type | CreateSession404Type>,
      { workoutId: CreateSessionPathParamsType['workoutId'] },
      TContext
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: { client: queryClient, ...mutationOptions } = {}, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createSessionMutationKey()

  return useMutation<
    CreateSessionMutationResponseType,
    ResponseErrorConfig<CreateSession400Type | CreateSession404Type>,
    { workoutId: CreateSessionPathParamsType['workoutId'] },
    TContext
  >(
    {
      mutationFn: async ({ workoutId }) => {
        return createSession({ workoutId }, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}
