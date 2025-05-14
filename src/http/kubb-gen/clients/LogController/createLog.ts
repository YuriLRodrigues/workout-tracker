import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  CreateLogMutationRequestType,
  CreateLogMutationResponseType,
  CreateLogPathParamsType,
  CreateLog400Type,
} from '../../types/CreateLogType'

function getCreateLogUrl({ exerciseId }: { exerciseId: CreateLogPathParamsType['exerciseId'] }) {
  return `/log/${exerciseId}` as const
}

/**
 * {@link /log/:exerciseId}
 */
export async function createLog(
  { exerciseId, data }: { exerciseId: CreateLogPathParamsType['exerciseId']; data: CreateLogMutationRequestType },
  config: Partial<RequestConfig<CreateLogMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    CreateLogMutationResponseType,
    ResponseErrorConfig<CreateLog400Type>,
    CreateLogMutationRequestType
  >({
    method: 'POST',
    url: getCreateLogUrl({ exerciseId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}
