import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  DeleteLogPathParamsType,
  DeleteLog200Type,
  DeleteLog400Type,
  DeleteLog403Type,
  DeleteLog404Type,
  DeleteLogMutationResponseType,
} from '../../types/DeleteLogType'
import { deleteLogResponseDtoSchema } from '../deleteLogResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerNotAllowedDtoSchema } from '../swaggerNotAllowedDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

export const deleteLogPathParamsSchema = z.object({
  id: z.coerce.string(),
}) as unknown as ToZod<DeleteLogPathParamsType>

/**
 * @description Log successfully deleted
 */
export const deleteLog200Schema = z.lazy(() => deleteLogResponseDtoSchema) as unknown as ToZod<DeleteLog200Type>

/**
 * @description Bad request
 */
export const deleteLog400Schema = z.lazy(() => swaggerBadRequestDtoSchema) as unknown as ToZod<DeleteLog400Type>

/**
 * @description Not allowed
 */
export const deleteLog403Schema = z.lazy(() => swaggerNotAllowedDtoSchema) as unknown as ToZod<DeleteLog403Type>

/**
 * @description Resource not found
 */
export const deleteLog404Schema = z.lazy(() => swaggerResourceNotFoundDtoSchema) as unknown as ToZod<DeleteLog404Type>

export const deleteLogMutationResponseSchema = z.lazy(
  () => deleteLog200Schema,
) as unknown as ToZod<DeleteLogMutationResponseType>
