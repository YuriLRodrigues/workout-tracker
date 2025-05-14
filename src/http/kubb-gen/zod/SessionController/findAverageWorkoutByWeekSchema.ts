import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  FindAverageWorkoutByWeek200Type,
  FindAverageWorkoutByWeek400Type,
  FindAverageWorkoutByWeek404Type,
  FindAverageWorkoutByWeekQueryResponseType,
} from '../../types/FindAverageWorkoutByWeekType'
import { findAverageWorkoutByWeekDtoSchema } from '../findAverageWorkoutByWeekDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

/**
 * @description Avg workout found
 */
export const findAverageWorkoutByWeek200Schema = z.lazy(
  () => findAverageWorkoutByWeekDtoSchema,
) as unknown as ToZod<FindAverageWorkoutByWeek200Type>

/**
 * @description Bad request
 */
export const findAverageWorkoutByWeek400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<FindAverageWorkoutByWeek400Type>

/**
 * @description Resource not found
 */
export const findAverageWorkoutByWeek404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<FindAverageWorkoutByWeek404Type>

export const findAverageWorkoutByWeekQueryResponseSchema = z.lazy(
  () => findAverageWorkoutByWeek200Schema,
) as unknown as ToZod<FindAverageWorkoutByWeekQueryResponseType>
