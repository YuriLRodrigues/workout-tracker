import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  FindWorkoutsHistoryByUserIdQueryParamsType,
  FindWorkoutsHistoryByUserId200Type,
  FindWorkoutsHistoryByUserId400Type,
  FindWorkoutsHistoryByUserId404Type,
  FindWorkoutsHistoryByUserIdQueryResponseType,
} from '../../types/FindWorkoutsHistoryByUserIdType'
import { findWorkoutsHistoryByUserIdResponseDtoSchema } from '../findWorkoutsHistoryByUserIdResponseDtoSchema'
import { paginatedDtoSchema } from '../paginatedDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

export const findWorkoutsHistoryByUserIdQueryParamsSchema = z
  .object({
    page: z.coerce.number().default(1).describe('Page for pagination'),
    limit: z.coerce.number().default(9).describe('Limit for pagination'),
    query: z.coerce.string().describe('The workoutId reference to search').nullable().nullish(),
  })
  .optional() as unknown as ToZod<FindWorkoutsHistoryByUserIdQueryParamsType>

export const findWorkoutsHistoryByUserId200Schema = z
  .lazy(() => paginatedDtoSchema)
  .and(
    z.object({
      results: z.array(z.lazy(() => findWorkoutsHistoryByUserIdResponseDtoSchema)).optional(),
    }),
  ) as unknown as ToZod<FindWorkoutsHistoryByUserId200Type>

/**
 * @description Bad request
 */
export const findWorkoutsHistoryByUserId400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<FindWorkoutsHistoryByUserId400Type>

/**
 * @description Resource not found
 */
export const findWorkoutsHistoryByUserId404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<FindWorkoutsHistoryByUserId404Type>

export const findWorkoutsHistoryByUserIdQueryResponseSchema = z.lazy(
  () => findWorkoutsHistoryByUserId200Schema,
) as unknown as ToZod<FindWorkoutsHistoryByUserIdQueryResponseType>
