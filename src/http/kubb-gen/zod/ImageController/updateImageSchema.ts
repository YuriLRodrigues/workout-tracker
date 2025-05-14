import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  UpdateImagePathParamsType,
  UpdateImage201Type,
  UpdateImage400Type,
  UpdateImage403Type,
  UpdateImage404Type,
  UpdateImageMutationResponseType,
} from '../../types/UpdateImageType'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerNotAllowedDtoSchema } from '../swaggerNotAllowedDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'
import { updateImageResponseDtoSchema } from '../updateImageResponseDtoSchema'

export const updateImagePathParamsSchema = z.object({
  id: z.coerce.string(),
}) as unknown as ToZod<UpdateImagePathParamsType>

/**
 * @description Image successfully uploaded and updated
 */
export const updateImage201Schema = z.lazy(() => updateImageResponseDtoSchema) as unknown as ToZod<UpdateImage201Type>

/**
 * @description Bad request
 */
export const updateImage400Schema = z.lazy(() => swaggerBadRequestDtoSchema) as unknown as ToZod<UpdateImage400Type>

/**
 * @description Not allowed
 */
export const updateImage403Schema = z.lazy(() => swaggerNotAllowedDtoSchema) as unknown as ToZod<UpdateImage403Type>

/**
 * @description Resource not found
 */
export const updateImage404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<UpdateImage404Type>

export const updateImageMutationResponseSchema = z.lazy(
  () => updateImage201Schema,
) as unknown as ToZod<UpdateImageMutationResponseType>
