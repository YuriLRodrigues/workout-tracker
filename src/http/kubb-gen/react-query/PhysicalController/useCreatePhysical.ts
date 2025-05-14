import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import { createPhysical } from '../../clients/PhysicalController/createPhysical'
import type {
  CreatePhysicalMutationRequestType,
  CreatePhysicalMutationResponseType,
  CreatePhysical400Type,
} from '../../types/CreatePhysicalType'

export const createPhysicalMutationKey = () => [{ url: '/physical' }] as const

export type CreatePhysicalMutationKey = ReturnType<typeof createPhysicalMutationKey>

/**
 * {@link /physical}
 */
export function useCreatePhysical<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CreatePhysicalMutationResponseType,
      ResponseErrorConfig<CreatePhysical400Type>,
      { data: CreatePhysicalMutationRequestType },
      TContext
    > & { client?: QueryClient }
    client?: Partial<RequestConfig<CreatePhysicalMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: { client: queryClient, ...mutationOptions } = {}, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createPhysicalMutationKey()

  return useMutation<
    CreatePhysicalMutationResponseType,
    ResponseErrorConfig<CreatePhysical400Type>,
    { data: CreatePhysicalMutationRequestType },
    TContext
  >(
    {
      mutationFn: async ({ data }) => {
        return createPhysical({ data }, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}
