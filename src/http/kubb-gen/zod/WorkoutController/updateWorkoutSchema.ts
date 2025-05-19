import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  UpdateWorkoutPathParamsType,
  UpdateWorkout201Type,
  UpdateWorkout400Type,
  UpdateWorkout404Type,
  UpdateWorkoutMutationRequestType,
  UpdateWorkoutMutationResponseType,
} from '../../types/UpdateWorkoutType'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'
import { updateWorkoutBodyDtoSchema } from '../updateWorkoutBodyDtoSchema'
import { updateWorkoutResponseDtoSchema } from '../updateWorkoutResponseDtoSchema'

export const updateWorkoutPathParamsSchema = z.object({
  workoutId: z.coerce.string(),
}) as unknown as ToZod<UpdateWorkoutPathParamsType>

/**
 * @description Workout updated successfully
 */
export const updateWorkout201Schema = z.lazy(
  () => updateWorkoutResponseDtoSchema,
) as unknown as ToZod<UpdateWorkout201Type>

/**
 * @description Bad request
 */
export const updateWorkout400Schema = z.lazy(() => swaggerBadRequestDtoSchema) as unknown as ToZod<UpdateWorkout400Type>

/**
 * @description Resource not found
 */
export const updateWorkout404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<UpdateWorkout404Type>

export const updateWorkoutMutationRequestSchema = z.lazy(
  () => updateWorkoutBodyDtoSchema,
) as unknown as ToZod<UpdateWorkoutMutationRequestType>

export const updateWorkoutMutationResponseSchema = z.lazy(
  () => updateWorkout201Schema,
) as unknown as ToZod<UpdateWorkoutMutationResponseType>
