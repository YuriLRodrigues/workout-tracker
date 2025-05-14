import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  DeleteExerciseMutationResponseType,
  DeleteExercisePathParamsType,
  DeleteExercise400Type,
  DeleteExercise403Type,
  DeleteExercise404Type,
} from '../../types/DeleteExerciseType'

function getDeleteExerciseUrl({ id }: { id: DeleteExercisePathParamsType['id'] }) {
  return `/exercise/${id}` as const
}

/**
 * {@link /exercise/:id}
 */
export async function deleteExercise(
  { id }: { id: DeleteExercisePathParamsType['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeleteExerciseMutationResponseType,
    ResponseErrorConfig<DeleteExercise400Type | DeleteExercise403Type | DeleteExercise404Type>,
    unknown
  >({ method: 'DELETE', url: getDeleteExerciseUrl({ id }).toString(), ...requestConfig })
  return res.data
}
