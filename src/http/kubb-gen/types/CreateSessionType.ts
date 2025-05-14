import type { CreateSessionResponseDtoType } from './CreateSessionResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

export type CreateSessionPathParamsType = {
  /**
   * @type string
   */
  workoutId: string
}

/**
 * @description Session created successfully
 */
export type CreateSession201Type = CreateSessionResponseDtoType

/**
 * @description Bad request
 */
export type CreateSession400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type CreateSession404Type = SwaggerResourceNotFoundDtoType

export type CreateSessionMutationResponseType = CreateSession201Type

export type CreateSessionTypeMutation = {
  Response: CreateSession201Type
  PathParams: CreateSessionPathParamsType
  Errors: CreateSession400Type | CreateSession404Type
}
