import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  UpdateExercisePathParamsType,
  UpdateExercise201Type,
  UpdateExercise400Type,
  UpdateExercise404Type,
  UpdateExerciseMutationRequestType,
  UpdateExerciseMutationResponseType,
} from '../../types/UpdateExerciseType'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'
import { updateExerciseBodyDtoSchema } from '../updateExerciseBodyDtoSchema'
import { updateExerciseResponseDtoSchema } from '../updateExerciseResponseDtoSchema'

export const updateExercisePathParamsSchema = z.object({
  exerciseId: z.coerce.string(),
}) as unknown as ToZod<UpdateExercisePathParamsType>

/**
 * @description Exercise updated successfully
 */
export const updateExercise201Schema = z.lazy(
  () => updateExerciseResponseDtoSchema,
) as unknown as ToZod<UpdateExercise201Type>

/**
 * @description Bad request
 */
export const updateExercise400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<UpdateExercise400Type>

/**
 * @description Resource not found
 */
export const updateExercise404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<UpdateExercise404Type>

export const updateExerciseMutationRequestSchema = z.lazy(
  () => updateExerciseBodyDtoSchema,
) as unknown as ToZod<UpdateExerciseMutationRequestType>

export const updateExerciseMutationResponseSchema = z.lazy(
  () => updateExercise201Schema,
) as unknown as ToZod<UpdateExerciseMutationResponseType>
