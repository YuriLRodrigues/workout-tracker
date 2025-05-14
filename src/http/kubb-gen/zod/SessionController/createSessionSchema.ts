import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  CreateSessionPathParamsType,
  CreateSession201Type,
  CreateSession400Type,
  CreateSession404Type,
  CreateSessionMutationResponseType,
} from '../../types/CreateSessionType'
import { createSessionResponseDtoSchema } from '../createSessionResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

export const createSessionPathParamsSchema = z.object({
  workoutId: z.coerce.string(),
}) as unknown as ToZod<CreateSessionPathParamsType>

/**
 * @description Session created successfully
 */
export const createSession201Schema = z.lazy(
  () => createSessionResponseDtoSchema,
) as unknown as ToZod<CreateSession201Type>

/**
 * @description Bad request
 */
export const createSession400Schema = z.lazy(() => swaggerBadRequestDtoSchema) as unknown as ToZod<CreateSession400Type>

/**
 * @description Resource not found
 */
export const createSession404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<CreateSession404Type>

export const createSessionMutationResponseSchema = z.lazy(
  () => createSession201Schema,
) as unknown as ToZod<CreateSessionMutationResponseType>
