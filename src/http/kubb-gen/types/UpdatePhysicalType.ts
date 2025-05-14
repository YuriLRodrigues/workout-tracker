import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { UpdatePhysicalBodyDtoType } from './UpdatePhysicalBodyDtoType'
import type { UpdatePhysicalResponseDtoType } from './UpdatePhysicalResponseDtoType'

/**
 * @description Physical updated successfully
 */
export type UpdatePhysical200Type = UpdatePhysicalResponseDtoType

/**
 * @description Bad request
 */
export type UpdatePhysical400Type = SwaggerBadRequestDtoType

export type UpdatePhysicalMutationRequestType = UpdatePhysicalBodyDtoType

export type UpdatePhysicalMutationResponseType = UpdatePhysical200Type

export type UpdatePhysicalTypeMutation = {
  Response: UpdatePhysical200Type
  Request: UpdatePhysicalMutationRequestType
  Errors: UpdatePhysical400Type
}
