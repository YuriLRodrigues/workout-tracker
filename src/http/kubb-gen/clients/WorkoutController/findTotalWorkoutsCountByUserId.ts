import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  FindTotalWorkoutsCountByUserIdQueryResponseType,
  FindTotalWorkoutsCountByUserId400Type,
  FindTotalWorkoutsCountByUserId404Type,
} from '../../types/FindTotalWorkoutsCountByUserIdType'

function getFindTotalWorkoutsCountByUserIdUrl() {
  return `/workout/metrics/count` as const
}

/**
 * {@link /workout/metrics/count}
 */
export async function findTotalWorkoutsCountByUserId(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FindTotalWorkoutsCountByUserIdQueryResponseType,
    ResponseErrorConfig<FindTotalWorkoutsCountByUserId400Type | FindTotalWorkoutsCountByUserId404Type>,
    unknown
  >({ method: 'GET', url: getFindTotalWorkoutsCountByUserIdUrl().toString(), ...requestConfig })
  return res.data
}
