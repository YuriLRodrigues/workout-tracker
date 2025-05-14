import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  FindTotalAndAvgTimeByUserIdQueryResponseType,
  FindTotalAndAvgTimeByUserId400Type,
  FindTotalAndAvgTimeByUserId404Type,
} from '../../types/FindTotalAndAvgTimeByUserIdType'

function getFindTotalAndAvgTimeByUserIdUrl() {
  return `/workout/metrics/time` as const
}

/**
 * {@link /workout/metrics/time}
 */
export async function findTotalAndAvgTimeByUserId(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FindTotalAndAvgTimeByUserIdQueryResponseType,
    ResponseErrorConfig<FindTotalAndAvgTimeByUserId400Type | FindTotalAndAvgTimeByUserId404Type>,
    unknown
  >({ method: 'GET', url: getFindTotalAndAvgTimeByUserIdUrl().toString(), ...requestConfig })
  return res.data
}
