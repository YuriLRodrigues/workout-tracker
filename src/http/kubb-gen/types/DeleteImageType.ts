import type { DeleteImageResponseDtoType } from './DeleteImageResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerNotAllowedDtoType } from './SwaggerNotAllowedDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

export type DeleteImagePathParamsType = {
  /**
   * @type string
   */
  id: string
}

/**
 * @description Image successfully deleted
 */
export type DeleteImage200Type = DeleteImageResponseDtoType

/**
 * @description Bad request
 */
export type DeleteImage400Type = SwaggerBadRequestDtoType

/**
 * @description Not allowed
 */
export type DeleteImage403Type = SwaggerNotAllowedDtoType

/**
 * @description Resource not found
 */
export type DeleteImage404Type = SwaggerResourceNotFoundDtoType

export type DeleteImageMutationResponseType = DeleteImage200Type

export type DeleteImageTypeMutation = {
  Response: DeleteImage200Type
  PathParams: DeleteImagePathParamsType
  Errors: DeleteImage400Type | DeleteImage403Type | DeleteImage404Type
}
