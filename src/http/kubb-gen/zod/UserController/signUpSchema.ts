import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  SignUp201Type,
  SignUp400Type,
  SignUp409Type,
  SignUpMutationRequestType,
  SignUpMutationResponseType,
} from '../../types/SignUpType'
import { signUpBodyDtoSchema } from '../signUpBodyDtoSchema'
import { signUpResponseDtoSchema } from '../signUpResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceAlreadyExistsDtoSchema } from '../swaggerResourceAlreadyExistsDtoSchema'

/**
 * @description User created successfully
 */
export const signUp201Schema = z.lazy(() => signUpResponseDtoSchema) as unknown as ToZod<SignUp201Type>

/**
 * @description Bad request
 */
export const signUp400Schema = z.lazy(() => swaggerBadRequestDtoSchema) as unknown as ToZod<SignUp400Type>

/**
 * @description Resource already exists
 */
export const signUp409Schema = z.lazy(() => swaggerResourceAlreadyExistsDtoSchema) as unknown as ToZod<SignUp409Type>

export const signUpMutationRequestSchema = z.lazy(
  () => signUpBodyDtoSchema,
) as unknown as ToZod<SignUpMutationRequestType>

export const signUpMutationResponseSchema = z.lazy(
  () => signUp201Schema,
) as unknown as ToZod<SignUpMutationResponseType>
