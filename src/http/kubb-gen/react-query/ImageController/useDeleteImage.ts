import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import { deleteImage } from '../../clients/ImageController/deleteImage'
import type {
  DeleteImageMutationResponseType,
  DeleteImagePathParamsType,
  DeleteImage400Type,
  DeleteImage403Type,
  DeleteImage404Type,
} from '../../types/DeleteImageType'

export const deleteImageMutationKey = () => [{ url: '/image/{id}' }] as const

export type DeleteImageMutationKey = ReturnType<typeof deleteImageMutationKey>

/**
 * {@link /image/:id}
 */
export function useDeleteImage<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeleteImageMutationResponseType,
      ResponseErrorConfig<DeleteImage400Type | DeleteImage403Type | DeleteImage404Type>,
      { id: DeleteImagePathParamsType['id'] },
      TContext
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: { client: queryClient, ...mutationOptions } = {}, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteImageMutationKey()

  return useMutation<
    DeleteImageMutationResponseType,
    ResponseErrorConfig<DeleteImage400Type | DeleteImage403Type | DeleteImage404Type>,
    { id: DeleteImagePathParamsType['id'] },
    TContext
  >(
    {
      mutationFn: async ({ id }) => {
        return deleteImage({ id }, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}
