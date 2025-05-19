import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  NewPasswordQueryParamsType,
  NewPassword200Type,
  NewPassword400Type,
  NewPassword401Type,
  NewPasswordMutationRequestType,
  NewPasswordMutationResponseType,
} from '../../types/NewPasswordType'
import { newPasswordBodyDtoSchema } from '../newPasswordBodyDtoSchema'
import { newPasswordResponseDtoSchema } from '../newPasswordResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerInvalidPasswordResetTokenDtoSchema } from '../swaggerInvalidPasswordResetTokenDtoSchema'

export const newPasswordQueryParamsSchema = z.object({
  token: z.coerce.string().describe('The reset or authorization token for the new password'),
}) as unknown as ToZod<NewPasswordQueryParamsType>

/**
 * @description Password changed successfully
 */
export const newPassword200Schema = z.lazy(() => newPasswordResponseDtoSchema) as unknown as ToZod<NewPassword200Type>

/**
 * @description Bad request
 */
export const newPassword400Schema = z.lazy(() => swaggerBadRequestDtoSchema) as unknown as ToZod<NewPassword400Type>

/**
 * @description Invalid password to reset token
 */
export const newPassword401Schema = z.lazy(
  () => swaggerInvalidPasswordResetTokenDtoSchema,
) as unknown as ToZod<NewPassword401Type>

/**
 * @description Body to change password
 */
export const newPasswordMutationRequestSchema = z.lazy(
  () => newPasswordBodyDtoSchema,
) as unknown as ToZod<NewPasswordMutationRequestType>

export const newPasswordMutationResponseSchema = z.lazy(
  () => newPassword200Schema,
) as unknown as ToZod<NewPasswordMutationResponseType>
