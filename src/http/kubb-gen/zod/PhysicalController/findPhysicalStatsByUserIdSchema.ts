import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  FindPhysicalStatsByUserId200Type,
  FindPhysicalStatsByUserId400Type,
  FindPhysicalStatsByUserIdQueryResponseType,
} from '../../types/FindPhysicalStatsByUserIdType'
import { findPhysicalStatsByUserIdResponseDtoSchema } from '../findPhysicalStatsByUserIdResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'

/**
 * @description Physical found or not
 */
export const findPhysicalStatsByUserId200Schema = z.lazy(
  () => findPhysicalStatsByUserIdResponseDtoSchema,
) as unknown as ToZod<FindPhysicalStatsByUserId200Type>

/**
 * @description Bad request
 */
export const findPhysicalStatsByUserId400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<FindPhysicalStatsByUserId400Type>

export const findPhysicalStatsByUserIdQueryResponseSchema = z.lazy(
  () => findPhysicalStatsByUserId200Schema,
) as unknown as ToZod<FindPhysicalStatsByUserIdQueryResponseType>
