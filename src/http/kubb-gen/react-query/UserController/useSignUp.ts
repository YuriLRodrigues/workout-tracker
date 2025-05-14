import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import { signUp } from '../../clients/UserController/signUp'
import type {
  SignUpMutationRequestType,
  SignUpMutationResponseType,
  SignUp400Type,
  SignUp409Type,
} from '../../types/SignUpType'

export const signUpMutationKey = () => [{ url: '/user/sign-up' }] as const

export type SignUpMutationKey = ReturnType<typeof signUpMutationKey>

/**
 * {@link /user/sign-up}
 */
export function useSignUp<TContext>(
  options: {
    mutation?: UseMutationOptions<
      SignUpMutationResponseType,
      ResponseErrorConfig<SignUp400Type | SignUp409Type>,
      { data: SignUpMutationRequestType },
      TContext
    > & { client?: QueryClient }
    client?: Partial<RequestConfig<SignUpMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: { client: queryClient, ...mutationOptions } = {}, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? signUpMutationKey()

  return useMutation<
    SignUpMutationResponseType,
    ResponseErrorConfig<SignUp400Type | SignUp409Type>,
    { data: SignUpMutationRequestType },
    TContext
  >(
    {
      mutationFn: async ({ data }) => {
        return signUp({ data }, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}
