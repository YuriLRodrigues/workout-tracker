import type { FindTotalAndAvgTimeByUserIdResponseDtoType } from './FindTotalAndAvgTimeByUserIdResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

export type FindTotalAndAvgTimeByUserId200Type = FindTotalAndAvgTimeByUserIdResponseDtoType

/**
 * @description Bad request
 */
export type FindTotalAndAvgTimeByUserId400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type FindTotalAndAvgTimeByUserId404Type = SwaggerResourceNotFoundDtoType

export type FindTotalAndAvgTimeByUserIdQueryResponseType = FindTotalAndAvgTimeByUserId200Type

export type FindTotalAndAvgTimeByUserIdTypeQuery = {
  Response: FindTotalAndAvgTimeByUserId200Type
  Errors: FindTotalAndAvgTimeByUserId400Type | FindTotalAndAvgTimeByUserId404Type
}
