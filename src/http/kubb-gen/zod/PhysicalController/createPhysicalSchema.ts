import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  CreatePhysical201Type,
  CreatePhysical400Type,
  CreatePhysicalMutationRequestType,
  CreatePhysicalMutationResponseType,
} from '../../types/CreatePhysicalType'
import { createPhysicalBodyDtoSchema } from '../createPhysicalBodyDtoSchema'
import { createPhysicalResponseDtoSchema } from '../createPhysicalResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'

/**
 * @description Physical created successfully
 */
export const createPhysical201Schema = z.lazy(
  () => createPhysicalResponseDtoSchema,
) as unknown as ToZod<CreatePhysical201Type>

/**
 * @description Bad request
 */
export const createPhysical400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<CreatePhysical400Type>

export const createPhysicalMutationRequestSchema = z.lazy(
  () => createPhysicalBodyDtoSchema,
) as unknown as ToZod<CreatePhysicalMutationRequestType>

export const createPhysicalMutationResponseSchema = z.lazy(
  () => createPhysical201Schema,
) as unknown as ToZod<CreatePhysicalMutationResponseType>
