import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  FindAllExercisesByWorkoutIdPathParamsType,
  FindAllExercisesByWorkoutIdQueryParamsType,
  FindAllExercisesByWorkoutId200Type,
  FindAllExercisesByWorkoutId400Type,
  FindAllExercisesByWorkoutId404Type,
  FindAllExercisesByWorkoutIdQueryResponseType,
} from '../../types/FindAllExercisesByWorkoutIdType'
import { exerciseDtoSchema } from '../exerciseDtoSchema'
import { paginatedDtoSchema } from '../paginatedDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

export const findAllExercisesByWorkoutIdPathParamsSchema = z.object({
  workoutId: z.coerce.string(),
}) as unknown as ToZod<FindAllExercisesByWorkoutIdPathParamsType>

export const findAllExercisesByWorkoutIdQueryParamsSchema = z
  .object({
    page: z.coerce.number().default(1).describe('Page for pagination'),
    limit: z.coerce.number().default(9).describe('Limit for pagination'),
  })
  .optional() as unknown as ToZod<FindAllExercisesByWorkoutIdQueryParamsType>

export const findAllExercisesByWorkoutId200Schema = z
  .lazy(() => paginatedDtoSchema)
  .and(
    z.object({
      results: z.array(z.lazy(() => exerciseDtoSchema)).optional(),
    }),
  ) as unknown as ToZod<FindAllExercisesByWorkoutId200Type>

/**
 * @description Bad request
 */
export const findAllExercisesByWorkoutId400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<FindAllExercisesByWorkoutId400Type>

/**
 * @description Resource not found
 */
export const findAllExercisesByWorkoutId404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<FindAllExercisesByWorkoutId404Type>

export const findAllExercisesByWorkoutIdQueryResponseSchema = z.lazy(
  () => findAllExercisesByWorkoutId200Schema,
) as unknown as ToZod<FindAllExercisesByWorkoutIdQueryResponseType>
