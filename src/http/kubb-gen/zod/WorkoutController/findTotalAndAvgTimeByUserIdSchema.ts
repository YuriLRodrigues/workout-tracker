import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  FindTotalAndAvgTimeByUserId200Type,
  FindTotalAndAvgTimeByUserId400Type,
  FindTotalAndAvgTimeByUserId404Type,
  FindTotalAndAvgTimeByUserIdQueryResponseType,
} from '../../types/FindTotalAndAvgTimeByUserIdType'
import { findTotalAndAvgTimeByUserIdResponseDtoSchema } from '../findTotalAndAvgTimeByUserIdResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

export const findTotalAndAvgTimeByUserId200Schema = z.lazy(
  () => findTotalAndAvgTimeByUserIdResponseDtoSchema,
) as unknown as ToZod<FindTotalAndAvgTimeByUserId200Type>

/**
 * @description Bad request
 */
export const findTotalAndAvgTimeByUserId400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<FindTotalAndAvgTimeByUserId400Type>

/**
 * @description Resource not found
 */
export const findTotalAndAvgTimeByUserId404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<FindTotalAndAvgTimeByUserId404Type>

export const findTotalAndAvgTimeByUserIdQueryResponseSchema = z.lazy(
  () => findTotalAndAvgTimeByUserId200Schema,
) as unknown as ToZod<FindTotalAndAvgTimeByUserIdQueryResponseType>
