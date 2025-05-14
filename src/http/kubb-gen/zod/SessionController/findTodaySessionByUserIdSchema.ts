import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  FindTodaySessionByUserIdPathParamsType,
  FindTodaySessionByUserId200Type,
  FindTodaySessionByUserId400Type,
  FindTodaySessionByUserId404Type,
  FindTodaySessionByUserIdQueryResponseType,
} from '../../types/FindTodaySessionByUserIdType'
import { findSessionTodayByUserIdResponseDtoSchema } from '../findSessionTodayByUserIdResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

export const findTodaySessionByUserIdPathParamsSchema = z.object({
  workoutId: z.coerce.string(),
}) as unknown as ToZod<FindTodaySessionByUserIdPathParamsType>

/**
 * @description Today session found
 */
export const findTodaySessionByUserId200Schema = z.lazy(
  () => findSessionTodayByUserIdResponseDtoSchema,
) as unknown as ToZod<FindTodaySessionByUserId200Type>

/**
 * @description Bad request
 */
export const findTodaySessionByUserId400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<FindTodaySessionByUserId400Type>

/**
 * @description Resource not found
 */
export const findTodaySessionByUserId404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<FindTodaySessionByUserId404Type>

export const findTodaySessionByUserIdQueryResponseSchema = z.lazy(
  () => findTodaySessionByUserId200Schema,
) as unknown as ToZod<FindTodaySessionByUserIdQueryResponseType>
