import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceAlreadyExistsDtoType } from './SwaggerResourceAlreadyExistsDtoType'
import type { UpdatePersonalInfoBodyDtoType } from './UpdatePersonalInfoBodyDtoType'
import type { UpdatePersonalInfoResponseDtoType } from './UpdatePersonalInfoResponseDtoType'

/**
 * @description Personal information updated
 */
export type UpdatePersonalInfo201Type = UpdatePersonalInfoResponseDtoType

/**
 * @description Bad request
 */
export type UpdatePersonalInfo400Type = SwaggerBadRequestDtoType

/**
 * @description Resource already exists
 */
export type UpdatePersonalInfo409Type = SwaggerResourceAlreadyExistsDtoType

export type UpdatePersonalInfoMutationRequestType = UpdatePersonalInfoBodyDtoType

export type UpdatePersonalInfoMutationResponseType = UpdatePersonalInfo201Type

export type UpdatePersonalInfoTypeMutation = {
  Response: UpdatePersonalInfo201Type
  Request: UpdatePersonalInfoMutationRequestType
  Errors: UpdatePersonalInfo400Type | UpdatePersonalInfo409Type
}
