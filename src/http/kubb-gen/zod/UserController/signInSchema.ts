import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  SignIn200Type,
  SignIn400Type,
  SignIn409Type,
  SignInMutationRequestType,
  SignInMutationResponseType,
} from '../../types/SignInType'
import { signInBodyDtoSchema } from '../signInBodyDtoSchema'
import { signInResponseDtoSchema } from '../signInResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceAlreadyExistsDtoSchema } from '../swaggerResourceAlreadyExistsDtoSchema'

/**
 * @description User successfully authenticated
 */
export const signIn200Schema = z.lazy(() => signInResponseDtoSchema) as unknown as ToZod<SignIn200Type>

/**
 * @description Bad request
 */
export const signIn400Schema = z.lazy(() => swaggerBadRequestDtoSchema) as unknown as ToZod<SignIn400Type>

/**
 * @description Resource already exists
 */
export const signIn409Schema = z.lazy(() => swaggerResourceAlreadyExistsDtoSchema) as unknown as ToZod<SignIn409Type>

/**
 * @description Body to sign in
 */
export const signInMutationRequestSchema = z.lazy(
  () => signInBodyDtoSchema,
) as unknown as ToZod<SignInMutationRequestType>

export const signInMutationResponseSchema = z.lazy(
  () => signIn200Schema,
) as unknown as ToZod<SignInMutationResponseType>
