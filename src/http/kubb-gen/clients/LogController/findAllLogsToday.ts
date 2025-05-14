import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  FindAllLogsTodayQueryResponseType,
  FindAllLogsTodayPathParamsType,
  FindAllLogsToday400Type,
  FindAllLogsToday404Type,
} from '../../types/FindAllLogsTodayType'

function getFindAllLogsTodayUrl({ workoutId }: { workoutId: FindAllLogsTodayPathParamsType['workoutId'] }) {
  return `/log/metrics/${workoutId}` as const
}

/**
 * {@link /log/metrics/:workoutId}
 */
export async function findAllLogsToday(
  { workoutId }: { workoutId: FindAllLogsTodayPathParamsType['workoutId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FindAllLogsTodayQueryResponseType,
    ResponseErrorConfig<FindAllLogsToday400Type | FindAllLogsToday404Type>,
    unknown
  >({
    method: 'GET',
    url: getFindAllLogsTodayUrl({ workoutId }).toString(),
    ...requestConfig,
  })
  return res.data
}
