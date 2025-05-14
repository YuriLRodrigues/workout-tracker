import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  SignInMutationRequestType,
  SignInMutationResponseType,
  SignIn400Type,
  SignIn409Type,
} from '../../types/SignInType'

function getSignInUrl() {
  return `/user/sign-in` as const
}

/**
 * {@link /user/sign-in}
 */
export async function signIn(
  { data }: { data: SignInMutationRequestType },
  config: Partial<RequestConfig<SignInMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    SignInMutationResponseType,
    ResponseErrorConfig<SignIn400Type | SignIn409Type>,
    SignInMutationRequestType
  >({
    method: 'POST',
    url: getSignInUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}
