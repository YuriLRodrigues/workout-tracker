import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  FindExerciseByIdQueryResponseType,
  FindExerciseByIdPathParamsType,
  FindExerciseById400Type,
  FindExerciseById404Type,
} from '../../types/FindExerciseByIdType'

function getFindExerciseByIdUrl({ id }: { id: FindExerciseByIdPathParamsType['id'] }) {
  return `/exercise/${id}` as const
}

/**
 * {@link /exercise/:id}
 */
export async function findExerciseById(
  { id }: { id: FindExerciseByIdPathParamsType['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FindExerciseByIdQueryResponseType,
    ResponseErrorConfig<FindExerciseById400Type | FindExerciseById404Type>,
    unknown
  >({
    method: 'GET',
    url: getFindExerciseByIdUrl({ id }).toString(),
    ...requestConfig,
  })
  return res.data
}
