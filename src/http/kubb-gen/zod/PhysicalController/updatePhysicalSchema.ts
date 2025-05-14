import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  UpdatePhysical200Type,
  UpdatePhysical400Type,
  UpdatePhysicalMutationRequestType,
  UpdatePhysicalMutationResponseType,
} from '../../types/UpdatePhysicalType'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { updatePhysicalBodyDtoSchema } from '../updatePhysicalBodyDtoSchema'
import { updatePhysicalResponseDtoSchema } from '../updatePhysicalResponseDtoSchema'

/**
 * @description Physical updated successfully
 */
export const updatePhysical200Schema = z.lazy(
  () => updatePhysicalResponseDtoSchema,
) as unknown as ToZod<UpdatePhysical200Type>

/**
 * @description Bad request
 */
export const updatePhysical400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<UpdatePhysical400Type>

export const updatePhysicalMutationRequestSchema = z.lazy(
  () => updatePhysicalBodyDtoSchema,
) as unknown as ToZod<UpdatePhysicalMutationRequestType>

export const updatePhysicalMutationResponseSchema = z.lazy(
  () => updatePhysical200Schema,
) as unknown as ToZod<UpdatePhysicalMutationResponseType>
