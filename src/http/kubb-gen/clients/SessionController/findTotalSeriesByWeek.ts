import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  FindTotalSeriesByWeekQueryResponseType,
  FindTotalSeriesByWeek400Type,
  FindTotalSeriesByWeek404Type,
} from '../../types/FindTotalSeriesByWeekType'

function getFindTotalSeriesByWeekUrl() {
  return `/session/total-series-by-week` as const
}

/**
 * {@link /session/total-series-by-week}
 */
export async function findTotalSeriesByWeek(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FindTotalSeriesByWeekQueryResponseType,
    ResponseErrorConfig<FindTotalSeriesByWeek400Type | FindTotalSeriesByWeek404Type>,
    unknown
  >({
    method: 'GET',
    url: getFindTotalSeriesByWeekUrl().toString(),
    ...requestConfig,
  })
  return res.data
}
