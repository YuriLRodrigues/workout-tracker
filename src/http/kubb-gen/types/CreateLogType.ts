import type { CreateLogBodyDtoType } from './CreateLogBodyDtoType'
import type { CreateLogResponseDtoType } from './CreateLogResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'

export type CreateLogPathParamsType = {
  /**
   * @type string
   */
  exerciseId: string
}

/**
 * @description Log created successfully
 */
export type CreateLog201Type = CreateLogResponseDtoType

/**
 * @description Bad request
 */
export type CreateLog400Type = SwaggerBadRequestDtoType

export type CreateLogMutationRequestType = CreateLogBodyDtoType

export type CreateLogMutationResponseType = CreateLog201Type

export type CreateLogTypeMutation = {
  Response: CreateLog201Type
  Request: CreateLogMutationRequestType
  PathParams: CreateLogPathParamsType
  Errors: CreateLog400Type
}
