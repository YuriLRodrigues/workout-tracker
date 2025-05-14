import type { FindTotalLoadByWeekDtoType } from './FindTotalLoadByWeekDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

/**
 * @description Avg workout found
 */
export type FindTotalLoadByWeek200Type = FindTotalLoadByWeekDtoType

/**
 * @description Bad request
 */
export type FindTotalLoadByWeek400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type FindTotalLoadByWeek404Type = SwaggerResourceNotFoundDtoType

export type FindTotalLoadByWeekQueryResponseType = FindTotalLoadByWeek200Type

export type FindTotalLoadByWeekTypeQuery = {
  Response: FindTotalLoadByWeek200Type
  Errors: FindTotalLoadByWeek400Type | FindTotalLoadByWeek404Type
}
