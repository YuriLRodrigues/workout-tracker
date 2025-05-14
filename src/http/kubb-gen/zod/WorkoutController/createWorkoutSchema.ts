import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  CreateWorkout201Type,
  CreateWorkout400Type,
  CreateWorkout404Type,
  CreateWorkoutMutationRequestType,
  CreateWorkoutMutationResponseType,
} from '../../types/CreateWorkoutType'
import { createWorkoutBodyDtoSchema } from '../createWorkoutBodyDtoSchema'
import { createWorkoutResponseDtoSchema } from '../createWorkoutResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

/**
 * @description Workout created successfully
 */
export const createWorkout201Schema = z.lazy(
  () => createWorkoutResponseDtoSchema,
) as unknown as ToZod<CreateWorkout201Type>

/**
 * @description Bad request
 */
export const createWorkout400Schema = z.lazy(() => swaggerBadRequestDtoSchema) as unknown as ToZod<CreateWorkout400Type>

/**
 * @description Resource not found
 */
export const createWorkout404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<CreateWorkout404Type>

export const createWorkoutMutationRequestSchema = z.lazy(
  () => createWorkoutBodyDtoSchema,
) as unknown as ToZod<CreateWorkoutMutationRequestType>

export const createWorkoutMutationResponseSchema = z.lazy(
  () => createWorkout201Schema,
) as unknown as ToZod<CreateWorkoutMutationResponseType>
