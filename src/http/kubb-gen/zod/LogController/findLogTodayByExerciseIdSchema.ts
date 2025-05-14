import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  FindLogTodayByExerciseIdPathParamsType,
  FindLogTodayByExerciseId200Type,
  FindLogTodayByExerciseId400Type,
  FindLogTodayByExerciseId404Type,
  FindLogTodayByExerciseIdQueryResponseType,
} from '../../types/FindLogTodayByExerciseIdType'
import { findLogTodayByExerciseIdResponseDtoSchema } from '../findLogTodayByExerciseIdResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

export const findLogTodayByExerciseIdPathParamsSchema = z.object({
  exerciseId: z.coerce.string(),
}) as unknown as ToZod<FindLogTodayByExerciseIdPathParamsType>

/**
 * @description Logs completed found
 */
export const findLogTodayByExerciseId200Schema = z.lazy(
  () => findLogTodayByExerciseIdResponseDtoSchema,
) as unknown as ToZod<FindLogTodayByExerciseId200Type>

/**
 * @description Bad request
 */
export const findLogTodayByExerciseId400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<FindLogTodayByExerciseId400Type>

/**
 * @description Resource not found
 */
export const findLogTodayByExerciseId404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<FindLogTodayByExerciseId404Type>

export const findLogTodayByExerciseIdQueryResponseSchema = z.lazy(
  () => findLogTodayByExerciseId200Schema,
) as unknown as ToZod<FindLogTodayByExerciseIdQueryResponseType>
