import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  DeleteWorkoutMutationResponseType,
  DeleteWorkoutPathParamsType,
  DeleteWorkout400Type,
  DeleteWorkout403Type,
  DeleteWorkout404Type,
} from '../../types/DeleteWorkoutType'

function getDeleteWorkoutUrl({ id }: { id: DeleteWorkoutPathParamsType['id'] }) {
  return `/workout/${id}` as const
}

/**
 * {@link /workout/:id}
 */
export async function deleteWorkout(
  { id }: { id: DeleteWorkoutPathParamsType['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeleteWorkoutMutationResponseType,
    ResponseErrorConfig<DeleteWorkout400Type | DeleteWorkout403Type | DeleteWorkout404Type>,
    unknown
  >({ method: 'DELETE', url: getDeleteWorkoutUrl({ id }).toString(), ...requestConfig })
  return res.data
}
