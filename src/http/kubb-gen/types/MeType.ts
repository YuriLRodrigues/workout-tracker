import type { MeDtoType } from './MeDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

/**
 * @description Profile details
 */
export type Me200Type = MeDtoType

/**
 * @description Bad request
 */
export type Me400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type Me404Type = SwaggerResourceNotFoundDtoType

export type MeQueryResponseType = Me200Type

export type MeTypeQuery = {
  Response: Me200Type
  Errors: Me400Type | Me404Type
}
