import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type { Me200Type, Me400Type, Me404Type, MeQueryResponseType } from '../../types/MeType'
import { meDtoSchema } from '../meDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

/**
 * @description Profile details
 */
export const me200Schema = z.lazy(() => meDtoSchema) as unknown as ToZod<Me200Type>

/**
 * @description Bad request
 */
export const me400Schema = z.lazy(() => swaggerBadRequestDtoSchema) as unknown as ToZod<Me400Type>

/**
 * @description Resource not found
 */
export const me404Schema = z.lazy(() => swaggerResourceNotFoundDtoSchema) as unknown as ToZod<Me404Type>

export const meQueryResponseSchema = z.lazy(() => me200Schema) as unknown as ToZod<MeQueryResponseType>
