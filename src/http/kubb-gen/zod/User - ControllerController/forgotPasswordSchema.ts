import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  ForgotPassword200Type,
  ForgotPassword400Type,
  ForgotPassword404Type,
  ForgotPasswordMutationRequestType,
  ForgotPasswordMutationResponseType,
} from '../../types/ForgotPasswordType'
import { forgotPasswordBodyDtoSchema } from '../forgotPasswordBodyDtoSchema'
import { forgotResponseDtoSchema } from '../forgotResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

/**
 * @description Password recovery sent to your email
 */
export const forgotPassword200Schema = z.lazy(() => forgotResponseDtoSchema) as unknown as ToZod<ForgotPassword200Type>

/**
 * @description Bad request
 */
export const forgotPassword400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<ForgotPassword400Type>

/**
 * @description Resource not found
 */
export const forgotPassword404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<ForgotPassword404Type>

export const forgotPasswordMutationRequestSchema = z.lazy(
  () => forgotPasswordBodyDtoSchema,
) as unknown as ToZod<ForgotPasswordMutationRequestType>

export const forgotPasswordMutationResponseSchema = z.lazy(
  () => forgotPassword200Schema,
) as unknown as ToZod<ForgotPasswordMutationResponseType>
