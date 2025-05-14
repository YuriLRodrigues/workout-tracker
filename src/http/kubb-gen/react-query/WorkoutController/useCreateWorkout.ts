import client from '@/http/custom-client'
import type { RequestConfig, ResponseErrorConfig } from '@/http/custom-client'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import { createWorkout } from '../../clients/WorkoutController/createWorkout'
import type {
  CreateWorkoutMutationRequestType,
  CreateWorkoutMutationResponseType,
  CreateWorkout400Type,
  CreateWorkout404Type,
} from '../../types/CreateWorkoutType'

export const createWorkoutMutationKey = () => [{ url: '/workout' }] as const

export type CreateWorkoutMutationKey = ReturnType<typeof createWorkoutMutationKey>

/**
 * {@link /workout}
 */
export function useCreateWorkout<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CreateWorkoutMutationResponseType,
      ResponseErrorConfig<CreateWorkout400Type | CreateWorkout404Type>,
      { data: CreateWorkoutMutationRequestType },
      TContext
    > & { client?: QueryClient }
    client?: Partial<RequestConfig<CreateWorkoutMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: { client: queryClient, ...mutationOptions } = {}, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createWorkoutMutationKey()

  return useMutation<
    CreateWorkoutMutationResponseType,
    ResponseErrorConfig<CreateWorkout400Type | CreateWorkout404Type>,
    { data: CreateWorkoutMutationRequestType },
    TContext
  >(
    {
      mutationFn: async ({ data }) => {
        return createWorkout({ data }, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}
