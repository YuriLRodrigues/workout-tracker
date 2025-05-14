import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  FindTodaySessionByUserIdQueryResponseType,
  FindTodaySessionByUserIdPathParamsType,
  FindTodaySessionByUserId400Type,
  FindTodaySessionByUserId404Type,
} from '../../types/FindTodaySessionByUserIdType'

function getFindTodaySessionByUserIdUrl({
  workoutId,
}: {
  workoutId: FindTodaySessionByUserIdPathParamsType['workoutId']
}) {
  return `/session/today/${workoutId}` as const
}

/**
 * {@link /session/today/:workoutId}
 */
export async function findTodaySessionByUserId(
  { workoutId }: { workoutId: FindTodaySessionByUserIdPathParamsType['workoutId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FindTodaySessionByUserIdQueryResponseType,
    ResponseErrorConfig<FindTodaySessionByUserId400Type | FindTodaySessionByUserId404Type>,
    unknown
  >({ method: 'GET', url: getFindTodaySessionByUserIdUrl({ workoutId }).toString(), ...requestConfig })
  return res.data
}
