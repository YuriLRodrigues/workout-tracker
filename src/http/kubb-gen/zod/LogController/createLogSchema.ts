import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  CreateLogPathParamsType,
  CreateLog201Type,
  CreateLog400Type,
  CreateLogMutationRequestType,
  CreateLogMutationResponseType,
} from '../../types/CreateLogType'
import { createLogBodyDtoSchema } from '../createLogBodyDtoSchema'
import { createLogResponseDtoSchema } from '../createLogResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'

export const createLogPathParamsSchema = z.object({
  exerciseId: z.coerce.string(),
}) as unknown as ToZod<CreateLogPathParamsType>

/**
 * @description Log created successfully
 */
export const createLog201Schema = z.lazy(() => createLogResponseDtoSchema) as unknown as ToZod<CreateLog201Type>

/**
 * @description Bad request
 */
export const createLog400Schema = z.lazy(() => swaggerBadRequestDtoSchema) as unknown as ToZod<CreateLog400Type>

export const createLogMutationRequestSchema = z.lazy(
  () => createLogBodyDtoSchema,
) as unknown as ToZod<CreateLogMutationRequestType>

export const createLogMutationResponseSchema = z.lazy(
  () => createLog201Schema,
) as unknown as ToZod<CreateLogMutationResponseType>
