import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  FindAverageWorkoutByWeekQueryResponseType,
  FindAverageWorkoutByWeek400Type,
  FindAverageWorkoutByWeek404Type,
} from '../../types/FindAverageWorkoutByWeekType'

function getFindAverageWorkoutByWeekUrl() {
  return `/session/avg-workout-by-week` as const
}

/**
 * {@link /session/avg-workout-by-week}
 */
export async function findAverageWorkoutByWeek(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FindAverageWorkoutByWeekQueryResponseType,
    ResponseErrorConfig<FindAverageWorkoutByWeek400Type | FindAverageWorkoutByWeek404Type>,
    unknown
  >({ method: 'GET', url: getFindAverageWorkoutByWeekUrl().toString(), ...requestConfig })
  return res.data
}
