import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import { deleteUser } from '../../clients/UserController/deleteUser'
import type {
  DeleteUserMutationResponseType,
  DeleteUserPathParamsType,
  DeleteUser400Type,
  DeleteUser403Type,
  DeleteUser404Type,
} from '../../types/DeleteUserType'

export const deleteUserMutationKey = () => [{ url: '/user/manager/{id}' }] as const

export type DeleteUserMutationKey = ReturnType<typeof deleteUserMutationKey>

/**
 * {@link /user/manager/:id}
 */
export function useDeleteUser<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeleteUserMutationResponseType,
      ResponseErrorConfig<DeleteUser400Type | DeleteUser403Type | DeleteUser404Type>,
      { id: DeleteUserPathParamsType['id'] },
      TContext
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: { client: queryClient, ...mutationOptions } = {}, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteUserMutationKey()

  return useMutation<
    DeleteUserMutationResponseType,
    ResponseErrorConfig<DeleteUser400Type | DeleteUser403Type | DeleteUser404Type>,
    { id: DeleteUserPathParamsType['id'] },
    TContext
  >(
    {
      mutationFn: async ({ id }) => {
        return deleteUser({ id }, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}
