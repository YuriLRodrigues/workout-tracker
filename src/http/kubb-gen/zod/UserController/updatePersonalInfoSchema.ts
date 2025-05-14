import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

import type {
  UpdatePersonalInfo201Type,
  UpdatePersonalInfo400Type,
  UpdatePersonalInfo409Type,
  UpdatePersonalInfoMutationRequestType,
  UpdatePersonalInfoMutationResponseType,
} from '../../types/UpdatePersonalInfoType'
import { swaggerBadRequestDtoSchema } from '../swaggerBadRequestDtoSchema'
import { swaggerResourceAlreadyExistsDtoSchema } from '../swaggerResourceAlreadyExistsDtoSchema'
import { updatePersonalInfoBodyDtoSchema } from '../updatePersonalInfoBodyDtoSchema'
import { updatePersonalInfoResponseDtoSchema } from '../updatePersonalInfoResponseDtoSchema'

/**
 * @description Personal information updated
 */
export const updatePersonalInfo201Schema = z.lazy(
  () => updatePersonalInfoResponseDtoSchema,
) as unknown as ToZod<UpdatePersonalInfo201Type>

/**
 * @description Bad request
 */
export const updatePersonalInfo400Schema = z.lazy(
  () => swaggerBadRequestDtoSchema,
) as unknown as ToZod<UpdatePersonalInfo400Type>

/**
 * @description Resource already exists
 */
export const updatePersonalInfo409Schema = z.lazy(
  () => swaggerResourceAlreadyExistsDtoSchema,
) as unknown as ToZod<UpdatePersonalInfo409Type>

export const updatePersonalInfoMutationRequestSchema = z.lazy(
  () => updatePersonalInfoBodyDtoSchema,
) as unknown as ToZod<UpdatePersonalInfoMutationRequestType>

export const updatePersonalInfoMutationResponseSchema = z.lazy(
  () => updatePersonalInfo201Schema,
) as unknown as ToZod<UpdatePersonalInfoMutationResponseType>
