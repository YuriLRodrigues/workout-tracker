import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  CreateExerciseMutationRequestType,
  CreateExerciseMutationResponseType,
  CreateExercisePathParamsType,
  CreateExercise400Type,
  CreateExercise404Type,
} from '../../types/CreateExerciseType'

function getCreateExerciseUrl({ workoutId }: { workoutId: CreateExercisePathParamsType['workoutId'] }) {
  return `/exercise/${workoutId}` as const
}

/**
 * {@link /exercise/:workoutId}
 */
export async function createExercise(
  {
    workoutId,
    data,
  }: { workoutId: CreateExercisePathParamsType['workoutId']; data: CreateExerciseMutationRequestType },
  config: Partial<RequestConfig<CreateExerciseMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    CreateExerciseMutationResponseType,
    ResponseErrorConfig<CreateExercise400Type | CreateExercise404Type>,
    CreateExerciseMutationRequestType
  >({ method: 'POST', url: getCreateExerciseUrl({ workoutId }).toString(), data, ...requestConfig })
  return res.data
}
