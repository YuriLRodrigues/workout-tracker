import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  UpdatePhysicalMutationRequestType,
  UpdatePhysicalMutationResponseType,
  UpdatePhysical400Type,
} from '../../types/UpdatePhysicalType'

function getUpdatePhysicalUrl() {
  return `/physical` as const
}

/**
 * {@link /physical}
 */
export async function updatePhysical(
  { data }: { data?: UpdatePhysicalMutationRequestType },
  config: Partial<RequestConfig<UpdatePhysicalMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    UpdatePhysicalMutationResponseType,
    ResponseErrorConfig<UpdatePhysical400Type>,
    UpdatePhysicalMutationRequestType
  >({
    method: 'PATCH',
    url: getUpdatePhysicalUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}
