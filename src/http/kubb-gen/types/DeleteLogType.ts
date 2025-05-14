import type { DeleteLogResponseDtoType } from './DeleteLogResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerNotAllowedDtoType } from './SwaggerNotAllowedDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

export type DeleteLogPathParamsType = {
  /**
   * @type string
   */
  id: string
}

/**
 * @description Log successfully deleted
 */
export type DeleteLog200Type = DeleteLogResponseDtoType

/**
 * @description Bad request
 */
export type DeleteLog400Type = SwaggerBadRequestDtoType

/**
 * @description Not allowed
 */
export type DeleteLog403Type = SwaggerNotAllowedDtoType

/**
 * @description Resource not found
 */
export type DeleteLog404Type = SwaggerResourceNotFoundDtoType

export type DeleteLogMutationResponseType = DeleteLog200Type

export type DeleteLogTypeMutation = {
  Response: DeleteLog200Type
  PathParams: DeleteLogPathParamsType
  Errors: DeleteLog400Type | DeleteLog403Type | DeleteLog404Type
}
