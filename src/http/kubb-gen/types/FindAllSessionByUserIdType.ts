import type { FindAllByUserIdDtoType } from './FindAllByUserIdDtoType'
import type { PaginatedDtoType } from './PaginatedDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

export type FindAllSessionByUserIdPathParamsType = {
  /**
   * @description Page for pagination
   * @default 1
   * @type number | undefined
   */
  page?: number | undefined
  /**
   * @description Limit for pagination
   * @default 9
   * @type number | undefined
   */
  limit?: number | undefined
}

export type FindAllSessionByUserId200Type = PaginatedDtoType & {
  /**
   * @type array | undefined
   */
  results?: FindAllByUserIdDtoType[] | undefined
}

/**
 * @description Bad request
 */
export type FindAllSessionByUserId400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type FindAllSessionByUserId404Type = SwaggerResourceNotFoundDtoType

export type FindAllSessionByUserIdQueryResponseType = FindAllSessionByUserId200Type

export type FindAllSessionByUserIdTypeQuery = {
  Response: FindAllSessionByUserId200Type
  PathParams: FindAllSessionByUserIdPathParamsType
  Errors: FindAllSessionByUserId400Type | FindAllSessionByUserId404Type
}
