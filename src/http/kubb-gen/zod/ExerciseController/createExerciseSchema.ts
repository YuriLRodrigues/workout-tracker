import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  CreateExercisePathParamsType,
  CreateExercise201Type,
  CreateExercise400Type,
  CreateExercise404Type,
  CreateExerciseMutationRequestType,
  CreateExerciseMutationResponseType,
} from '../../types/CreateExerciseType'
import { createExerciseBodyDtoSchema } from '../createExerciseBodyDtoSchema'
import { createExerciseResponseDtoSchema } from '../createExerciseResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

export const createExercisePathParamsSchema = z.object({
  workoutId: z.coerce.string(),
}) as unknown as ToZod<CreateExercisePathParamsType>

/**
 * @description Exercise created successfully
 */
export const createExercise201Schema = z.lazy(
  () => createExerciseResponseDtoSchema,
) as unknown as ToZod<CreateExercise201Type>

/**
 * @description Bad request
 */
export const createExercise400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<CreateExercise400Type>

/**
 * @description Resource not found
 */
export const createExercise404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<CreateExercise404Type>

export const createExerciseMutationRequestSchema = z.lazy(
  () => createExerciseBodyDtoSchema,
) as unknown as ToZod<CreateExerciseMutationRequestType>

export const createExerciseMutationResponseSchema = z.lazy(
  () => createExercise201Schema,
) as unknown as ToZod<CreateExerciseMutationResponseType>
