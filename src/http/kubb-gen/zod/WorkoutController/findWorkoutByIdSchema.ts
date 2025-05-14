import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  FindWorkoutByIdPathParamsType,
  FindWorkoutById200Type,
  FindWorkoutById400Type,
  FindWorkoutById404Type,
  FindWorkoutByIdQueryResponseType,
} from '../../types/FindWorkoutByIdType'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'
import { workoutDtoSchema } from '../workoutDtoSchema'

export const findWorkoutByIdPathParamsSchema = z.object({
  id: z.coerce.string(),
}) as unknown as ToZod<FindWorkoutByIdPathParamsType>

/**
 * @description Workout found
 */
export const findWorkoutById200Schema = z.lazy(() => workoutDtoSchema) as unknown as ToZod<FindWorkoutById200Type>

/**
 * @description Bad request
 */
export const findWorkoutById400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<FindWorkoutById400Type>

/**
 * @description Resource not found
 */
export const findWorkoutById404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<FindWorkoutById404Type>

export const findWorkoutByIdQueryResponseSchema = z.lazy(
  () => findWorkoutById200Schema,
) as unknown as ToZod<FindWorkoutByIdQueryResponseType>
