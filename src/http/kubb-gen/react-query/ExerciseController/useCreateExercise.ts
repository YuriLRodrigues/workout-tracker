import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import { createExercise } from '../../clients/ExerciseController/createExercise'
import type {
  CreateExerciseMutationRequestType,
  CreateExerciseMutationResponseType,
  CreateExercisePathParamsType,
  CreateExercise400Type,
  CreateExercise404Type,
} from '../../types/CreateExerciseType'

export const createExerciseMutationKey = () => [{ url: '/exercise/{workoutId}' }] as const

export type CreateExerciseMutationKey = ReturnType<typeof createExerciseMutationKey>

/**
 * {@link /exercise/:workoutId}
 */
export function useCreateExercise<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CreateExerciseMutationResponseType,
      ResponseErrorConfig<CreateExercise400Type | CreateExercise404Type>,
      { workoutId: CreateExercisePathParamsType['workoutId']; data: CreateExerciseMutationRequestType },
      TContext
    > & { client?: QueryClient }
    client?: Partial<RequestConfig<CreateExerciseMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: { client: queryClient, ...mutationOptions } = {}, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createExerciseMutationKey()

  return useMutation<
    CreateExerciseMutationResponseType,
    ResponseErrorConfig<CreateExercise400Type | CreateExercise404Type>,
    { workoutId: CreateExercisePathParamsType['workoutId']; data: CreateExerciseMutationRequestType },
    TContext
  >(
    {
      mutationFn: async ({ workoutId, data }) => {
        return createExercise({ workoutId, data }, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}
