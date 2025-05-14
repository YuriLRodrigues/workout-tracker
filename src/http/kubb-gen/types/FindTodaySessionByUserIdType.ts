import type { FindSessionTodayByUserIdResponseDtoType } from './FindSessionTodayByUserIdResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

export type FindTodaySessionByUserIdPathParamsType = {
  /**
   * @type string
   */
  workoutId: string
}

/**
 * @description Today session found
 */
export type FindTodaySessionByUserId200Type = FindSessionTodayByUserIdResponseDtoType

/**
 * @description Bad request
 */
export type FindTodaySessionByUserId400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type FindTodaySessionByUserId404Type = SwaggerResourceNotFoundDtoType

export type FindTodaySessionByUserIdQueryResponseType = FindTodaySessionByUserId200Type

export type FindTodaySessionByUserIdTypeQuery = {
  Response: FindTodaySessionByUserId200Type
  PathParams: FindTodaySessionByUserIdPathParamsType
  Errors: FindTodaySessionByUserId400Type | FindTodaySessionByUserId404Type
}
