import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  DeleteExercisePathParamsType,
  DeleteExercise200Type,
  DeleteExercise400Type,
  DeleteExercise403Type,
  DeleteExercise404Type,
  DeleteExerciseMutationResponseType,
} from '../../types/DeleteExerciseType'
import { deleteExerciseResponseDtoSchema } from '../deleteExerciseResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerNotAllowedDtoSchema } from '../swaggerNotAllowedDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

export const deleteExercisePathParamsSchema = z.object({
  id: z.coerce.string(),
}) as unknown as ToZod<DeleteExercisePathParamsType>

/**
 * @description Exercise successfully deleted
 */
export const deleteExercise200Schema = z.lazy(
  () => deleteExerciseResponseDtoSchema,
) as unknown as ToZod<DeleteExercise200Type>

/**
 * @description Bad request
 */
export const deleteExercise400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<DeleteExercise400Type>

/**
 * @description Not allowed
 */
export const deleteExercise403Schema = z.lazy(
  () => swaggerNotAllowedDtoSchema,
) as unknown as ToZod<DeleteExercise403Type>

/**
 * @description Resource not found
 */
export const deleteExercise404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<DeleteExercise404Type>

export const deleteExerciseMutationResponseSchema = z.lazy(
  () => deleteExercise200Schema,
) as unknown as ToZod<DeleteExerciseMutationResponseType>
