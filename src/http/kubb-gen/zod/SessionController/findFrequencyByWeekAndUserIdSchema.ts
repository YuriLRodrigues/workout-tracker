import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  FindFrequencyByWeekAndUserId200Type,
  FindFrequencyByWeekAndUserId400Type,
  FindFrequencyByWeekAndUserId404Type,
  FindFrequencyByWeekAndUserIdQueryResponseType,
} from '../../types/FindFrequencyByWeekAndUserIdType'
import { findFrequencyByWeekAndUserIdDtoSchema } from '../findFrequencyByWeekAndUserIdDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

/**
 * @description Average frequency by week found
 */
export const findFrequencyByWeekAndUserId200Schema = z.lazy(
  () => findFrequencyByWeekAndUserIdDtoSchema,
) as unknown as ToZod<FindFrequencyByWeekAndUserId200Type>

/**
 * @description Bad request
 */
export const findFrequencyByWeekAndUserId400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<FindFrequencyByWeekAndUserId400Type>

/**
 * @description Resource not found
 */
export const findFrequencyByWeekAndUserId404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<FindFrequencyByWeekAndUserId404Type>

export const findFrequencyByWeekAndUserIdQueryResponseSchema = z.lazy(
  () => findFrequencyByWeekAndUserId200Schema,
) as unknown as ToZod<FindFrequencyByWeekAndUserIdQueryResponseType>
