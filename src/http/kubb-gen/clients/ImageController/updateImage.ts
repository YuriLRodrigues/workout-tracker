import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  UpdateImageMutationResponseType,
  UpdateImagePathParamsType,
  UpdateImage400Type,
  UpdateImage403Type,
  UpdateImage404Type,
} from '../../types/UpdateImageType'

function getUpdateImageUrl({ id }: { id: UpdateImagePathParamsType['id'] }) {
  return `/image/update/${id}` as const
}

/**
 * {@link /image/update/:id}
 */
export async function updateImage(
  { id }: { id: UpdateImagePathParamsType['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    UpdateImageMutationResponseType,
    ResponseErrorConfig<UpdateImage400Type | UpdateImage403Type | UpdateImage404Type>,
    unknown
  >({
    method: 'POST',
    url: getUpdateImageUrl({ id }).toString(),
    ...requestConfig,
  })
  return res.data
}
