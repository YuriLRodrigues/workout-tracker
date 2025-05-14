import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  DeleteImageMutationResponseType,
  DeleteImagePathParamsType,
  DeleteImage400Type,
  DeleteImage403Type,
  DeleteImage404Type,
} from '../../types/DeleteImageType'

function getDeleteImageUrl({ id }: { id: DeleteImagePathParamsType['id'] }) {
  return `/image/${id}` as const
}

/**
 * {@link /image/:id}
 */
export async function deleteImage(
  { id }: { id: DeleteImagePathParamsType['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeleteImageMutationResponseType,
    ResponseErrorConfig<DeleteImage400Type | DeleteImage403Type | DeleteImage404Type>,
    unknown
  >({
    method: 'DELETE',
    url: getDeleteImageUrl({ id }).toString(),
    ...requestConfig,
  })
  return res.data
}
