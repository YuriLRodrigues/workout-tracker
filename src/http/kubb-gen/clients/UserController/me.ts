import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type { MeQueryResponseType, Me400Type, Me404Type } from '../../types/MeType'

function getMeUrl() {
  return `/user/me` as const
}

/**
 * {@link /user/me}
 */
export async function me(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<MeQueryResponseType, ResponseErrorConfig<Me400Type | Me404Type>, unknown>({
    method: 'GET',
    url: getMeUrl().toString(),
    ...requestConfig,
  })
  return res.data
}
