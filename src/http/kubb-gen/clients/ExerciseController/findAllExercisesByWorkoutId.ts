import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  FindAllExercisesByWorkoutIdQueryResponseType,
  FindAllExercisesByWorkoutIdPathParamsType,
  FindAllExercisesByWorkoutIdQueryParamsType,
  FindAllExercisesByWorkoutId400Type,
  FindAllExercisesByWorkoutId404Type,
} from '../../types/FindAllExercisesByWorkoutIdType'

function getFindAllExercisesByWorkoutIdUrl({
  workoutId,
}: {
  workoutId: FindAllExercisesByWorkoutIdPathParamsType['workoutId']
}) {
  return `/exercise/many/${workoutId}` as const
}

/**
 * {@link /exercise/many/:workoutId}
 */
export async function findAllExercisesByWorkoutId(
  {
    workoutId,
    params,
  }: {
    workoutId: FindAllExercisesByWorkoutIdPathParamsType['workoutId']
    params?: FindAllExercisesByWorkoutIdQueryParamsType
  },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FindAllExercisesByWorkoutIdQueryResponseType,
    ResponseErrorConfig<FindAllExercisesByWorkoutId400Type | FindAllExercisesByWorkoutId404Type>,
    unknown
  >({ method: 'GET', url: getFindAllExercisesByWorkoutIdUrl({ workoutId }).toString(), params, ...requestConfig })
  return res.data
}
