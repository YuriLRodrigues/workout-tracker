import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  NewPasswordMutationRequestType,
  NewPasswordMutationResponseType,
  NewPasswordQueryParamsType,
  NewPassword400Type,
  NewPassword401Type,
} from '../../types/NewPasswordType'

function getNewPasswordUrl() {
  return `/user/new-password` as const
}

/**
 * {@link /user/new-password}
 */
export async function newPassword(
  { data, params }: { data: NewPasswordMutationRequestType; params: NewPasswordQueryParamsType },
  config: Partial<RequestConfig<NewPasswordMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    NewPasswordMutationResponseType,
    ResponseErrorConfig<NewPassword400Type | NewPassword401Type>,
    NewPasswordMutationRequestType
  >({
    method: 'PATCH',
    url: getNewPasswordUrl().toString(),
    params,
    data,
    ...requestConfig,
  })
  return res.data
}
