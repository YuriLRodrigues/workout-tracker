import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  UpdateExerciseMutationRequestType,
  UpdateExerciseMutationResponseType,
  UpdateExercisePathParamsType,
  UpdateExercise400Type,
  UpdateExercise404Type,
} from '../../types/UpdateExerciseType'

function getUpdateExerciseUrl({ exerciseId }: { exerciseId: UpdateExercisePathParamsType['exerciseId'] }) {
  return `/exercise/${exerciseId}` as const
}

/**
 * {@link /exercise/:exerciseId}
 */
export async function updateExercise(
  {
    exerciseId,
    data,
  }: { exerciseId: UpdateExercisePathParamsType['exerciseId']; data?: UpdateExerciseMutationRequestType },
  config: Partial<RequestConfig<UpdateExerciseMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    UpdateExerciseMutationResponseType,
    ResponseErrorConfig<UpdateExercise400Type | UpdateExercise404Type>,
    UpdateExerciseMutationRequestType
  >({ method: 'PATCH', url: getUpdateExerciseUrl({ exerciseId }).toString(), data, ...requestConfig })
  return res.data
}
