import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  ForgotPasswordMutationRequestType,
  ForgotPasswordMutationResponseType,
  ForgotPassword400Type,
  ForgotPassword404Type,
} from '../../types/ForgotPasswordType'

function getForgotPasswordUrl() {
  return `/user/forgot-password` as const
}

/**
 * {@link /user/forgot-password}
 */
export async function forgotPassword(
  { data }: { data: ForgotPasswordMutationRequestType },
  config: Partial<RequestConfig<ForgotPasswordMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    ForgotPasswordMutationResponseType,
    ResponseErrorConfig<ForgotPassword400Type | ForgotPassword404Type>,
    ForgotPasswordMutationRequestType
  >({ method: 'POST', url: getForgotPasswordUrl().toString(), data, ...requestConfig })
  return res.data
}
