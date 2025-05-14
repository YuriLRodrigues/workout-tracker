import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import { updateImage } from '../../clients/ImageController/updateImage'
import type {
  UpdateImageMutationResponseType,
  UpdateImagePathParamsType,
  UpdateImage400Type,
  UpdateImage403Type,
  UpdateImage404Type,
} from '../../types/UpdateImageType'

export const updateImageMutationKey = () => [{ url: '/image/update/{id}' }] as const

export type UpdateImageMutationKey = ReturnType<typeof updateImageMutationKey>

/**
 * {@link /image/update/:id}
 */
export function useUpdateImage<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpdateImageMutationResponseType,
      ResponseErrorConfig<UpdateImage400Type | UpdateImage403Type | UpdateImage404Type>,
      { id: UpdateImagePathParamsType['id'] },
      TContext
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: { client: queryClient, ...mutationOptions } = {}, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateImageMutationKey()

  return useMutation<
    UpdateImageMutationResponseType,
    ResponseErrorConfig<UpdateImage400Type | UpdateImage403Type | UpdateImage404Type>,
    { id: UpdateImagePathParamsType['id'] },
    TContext
  >(
    {
      mutationFn: async ({ id }) => {
        return updateImage({ id }, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}
