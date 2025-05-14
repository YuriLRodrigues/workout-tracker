import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  DeleteUserPathParamsType,
  DeleteUser200Type,
  DeleteUser400Type,
  DeleteUser403Type,
  DeleteUser404Type,
  DeleteUserMutationResponseType,
} from '../../types/DeleteUserType'
import { deleteUserResponseDtoSchema } from '../deleteUserResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerNotAllowedDtoSchema } from '../swaggerNotAllowedDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

export const deleteUserPathParamsSchema = z.object({
  id: z.coerce.string(),
}) as unknown as ToZod<DeleteUserPathParamsType>

/**
 * @description User successfully deleted
 */
export const deleteUser200Schema = z.lazy(() => deleteUserResponseDtoSchema) as unknown as ToZod<DeleteUser200Type>

/**
 * @description Bad request
 */
export const deleteUser400Schema = z.lazy(() => swaggerBadRequestDtoSchema) as unknown as ToZod<DeleteUser400Type>

/**
 * @description Not allowed
 */
export const deleteUser403Schema = z.lazy(() => swaggerNotAllowedDtoSchema) as unknown as ToZod<DeleteUser403Type>

/**
 * @description Resource not found
 */
export const deleteUser404Schema = z.lazy(() => swaggerResourceNotFoundDtoSchema) as unknown as ToZod<DeleteUser404Type>

export const deleteUserMutationResponseSchema = z.lazy(
  () => deleteUser200Schema,
) as unknown as ToZod<DeleteUserMutationResponseType>
