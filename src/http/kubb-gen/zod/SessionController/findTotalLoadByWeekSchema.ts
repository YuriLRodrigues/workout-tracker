import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  FindTotalLoadByWeek200Type,
  FindTotalLoadByWeek400Type,
  FindTotalLoadByWeek404Type,
  FindTotalLoadByWeekQueryResponseType,
} from '../../types/FindTotalLoadByWeekType'
import { findTotalLoadByWeekDtoSchema } from '../findTotalLoadByWeekDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

/**
 * @description Avg workout found
 */
export const findTotalLoadByWeek200Schema = z.lazy(
  () => findTotalLoadByWeekDtoSchema,
) as unknown as ToZod<FindTotalLoadByWeek200Type>

/**
 * @description Bad request
 */
export const findTotalLoadByWeek400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<FindTotalLoadByWeek400Type>

/**
 * @description Resource not found
 */
export const findTotalLoadByWeek404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<FindTotalLoadByWeek404Type>

export const findTotalLoadByWeekQueryResponseSchema = z.lazy(
  () => findTotalLoadByWeek200Schema,
) as unknown as ToZod<FindTotalLoadByWeekQueryResponseType>
