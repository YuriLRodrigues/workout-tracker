import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  DeleteImagePathParamsType,
  DeleteImage200Type,
  DeleteImage400Type,
  DeleteImage403Type,
  DeleteImage404Type,
  DeleteImageMutationResponseType,
} from '../../types/DeleteImageType'
import { deleteImageResponseDtoSchema } from '../deleteImageResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerNotAllowedDtoSchema } from '../swaggerNotAllowedDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

export const deleteImagePathParamsSchema = z.object({
  id: z.coerce.string(),
}) as unknown as ToZod<DeleteImagePathParamsType>

/**
 * @description Image successfully deleted
 */
export const deleteImage200Schema = z.lazy(() => deleteImageResponseDtoSchema) as unknown as ToZod<DeleteImage200Type>

/**
 * @description Bad request
 */
export const deleteImage400Schema = z.lazy(() => swaggerBadRequestDtoSchema) as unknown as ToZod<DeleteImage400Type>

/**
 * @description Not allowed
 */
export const deleteImage403Schema = z.lazy(() => swaggerNotAllowedDtoSchema) as unknown as ToZod<DeleteImage403Type>

/**
 * @description Resource not found
 */
export const deleteImage404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<DeleteImage404Type>

export const deleteImageMutationResponseSchema = z.lazy(
  () => deleteImage200Schema,
) as unknown as ToZod<DeleteImageMutationResponseType>
