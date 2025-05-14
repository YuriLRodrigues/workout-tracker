import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  DeleteLogMutationResponseType,
  DeleteLogPathParamsType,
  DeleteLog400Type,
  DeleteLog403Type,
  DeleteLog404Type,
} from '../../types/DeleteLogType'

function getDeleteLogUrl({ id }: { id: DeleteLogPathParamsType['id'] }) {
  return `/log/${id}` as const
}

/**
 * {@link /log/:id}
 */
export async function deleteLog(
  { id }: { id: DeleteLogPathParamsType['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeleteLogMutationResponseType,
    ResponseErrorConfig<DeleteLog400Type | DeleteLog403Type | DeleteLog404Type>,
    unknown
  >({
    method: 'DELETE',
    url: getDeleteLogUrl({ id }).toString(),
    ...requestConfig,
  })
  return res.data
}
