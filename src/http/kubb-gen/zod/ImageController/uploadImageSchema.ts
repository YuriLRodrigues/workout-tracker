import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  UploadImagePathParamsType,
  UploadImage201Type,
  UploadImage400Type,
  UploadImage403Type,
  UploadImageMutationRequestType,
  UploadImageMutationResponseType,
} from '../../types/UploadImageType'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerNotAllowedDtoSchema } from '../swaggerNotAllowedDtoSchema'
import { uploadSchema } from '../uploadSchema'

export const uploadImagePathParamsSchema = z.object({
  type: z.coerce.string(),
}) as unknown as ToZod<UploadImagePathParamsType>

/**
 * @description Image successfully uploaded
 */
export const uploadImage201Schema = z.lazy(() => uploadSchema) as unknown as ToZod<UploadImage201Type>

/**
 * @description Bad request
 */
export const uploadImage400Schema = z.lazy(() => swaggerBadRequestDtoSchema) as unknown as ToZod<UploadImage400Type>

/**
 * @description Not allowed
 */
export const uploadImage403Schema = z.lazy(() => swaggerNotAllowedDtoSchema) as unknown as ToZod<UploadImage403Type>

export const uploadImageMutationRequestSchema = z.object({
  file: z.instanceof(File),
}) as unknown as ToZod<UploadImageMutationRequestType>

export const uploadImageMutationResponseSchema = z.lazy(
  () => uploadImage201Schema,
) as unknown as ToZod<UploadImageMutationResponseType>
