import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  CreateWorkoutMutationRequestType,
  CreateWorkoutMutationResponseType,
  CreateWorkout400Type,
  CreateWorkout404Type,
} from '../../types/CreateWorkoutType'

function getCreateWorkoutUrl() {
  return `/workout` as const
}

/**
 * {@link /workout}
 */
export async function createWorkout(
  { data }: { data: CreateWorkoutMutationRequestType },
  config: Partial<RequestConfig<CreateWorkoutMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    CreateWorkoutMutationResponseType,
    ResponseErrorConfig<CreateWorkout400Type | CreateWorkout404Type>,
    CreateWorkoutMutationRequestType
  >({ method: 'POST', url: getCreateWorkoutUrl().toString(), data, ...requestConfig })
  return res.data
}
