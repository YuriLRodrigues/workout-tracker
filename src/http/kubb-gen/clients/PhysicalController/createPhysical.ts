import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  CreatePhysicalMutationRequestType,
  CreatePhysicalMutationResponseType,
  CreatePhysical400Type,
} from '../../types/CreatePhysicalType'

function getCreatePhysicalUrl() {
  return `/physical` as const
}

/**
 * {@link /physical}
 */
export async function createPhysical(
  { data }: { data: CreatePhysicalMutationRequestType },
  config: Partial<RequestConfig<CreatePhysicalMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    CreatePhysicalMutationResponseType,
    ResponseErrorConfig<CreatePhysical400Type>,
    CreatePhysicalMutationRequestType
  >({
    method: 'POST',
    url: getCreatePhysicalUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}
