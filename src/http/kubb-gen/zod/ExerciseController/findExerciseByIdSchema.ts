import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  FindExerciseByIdPathParamsType,
  FindExerciseById200Type,
  FindExerciseById400Type,
  FindExerciseById404Type,
  FindExerciseByIdQueryResponseType,
} from '../../types/FindExerciseByIdType'
import { exerciseDtoSchema } from '../exerciseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

export const findExerciseByIdPathParamsSchema = z.object({
  id: z.coerce.string(),
}) as unknown as ToZod<FindExerciseByIdPathParamsType>

/**
 * @description Exercise found
 */
export const findExerciseById200Schema = z.lazy(() => exerciseDtoSchema) as unknown as ToZod<FindExerciseById200Type>

/**
 * @description Bad request
 */
export const findExerciseById400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<FindExerciseById400Type>

/**
 * @description Resource not found
 */
export const findExerciseById404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<FindExerciseById404Type>

export const findExerciseByIdQueryResponseSchema = z.lazy(
  () => findExerciseById200Schema,
) as unknown as ToZod<FindExerciseByIdQueryResponseType>
