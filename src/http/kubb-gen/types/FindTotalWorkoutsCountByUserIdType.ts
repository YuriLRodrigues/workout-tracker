import type { FindTotalWorkoutsCountByUserIdResponseDtoType } from './FindTotalWorkoutsCountByUserIdResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

export type FindTotalWorkoutsCountByUserId200Type = FindTotalWorkoutsCountByUserIdResponseDtoType

/**
 * @description Bad request
 */
export type FindTotalWorkoutsCountByUserId400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type FindTotalWorkoutsCountByUserId404Type = SwaggerResourceNotFoundDtoType

export type FindTotalWorkoutsCountByUserIdQueryResponseType = FindTotalWorkoutsCountByUserId200Type

export type FindTotalWorkoutsCountByUserIdTypeQuery = {
  Response: FindTotalWorkoutsCountByUserId200Type
  Errors: FindTotalWorkoutsCountByUserId400Type | FindTotalWorkoutsCountByUserId404Type
}
