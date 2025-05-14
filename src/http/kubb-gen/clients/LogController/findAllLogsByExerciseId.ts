import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  FindAllLogsByExerciseIdQueryResponseType,
  FindAllLogsByExerciseIdPathParamsType,
  FindAllLogsByExerciseIdQueryParamsType,
  FindAllLogsByExerciseId400Type,
  FindAllLogsByExerciseId404Type,
} from '../../types/FindAllLogsByExerciseIdType'

function getFindAllLogsByExerciseIdUrl({
  exerciseId,
}: {
  exerciseId: FindAllLogsByExerciseIdPathParamsType['exerciseId']
}) {
  return `/log/many/${exerciseId}` as const
}

/**
 * {@link /log/many/:exerciseId}
 */
export async function findAllLogsByExerciseId(
  {
    exerciseId,
    params,
  }: {
    exerciseId: FindAllLogsByExerciseIdPathParamsType['exerciseId']
    params?: FindAllLogsByExerciseIdQueryParamsType
  },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FindAllLogsByExerciseIdQueryResponseType,
    ResponseErrorConfig<FindAllLogsByExerciseId400Type | FindAllLogsByExerciseId404Type>,
    unknown
  >({ method: 'GET', url: getFindAllLogsByExerciseIdUrl({ exerciseId }).toString(), params, ...requestConfig })
  return res.data
}
