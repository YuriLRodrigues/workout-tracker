import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  FindAverageTimeByWeekQueryResponseType,
  FindAverageTimeByWeek400Type,
  FindAverageTimeByWeek404Type,
} from '../../types/FindAverageTimeByWeekType'

function getFindAverageTimeByWeekUrl() {
  return `/session/avg-time-by-week` as const
}

/**
 * {@link /session/avg-time-by-week}
 */
export async function findAverageTimeByWeek(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FindAverageTimeByWeekQueryResponseType,
    ResponseErrorConfig<FindAverageTimeByWeek400Type | FindAverageTimeByWeek404Type>,
    unknown
  >({
    method: 'GET',
    url: getFindAverageTimeByWeekUrl().toString(),
    ...requestConfig,
  })
  return res.data
}
