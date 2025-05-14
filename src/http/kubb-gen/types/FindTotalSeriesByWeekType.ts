import type { FindTotalSeriesByWeekDtoType } from './FindTotalSeriesByWeekDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

/**
 * @description Avg series found
 */
export type FindTotalSeriesByWeek200Type = FindTotalSeriesByWeekDtoType

/**
 * @description Bad request
 */
export type FindTotalSeriesByWeek400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type FindTotalSeriesByWeek404Type = SwaggerResourceNotFoundDtoType

export type FindTotalSeriesByWeekQueryResponseType = FindTotalSeriesByWeek200Type

export type FindTotalSeriesByWeekTypeQuery = {
  Response: FindTotalSeriesByWeek200Type
  Errors: FindTotalSeriesByWeek400Type | FindTotalSeriesByWeek404Type
}
