import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  UpdateSessionPathParamsType,
  UpdateSession200Type,
  UpdateSession400Type,
  UpdateSession403Type,
  UpdateSession404Type,
  UpdateSessionMutationRequestType,
  UpdateSessionMutationResponseType,
} from '../../types/UpdateSessionType'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerNotAllowedDtoSchema } from '../swaggerNotAllowedDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'
import { updateSessionBodyDtoSchema } from '../updateSessionBodyDtoSchema'
import { updateSessionResponseDtoSchema } from '../updateSessionResponseDtoSchema'

export const updateSessionPathParamsSchema = z.object({
  sessionId: z.coerce.string(),
}) as unknown as ToZod<UpdateSessionPathParamsType>

/**
 * @description Log successfully updated
 */
export const updateSession200Schema = z.lazy(
  () => updateSessionResponseDtoSchema,
) as unknown as ToZod<UpdateSession200Type>

/**
 * @description Bad request
 */
export const updateSession400Schema = z.lazy(() => swaggerBadRequestDtoSchema) as unknown as ToZod<UpdateSession400Type>

/**
 * @description Not allowed
 */
export const updateSession403Schema = z.lazy(() => swaggerNotAllowedDtoSchema) as unknown as ToZod<UpdateSession403Type>

/**
 * @description Resource not found
 */
export const updateSession404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<UpdateSession404Type>

export const updateSessionMutationRequestSchema = z.lazy(
  () => updateSessionBodyDtoSchema,
) as unknown as ToZod<UpdateSessionMutationRequestType>

export const updateSessionMutationResponseSchema = z.lazy(
  () => updateSession200Schema,
) as unknown as ToZod<UpdateSessionMutationResponseType>
