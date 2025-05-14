import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  FindTodayWorkoutSessionQueryResponseType,
  FindTodayWorkoutSessionPathParamsType,
  FindTodayWorkoutSession400Type,
  FindTodayWorkoutSession404Type,
} from '../../types/FindTodayWorkoutSessionType'

function getFindTodayWorkoutSessionUrl({
  workoutId,
}: {
  workoutId: FindTodayWorkoutSessionPathParamsType['workoutId']
}) {
  return `/session/workout/${workoutId}` as const
}

/**
 * {@link /session/workout/:workoutId}
 */
export async function findTodayWorkoutSession(
  { workoutId }: { workoutId: FindTodayWorkoutSessionPathParamsType['workoutId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FindTodayWorkoutSessionQueryResponseType,
    ResponseErrorConfig<FindTodayWorkoutSession400Type | FindTodayWorkoutSession404Type>,
    unknown
  >({ method: 'GET', url: getFindTodayWorkoutSessionUrl({ workoutId }).toString(), ...requestConfig })
  return res.data
}
