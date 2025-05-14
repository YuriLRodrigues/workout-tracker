import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  FindAllLogsTodayPathParamsType,
  FindAllLogsToday200Type,
  FindAllLogsToday400Type,
  FindAllLogsToday404Type,
  FindAllLogsTodayQueryResponseType,
} from '../../types/FindAllLogsTodayType'
import { findAllLogsTodayResponseDtoSchema } from '../findAllLogsTodayResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

export const findAllLogsTodayPathParamsSchema = z.object({
  workoutId: z.coerce.string(),
}) as unknown as ToZod<FindAllLogsTodayPathParamsType>

/**
 * @description Logs found
 */
export const findAllLogsToday200Schema = z.lazy(
  () => findAllLogsTodayResponseDtoSchema,
) as unknown as ToZod<FindAllLogsToday200Type>

/**
 * @description Bad request
 */
export const findAllLogsToday400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<FindAllLogsToday400Type>

/**
 * @description Resource not found
 */
export const findAllLogsToday404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<FindAllLogsToday404Type>

export const findAllLogsTodayQueryResponseSchema = z.lazy(
  () => findAllLogsToday200Schema,
) as unknown as ToZod<FindAllLogsTodayQueryResponseType>
