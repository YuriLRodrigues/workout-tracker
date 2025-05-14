import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  FindTotalWorkoutsCountByUserId200Type,
  FindTotalWorkoutsCountByUserId400Type,
  FindTotalWorkoutsCountByUserId404Type,
  FindTotalWorkoutsCountByUserIdQueryResponseType,
} from '../../types/FindTotalWorkoutsCountByUserIdType'
import { findTotalWorkoutsCountByUserIdResponseDtoSchema } from '../findTotalWorkoutsCountByUserIdResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

export const findTotalWorkoutsCountByUserId200Schema = z.lazy(
  () => findTotalWorkoutsCountByUserIdResponseDtoSchema,
) as unknown as ToZod<FindTotalWorkoutsCountByUserId200Type>

/**
 * @description Bad request
 */
export const findTotalWorkoutsCountByUserId400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<FindTotalWorkoutsCountByUserId400Type>

/**
 * @description Resource not found
 */
export const findTotalWorkoutsCountByUserId404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<FindTotalWorkoutsCountByUserId404Type>

export const findTotalWorkoutsCountByUserIdQueryResponseSchema = z.lazy(
  () => findTotalWorkoutsCountByUserId200Schema,
) as unknown as ToZod<FindTotalWorkoutsCountByUserIdQueryResponseType>
