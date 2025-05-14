import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  ChangeMyUserPasswordMutationRequestType,
  ChangeMyUserPasswordMutationResponseType,
  ChangeMyUserPassword400Type,
  ChangeMyUserPassword404Type,
} from '../../types/ChangeMyUserPasswordType'

function getChangeMyUserPasswordUrl() {
  return `/user/change-password` as const
}

/**
 * {@link /user/change-password}
 */
export async function changeMyUserPassword(
  { data }: { data: ChangeMyUserPasswordMutationRequestType },
  config: Partial<RequestConfig<ChangeMyUserPasswordMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    ChangeMyUserPasswordMutationResponseType,
    ResponseErrorConfig<ChangeMyUserPassword400Type | ChangeMyUserPassword404Type>,
    ChangeMyUserPasswordMutationRequestType
  >({ method: 'PATCH', url: getChangeMyUserPasswordUrl().toString(), data, ...requestConfig })
  return res.data
}
