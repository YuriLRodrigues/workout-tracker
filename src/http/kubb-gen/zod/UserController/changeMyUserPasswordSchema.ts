import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  ChangeMyUserPassword200Type,
  ChangeMyUserPassword400Type,
  ChangeMyUserPassword404Type,
  ChangeMyUserPasswordMutationRequestType,
  ChangeMyUserPasswordMutationResponseType,
} from '../../types/ChangeMyUserPasswordType'
import { changeMyUserPasswordBodyDtoSchema } from '../changeMyUserPasswordBodyDtoSchema'
import { changeMyUserPasswordResponseDtoSchema } from '../changeMyUserPasswordResponseDtoSchema'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceNotFoundDtoSchema } from '../swaggerResourceNotFoundDtoSchema'

/**
 * @description Password successfully modified
 */
export const changeMyUserPassword200Schema = z.lazy(
  () => changeMyUserPasswordResponseDtoSchema,
) as unknown as ToZod<ChangeMyUserPassword200Type>

/**
 * @description Bad request
 */
export const changeMyUserPassword400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<ChangeMyUserPassword400Type>

/**
 * @description Resource not found
 */
export const changeMyUserPassword404Schema = z.lazy(
  () => swaggerResourceNotFoundDtoSchema,
) as unknown as ToZod<ChangeMyUserPassword404Type>

export const changeMyUserPasswordMutationRequestSchema = z.lazy(
  () => changeMyUserPasswordBodyDtoSchema,
) as unknown as ToZod<ChangeMyUserPasswordMutationRequestType>

export const changeMyUserPasswordMutationResponseSchema = z.lazy(
  () => changeMyUserPassword200Schema,
) as unknown as ToZod<ChangeMyUserPasswordMutationResponseType>
