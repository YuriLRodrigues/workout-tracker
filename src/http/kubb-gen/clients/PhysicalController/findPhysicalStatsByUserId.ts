import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  FindPhysicalStatsByUserIdQueryResponseType,
  FindPhysicalStatsByUserId400Type,
} from '../../types/FindPhysicalStatsByUserIdType'

function getFindPhysicalStatsByUserIdUrl() {
  return `/physical` as const
}

/**
 * {@link /physical}
 */
export async function findPhysicalStatsByUserId(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FindPhysicalStatsByUserIdQueryResponseType,
    ResponseErrorConfig<FindPhysicalStatsByUserId400Type>,
    unknown
  >({
    method: 'GET',
    url: getFindPhysicalStatsByUserIdUrl().toString(),
    ...requestConfig,
  })
  return res.data
}
