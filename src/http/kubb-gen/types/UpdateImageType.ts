import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerNotAllowedDtoType } from './SwaggerNotAllowedDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'
import type { UpdateImageResponseDtoType } from './UpdateImageResponseDtoType'

export type UpdateImagePathParamsType = {
  /**
   * @type string
   */
  id: string
}

/**
 * @description Image successfully uploaded and updated
 */
export type UpdateImage201Type = UpdateImageResponseDtoType

/**
 * @description Bad request
 */
export type UpdateImage400Type = SwaggerBadRequestDtoType

/**
 * @description Not allowed
 */
export type UpdateImage403Type = SwaggerNotAllowedDtoType

/**
 * @description Resource not found
 */
export type UpdateImage404Type = SwaggerResourceNotFoundDtoType

export type UpdateImageMutationResponseType = UpdateImage201Type

export type UpdateImageTypeMutation = {
  Response: UpdateImage201Type
  PathParams: UpdateImagePathParamsType
  Errors: UpdateImage400Type | UpdateImage403Type | UpdateImage404Type
}
