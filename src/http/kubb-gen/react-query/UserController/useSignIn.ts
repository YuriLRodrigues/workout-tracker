import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import { signIn } from '../../clients/UserController/signIn'
import type {
  SignInMutationRequestType,
  SignInMutationResponseType,
  SignIn400Type,
  SignIn409Type,
} from '../../types/SignInType'

export const signInMutationKey = () => [{ url: '/user/sign-in' }] as const

export type SignInMutationKey = ReturnType<typeof signInMutationKey>

/**
 * {@link /user/sign-in}
 */
export function useSignIn<TContext>(
  options: {
    mutation?: UseMutationOptions<
      SignInMutationResponseType,
      ResponseErrorConfig<SignIn400Type | SignIn409Type>,
      { data: SignInMutationRequestType },
      TContext
    > & { client?: QueryClient }
    client?: Partial<RequestConfig<SignInMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: { client: queryClient, ...mutationOptions } = {}, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? signInMutationKey()

  return useMutation<
    SignInMutationResponseType,
    ResponseErrorConfig<SignIn400Type | SignIn409Type>,
    { data: SignInMutationRequestType },
    TContext
  >(
    {
      mutationFn: async ({ data }) => {
        return signIn({ data }, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}
