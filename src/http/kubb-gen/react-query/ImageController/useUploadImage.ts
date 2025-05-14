import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import { uploadImage } from '../../clients/ImageController/uploadImage'
import type {
  UploadImageMutationRequestType,
  UploadImageMutationResponseType,
  UploadImagePathParamsType,
  UploadImage400Type,
  UploadImage403Type,
} from '../../types/UploadImageType'

export const uploadImageMutationKey = () => [{ url: '/image/upload/{type}' }] as const

export type UploadImageMutationKey = ReturnType<typeof uploadImageMutationKey>

/**
 * {@link /image/upload/:type}
 */
export function useUploadImage<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UploadImageMutationResponseType,
      ResponseErrorConfig<UploadImage400Type | UploadImage403Type>,
      { type: UploadImagePathParamsType['type']; data: UploadImageMutationRequestType },
      TContext
    > & { client?: QueryClient }
    client?: Partial<RequestConfig<UploadImageMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: { client: queryClient, ...mutationOptions } = {}, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? uploadImageMutationKey()

  return useMutation<
    UploadImageMutationResponseType,
    ResponseErrorConfig<UploadImage400Type | UploadImage403Type>,
    { type: UploadImagePathParamsType['type']; data: UploadImageMutationRequestType },
    TContext
  >(
    {
      mutationFn: async ({ type, data }) => {
        return uploadImage({ type, data }, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}
