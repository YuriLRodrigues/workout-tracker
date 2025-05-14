import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  FindWorkoutByIdQueryResponseType,
  FindWorkoutByIdPathParamsType,
  FindWorkoutById400Type,
  FindWorkoutById404Type,
} from '../../types/FindWorkoutByIdType'

function getFindWorkoutByIdUrl({ id }: { id: FindWorkoutByIdPathParamsType['id'] }) {
  return `/workout/by-id/${id}` as const
}

/**
 * {@link /workout/by-id/:id}
 */
export async function findWorkoutById(
  { id }: { id: FindWorkoutByIdPathParamsType['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FindWorkoutByIdQueryResponseType,
    ResponseErrorConfig<FindWorkoutById400Type | FindWorkoutById404Type>,
    unknown
  >({
    method: 'GET',
    url: getFindWorkoutByIdUrl({ id }).toString(),
    ...requestConfig,
  })
  return res.data
}
