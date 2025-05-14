import type { DeleteUserResponseDtoType } from './DeleteUserResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerNotAllowedDtoType } from './SwaggerNotAllowedDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

export type DeleteUserPathParamsType = {
  /**
   * @type string
   */
  id: string
}

/**
 * @description User successfully deleted
 */
export type DeleteUser200Type = DeleteUserResponseDtoType

/**
 * @description Bad request
 */
export type DeleteUser400Type = SwaggerBadRequestDtoType

/**
 * @description Not allowed
 */
export type DeleteUser403Type = SwaggerNotAllowedDtoType

/**
 * @description Resource not found
 */
export type DeleteUser404Type = SwaggerResourceNotFoundDtoType

export type DeleteUserMutationResponseType = DeleteUser200Type

export type DeleteUserTypeMutation = {
  Response: DeleteUser200Type
  PathParams: DeleteUserPathParamsType
  Errors: DeleteUser400Type | DeleteUser403Type | DeleteUser404Type
}
