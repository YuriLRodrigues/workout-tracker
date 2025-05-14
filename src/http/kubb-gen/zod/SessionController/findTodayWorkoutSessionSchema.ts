import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  FindTodayWorkoutSessionPathParamsType,
  FindTodayWorkoutSession200Type,
  FindTodayWorkoutSession400Type,
  FindTodayWorkoutSession404Type,
  FindTodayWorkoutSessionQueryResponseType,
} from '../../types/FindTodayWorkoutSessionType'
import { findTodayWorkoutSessionResponseDtoSchema } from '../findTodayWorkoutSessionResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

export const findTodayWorkoutSessionPathParamsSchema = z.object({
  workoutId: z.coerce.string(),
}) as unknown as ToZod<FindTodayWorkoutSessionPathParamsType>

/**
 * @description Session found or not
 */
export const findTodayWorkoutSession200Schema = z.lazy(
  () => findTodayWorkoutSessionResponseDtoSchema,
) as unknown as ToZod<FindTodayWorkoutSession200Type>

/**
 * @description Bad request
 */
export const findTodayWorkoutSession400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<FindTodayWorkoutSession400Type>

/**
 * @description Resource not found
 */
export const findTodayWorkoutSession404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<FindTodayWorkoutSession404Type>

export const findTodayWorkoutSessionQueryResponseSchema = z.lazy(
  () => findTodayWorkoutSession200Schema,
) as unknown as ToZod<FindTodayWorkoutSessionQueryResponseType>
