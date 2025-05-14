import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'

import type {
  UploadImageMutationRequestType,
  UploadImageMutationResponseType,
  UploadImagePathParamsType,
  UploadImage400Type,
  UploadImage403Type,
} from '../../types/UploadImageType'

function getUploadImageUrl({ type }: { type: UploadImagePathParamsType['type'] }) {
  return `/image/upload/${type}` as const
}

/**
 * {@link /image/upload/:type}
 */
export async function uploadImage(
  { type, data }: { type: UploadImagePathParamsType['type']; data: UploadImageMutationRequestType },
  config: Partial<RequestConfig<UploadImageMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const formData = new FormData()
  if (data) {
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof typeof data]
      if (typeof key === 'string' && (typeof value === 'string' || (value as Blob) instanceof Blob)) {
        formData.append(key, value as unknown as string)
      }
    })
  }
  const res = await request<
    UploadImageMutationResponseType,
    ResponseErrorConfig<UploadImage400Type | UploadImage403Type>,
    UploadImageMutationRequestType
  >({
    method: 'POST',
    url: getUploadImageUrl({ type }).toString(),
    data: formData,
    ...requestConfig,
    headers: { 'Content-Type': 'multipart/form-data', ...requestConfig.headers },
  })
  return res.data
}
