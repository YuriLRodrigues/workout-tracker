import type { FindAverageTimeByWeekDtoType } from './FindAverageTimeByWeekDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

/**
 * @description Avg time found
 */
export type FindAverageTimeByWeek200Type = FindAverageTimeByWeekDtoType

/**
 * @description Bad request
 */
export type FindAverageTimeByWeek400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type FindAverageTimeByWeek404Type = SwaggerResourceNotFoundDtoType

export type FindAverageTimeByWeekQueryResponseType = FindAverageTimeByWeek200Type

export type FindAverageTimeByWeekTypeQuery = {
  Response: FindAverageTimeByWeek200Type
  Errors: FindAverageTimeByWeek400Type | FindAverageTimeByWeek404Type
}
