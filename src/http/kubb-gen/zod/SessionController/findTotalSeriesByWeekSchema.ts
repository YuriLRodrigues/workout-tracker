import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  FindTotalSeriesByWeek200Type,
  FindTotalSeriesByWeek400Type,
  FindTotalSeriesByWeek404Type,
  FindTotalSeriesByWeekQueryResponseType,
} from '../../types/FindTotalSeriesByWeekType'
import { findTotalSeriesByWeekDtoSchema } from '../findTotalSeriesByWeekDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

/**
 * @description Avg series found
 */
export const findTotalSeriesByWeek200Schema = z.lazy(
  () => findTotalSeriesByWeekDtoSchema,
) as unknown as ToZod<FindTotalSeriesByWeek200Type>

/**
 * @description Bad request
 */
export const findTotalSeriesByWeek400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<FindTotalSeriesByWeek400Type>

/**
 * @description Resource not found
 */
export const findTotalSeriesByWeek404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<FindTotalSeriesByWeek404Type>

export const findTotalSeriesByWeekQueryResponseSchema = z.lazy(
  () => findTotalSeriesByWeek200Schema,
) as unknown as ToZod<FindTotalSeriesByWeekQueryResponseType>
