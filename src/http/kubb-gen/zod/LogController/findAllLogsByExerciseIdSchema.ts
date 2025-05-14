import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  FindAllLogsByExerciseIdPathParamsType,
  FindAllLogsByExerciseIdQueryParamsType,
  FindAllLogsByExerciseId200Type,
  FindAllLogsByExerciseId400Type,
  FindAllLogsByExerciseId404Type,
  FindAllLogsByExerciseIdQueryResponseType,
} from '../../types/FindAllLogsByExerciseIdType'
import { logsSchema } from '../logsSchema'
import { paginatedDtoSchema } from '../paginatedDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

export const findAllLogsByExerciseIdPathParamsSchema = z.object({
  exerciseId: z.coerce.string(),
}) as unknown as ToZod<FindAllLogsByExerciseIdPathParamsType>

export const findAllLogsByExerciseIdQueryParamsSchema = z
  .object({
    page: z.coerce.number().default(1).describe('Page for pagination'),
    limit: z.coerce.number().default(9).describe('Limit for pagination'),
  })
  .optional() as unknown as ToZod<FindAllLogsByExerciseIdQueryParamsType>

export const findAllLogsByExerciseId200Schema = z
  .lazy(() => paginatedDtoSchema)
  .and(
    z.object({
      results: z.array(z.lazy(() => logsSchema)).optional(),
    }),
  ) as unknown as ToZod<FindAllLogsByExerciseId200Type>

/**
 * @description Bad request
 */
export const findAllLogsByExerciseId400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<FindAllLogsByExerciseId400Type>

/**
 * @description Resource not found
 */
export const findAllLogsByExerciseId404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<FindAllLogsByExerciseId404Type>

export const findAllLogsByExerciseIdQueryResponseSchema = z.lazy(
  () => findAllLogsByExerciseId200Schema,
) as unknown as ToZod<FindAllLogsByExerciseIdQueryResponseType>
