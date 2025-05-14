import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  FindAllWorkoutsByUserIdQueryParamsType,
  FindAllWorkoutsByUserId200Type,
  FindAllWorkoutsByUserId400Type,
  FindAllWorkoutsByUserId404Type,
  FindAllWorkoutsByUserIdQueryResponseType,
} from '../../types/FindAllWorkoutsByUserIdType'
import { paginatedDtoSchema } from '../paginatedDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'
import { workoutDtoSchema } from '../workoutDtoSchema'

export const findAllWorkoutsByUserIdQueryParamsSchema = z
  .object({
    page: z.coerce.number().default(1).describe('Page for pagination'),
    limit: z.coerce.number().default(9).describe('Limit for pagination'),
  })
  .optional() as unknown as ToZod<FindAllWorkoutsByUserIdQueryParamsType>

export const findAllWorkoutsByUserId200Schema = z
  .lazy(() => paginatedDtoSchema)
  .and(
    z.object({
      results: z.array(z.lazy(() => workoutDtoSchema)).optional(),
    }),
  ) as unknown as ToZod<FindAllWorkoutsByUserId200Type>

/**
 * @description Bad request
 */
export const findAllWorkoutsByUserId400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<FindAllWorkoutsByUserId400Type>

/**
 * @description Resource not found
 */
export const findAllWorkoutsByUserId404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<FindAllWorkoutsByUserId404Type>

export const findAllWorkoutsByUserIdQueryResponseSchema = z.lazy(
  () => findAllWorkoutsByUserId200Schema,
) as unknown as ToZod<FindAllWorkoutsByUserIdQueryResponseType>
