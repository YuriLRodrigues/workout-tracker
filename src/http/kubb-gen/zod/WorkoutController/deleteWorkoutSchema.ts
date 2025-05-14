import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  DeleteWorkoutPathParamsType,
  DeleteWorkout200Type,
  DeleteWorkout400Type,
  DeleteWorkout403Type,
  DeleteWorkout404Type,
  DeleteWorkoutMutationResponseType,
} from '../../types/DeleteWorkoutType'
import { deleteWorkoutResponseDtoSchema } from '../deleteWorkoutResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerNotAllowedDtoSchema } from '../swaggerNotAllowedDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

export const deleteWorkoutPathParamsSchema = z.object({
  id: z.coerce.string(),
}) as unknown as ToZod<DeleteWorkoutPathParamsType>

/**
 * @description Workout successfully deleted
 */
export const deleteWorkout200Schema = z.lazy(
  () => deleteWorkoutResponseDtoSchema,
) as unknown as ToZod<DeleteWorkout200Type>

/**
 * @description Bad request
 */
export const deleteWorkout400Schema = z.lazy(() => swaggerBadRequestDtoSchema) as unknown as ToZod<DeleteWorkout400Type>

/**
 * @description Not allowed
 */
export const deleteWorkout403Schema = z.lazy(() => swaggerNotAllowedDtoSchema) as unknown as ToZod<DeleteWorkout403Type>

/**
 * @description Resource not found
 */
export const deleteWorkout404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<DeleteWorkout404Type>

export const deleteWorkoutMutationResponseSchema = z.lazy(
  () => deleteWorkout200Schema,
) as unknown as ToZod<DeleteWorkoutMutationResponseType>
