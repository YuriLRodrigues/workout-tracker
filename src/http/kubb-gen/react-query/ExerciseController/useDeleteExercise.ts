import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import { deleteExercise } from '../../clients/ExerciseController/deleteExercise'
import type {
  DeleteExerciseMutationResponseType,
  DeleteExercisePathParamsType,
  DeleteExercise400Type,
  DeleteExercise403Type,
  DeleteExercise404Type,
} from '../../types/DeleteExerciseType'

export const deleteExerciseMutationKey = () => [{ url: '/exercise/{id}' }] as const

export type DeleteExerciseMutationKey = ReturnType<typeof deleteExerciseMutationKey>

/**
 * {@link /exercise/:id}
 */
export function useDeleteExercise<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeleteExerciseMutationResponseType,
      ResponseErrorConfig<DeleteExercise400Type | DeleteExercise403Type | DeleteExercise404Type>,
      { id: DeleteExercisePathParamsType['id'] },
      TContext
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: { client: queryClient, ...mutationOptions } = {}, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteExerciseMutationKey()

  return useMutation<
    DeleteExerciseMutationResponseType,
    ResponseErrorConfig<DeleteExercise400Type | DeleteExercise403Type | DeleteExercise404Type>,
    { id: DeleteExercisePathParamsType['id'] },
    TContext
  >(
    {
      mutationFn: async ({ id }) => {
        return deleteExercise({ id }, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}
