import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  FindAllWorkoutsByUserIdQueryResponseType,
  FindAllWorkoutsByUserIdQueryParamsType,
  FindAllWorkoutsByUserId400Type,
  FindAllWorkoutsByUserId404Type,
} from '../../types/FindAllWorkoutsByUserIdType'

function getFindAllWorkoutsByUserIdUrl() {
  return `/workout/many` as const
}

/**
 * {@link /workout/many}
 */
export async function findAllWorkoutsByUserId(
  { params }: { params?: FindAllWorkoutsByUserIdQueryParamsType },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FindAllWorkoutsByUserIdQueryResponseType,
    ResponseErrorConfig<FindAllWorkoutsByUserId400Type | FindAllWorkoutsByUserId404Type>,
    unknown
  >({ method: 'GET', url: getFindAllWorkoutsByUserIdUrl().toString(), params, ...requestConfig })
  return res.data
}
