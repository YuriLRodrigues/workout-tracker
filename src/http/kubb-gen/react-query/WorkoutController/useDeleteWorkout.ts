import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import { deleteWorkout } from '../../clients/WorkoutController/deleteWorkout'
import type {
  DeleteWorkoutMutationResponseType,
  DeleteWorkoutPathParamsType,
  DeleteWorkout400Type,
  DeleteWorkout403Type,
  DeleteWorkout404Type,
} from '../../types/DeleteWorkoutType'

export const deleteWorkoutMutationKey = () => [{ url: '/workout/{id}' }] as const

export type DeleteWorkoutMutationKey = ReturnType<typeof deleteWorkoutMutationKey>

/**
 * {@link /workout/:id}
 */
export function useDeleteWorkout<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeleteWorkoutMutationResponseType,
      ResponseErrorConfig<DeleteWorkout400Type | DeleteWorkout403Type | DeleteWorkout404Type>,
      { id: DeleteWorkoutPathParamsType['id'] },
      TContext
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: { client: queryClient, ...mutationOptions } = {}, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteWorkoutMutationKey()

  return useMutation<
    DeleteWorkoutMutationResponseType,
    ResponseErrorConfig<DeleteWorkout400Type | DeleteWorkout403Type | DeleteWorkout404Type>,
    { id: DeleteWorkoutPathParamsType['id'] },
    TContext
  >(
    {
      mutationFn: async ({ id }) => {
        return deleteWorkout({ id }, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}
