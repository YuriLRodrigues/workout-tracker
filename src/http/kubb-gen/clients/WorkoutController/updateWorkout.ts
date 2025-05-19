import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  UpdateWorkoutMutationRequestType,
  UpdateWorkoutMutationResponseType,
  UpdateWorkoutPathParamsType,
  UpdateWorkout400Type,
  UpdateWorkout404Type,
} from '../../types/UpdateWorkoutType'

function getUpdateWorkoutUrl({ workoutId }: { workoutId: UpdateWorkoutPathParamsType['workoutId'] }) {
  return `/workout/${workoutId}` as const
}

/**
 * {@link /workout/:workoutId}
 */
export async function updateWorkout(
  { workoutId, data }: { workoutId: UpdateWorkoutPathParamsType['workoutId']; data?: UpdateWorkoutMutationRequestType },
  config: Partial<RequestConfig<UpdateWorkoutMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    UpdateWorkoutMutationResponseType,
    ResponseErrorConfig<UpdateWorkout400Type | UpdateWorkout404Type>,
    UpdateWorkoutMutationRequestType
  >({ method: 'PATCH', url: getUpdateWorkoutUrl({ workoutId }).toString(), data, ...requestConfig })
  return res.data
}
