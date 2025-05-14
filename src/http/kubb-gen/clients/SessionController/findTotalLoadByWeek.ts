import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  FindTotalLoadByWeekQueryResponseType,
  FindTotalLoadByWeek400Type,
  FindTotalLoadByWeek404Type,
} from '../../types/FindTotalLoadByWeekType'

function getFindTotalLoadByWeekUrl() {
  return `/session/total-load-by-week` as const
}

/**
 * {@link /session/total-load-by-week}
 */
export async function findTotalLoadByWeek(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FindTotalLoadByWeekQueryResponseType,
    ResponseErrorConfig<FindTotalLoadByWeek400Type | FindTotalLoadByWeek404Type>,
    unknown
  >({
    method: 'GET',
    url: getFindTotalLoadByWeekUrl().toString(),
    ...requestConfig,
  })
  return res.data
}
