import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  SignUpMutationRequestType,
  SignUpMutationResponseType,
  SignUp400Type,
  SignUp409Type,
} from '../../types/SignUpType'

function getSignUpUrl() {
  return `/user/sign-up` as const
}

/**
 * {@link /user/sign-up}
 */
export async function signUp(
  { data }: { data: SignUpMutationRequestType },
  config: Partial<RequestConfig<SignUpMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    SignUpMutationResponseType,
    ResponseErrorConfig<SignUp400Type | SignUp409Type>,
    SignUpMutationRequestType
  >({
    method: 'POST',
    url: getSignUpUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}
