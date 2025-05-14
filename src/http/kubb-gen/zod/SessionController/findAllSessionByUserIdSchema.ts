import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  FindAllSessionByUserIdPathParamsType,
  FindAllSessionByUserId200Type,
  FindAllSessionByUserId400Type,
  FindAllSessionByUserId404Type,
  FindAllSessionByUserIdQueryResponseType,
} from '../../types/FindAllSessionByUserIdType'
import { findAllByUserIdDtoSchema } from '../findAllByUserIdDtoSchema'
import { paginatedDtoSchema } from '../paginatedDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

export const findAllSessionByUserIdPathParamsSchema = z
  .object({
    page: z.coerce.number().default(1).describe('Page for pagination'),
    limit: z.coerce.number().default(9).describe('Limit for pagination'),
  })
  .optional() as unknown as ToZod<FindAllSessionByUserIdPathParamsType>

export const findAllSessionByUserId200Schema = z
  .lazy(() => paginatedDtoSchema)
  .and(
    z.object({
      results: z.array(z.lazy(() => findAllByUserIdDtoSchema)).optional(),
    }),
  ) as unknown as ToZod<FindAllSessionByUserId200Type>

/**
 * @description Bad request
 */
export const findAllSessionByUserId400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<FindAllSessionByUserId400Type>

/**
 * @description Resource not found
 */
export const findAllSessionByUserId404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<FindAllSessionByUserId404Type>

export const findAllSessionByUserIdQueryResponseSchema = z.lazy(
  () => findAllSessionByUserId200Schema,
) as unknown as ToZod<FindAllSessionByUserIdQueryResponseType>
