import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import { forgotPassword } from '../../clients/User - ControllerController/forgotPassword'
import type {
  ForgotPasswordMutationRequestType,
  ForgotPasswordMutationResponseType,
  ForgotPassword400Type,
  ForgotPassword404Type,
} from '../../types/ForgotPasswordType'

export const forgotPasswordMutationKey = () => [{ url: '/user/forgot-password' }] as const

export type ForgotPasswordMutationKey = ReturnType<typeof forgotPasswordMutationKey>

/**
 * {@link /user/forgot-password}
 */
export function useForgotPassword<TContext>(
  options: {
    mutation?: UseMutationOptions<
      ForgotPasswordMutationResponseType,
      ResponseErrorConfig<ForgotPassword400Type | ForgotPassword404Type>,
      { data: ForgotPasswordMutationRequestType },
      TContext
    > & { client?: QueryClient }
    client?: Partial<RequestConfig<ForgotPasswordMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: { client: queryClient, ...mutationOptions } = {}, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? forgotPasswordMutationKey()

  return useMutation<
    ForgotPasswordMutationResponseType,
    ResponseErrorConfig<ForgotPassword400Type | ForgotPassword404Type>,
    { data: ForgotPasswordMutationRequestType },
    TContext
  >(
    {
      mutationFn: async ({ data }) => {
        return forgotPassword({ data }, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}
