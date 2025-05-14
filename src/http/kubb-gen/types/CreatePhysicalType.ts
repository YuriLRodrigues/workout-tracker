import type { CreatePhysicalBodyDtoType } from './CreatePhysicalBodyDtoType'
import type { CreatePhysicalResponseDtoType } from './CreatePhysicalResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'

/**
 * @description Physical created successfully
 */
export type CreatePhysical201Type = CreatePhysicalResponseDtoType

/**
 * @description Bad request
 */
export type CreatePhysical400Type = SwaggerBadRequestDtoType

export type CreatePhysicalMutationRequestType = CreatePhysicalBodyDtoType

export type CreatePhysicalMutationResponseType = CreatePhysical201Type

export type CreatePhysicalTypeMutation = {
  Response: CreatePhysical201Type
  Request: CreatePhysicalMutationRequestType
  Errors: CreatePhysical400Type
}
