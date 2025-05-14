import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  FindFrequencyByWeekAndUserIdQueryResponseType,
  FindFrequencyByWeekAndUserId400Type,
  FindFrequencyByWeekAndUserId404Type,
} from '../../types/FindFrequencyByWeekAndUserIdType'

function getFindFrequencyByWeekAndUserIdUrl() {
  return `/session/frequency` as const
}

/**
 * {@link /session/frequency}
 */
export async function findFrequencyByWeekAndUserId(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FindFrequencyByWeekAndUserIdQueryResponseType,
    ResponseErrorConfig<FindFrequencyByWeekAndUserId400Type | FindFrequencyByWeekAndUserId404Type>,
    unknown
  >({ method: 'GET', url: getFindFrequencyByWeekAndUserIdUrl().toString(), ...requestConfig })
  return res.data
}
