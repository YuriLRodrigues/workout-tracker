import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  UpdatePersonalInfoMutationRequestType,
  UpdatePersonalInfoMutationResponseType,
  UpdatePersonalInfo400Type,
  UpdatePersonalInfo409Type,
} from '../../types/UpdatePersonalInfoType'

function getUpdatePersonalInfoUrl() {
  return `/user/personal-info` as const
}

/**
 * {@link /user/personal-info}
 */
export async function updatePersonalInfo(
  { data }: { data?: UpdatePersonalInfoMutationRequestType },
  config: Partial<RequestConfig<UpdatePersonalInfoMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    UpdatePersonalInfoMutationResponseType,
    ResponseErrorConfig<UpdatePersonalInfo400Type | UpdatePersonalInfo409Type>,
    UpdatePersonalInfoMutationRequestType
  >({ method: 'PATCH', url: getUpdatePersonalInfoUrl().toString(), data, ...requestConfig })
  return res.data
}
