import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  FindLogTodayByExerciseIdQueryResponseType,
  FindLogTodayByExerciseIdPathParamsType,
  FindLogTodayByExerciseId400Type,
  FindLogTodayByExerciseId404Type,
} from '../../types/FindLogTodayByExerciseIdType'

function getFindLogTodayByExerciseIdUrl({
  exerciseId,
}: {
  exerciseId: FindLogTodayByExerciseIdPathParamsType['exerciseId']
}) {
  return `/log/exercise/${exerciseId}` as const
}

/**
 * {@link /log/exercise/:exerciseId}
 */
export async function findLogTodayByExerciseId(
  { exerciseId }: { exerciseId: FindLogTodayByExerciseIdPathParamsType['exerciseId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FindLogTodayByExerciseIdQueryResponseType,
    ResponseErrorConfig<FindLogTodayByExerciseId400Type | FindLogTodayByExerciseId404Type>,
    unknown
  >({ method: 'GET', url: getFindLogTodayByExerciseIdUrl({ exerciseId }).toString(), ...requestConfig })
  return res.data
}
