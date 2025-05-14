import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  FindAverageTimeByWeek200Type,
  FindAverageTimeByWeek400Type,
  FindAverageTimeByWeek404Type,
  FindAverageTimeByWeekQueryResponseType,
} from '../../types/FindAverageTimeByWeekType'
import { findAverageTimeByWeekDtoSchema } from '../findAverageTimeByWeekDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

/**
 * @description Avg time found
 */
export const findAverageTimeByWeek200Schema = z.lazy(
  () => findAverageTimeByWeekDtoSchema,
) as unknown as ToZod<FindAverageTimeByWeek200Type>

/**
 * @description Bad request
 */
export const findAverageTimeByWeek400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<FindAverageTimeByWeek400Type>

/**
 * @description Resource not found
 */
export const findAverageTimeByWeek404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<FindAverageTimeByWeek404Type>

export const findAverageTimeByWeekQueryResponseSchema = z.lazy(
  () => findAverageTimeByWeek200Schema,
) as unknown as ToZod<FindAverageTimeByWeekQueryResponseType>
