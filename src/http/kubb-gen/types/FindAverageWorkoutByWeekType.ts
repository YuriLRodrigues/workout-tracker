import type { FindAverageWorkoutByWeekDtoType } from './FindAverageWorkoutByWeekDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

/**
 * @description Avg workout found
 */
export type FindAverageWorkoutByWeek200Type = FindAverageWorkoutByWeekDtoType

/**
 * @description Bad request
 */
export type FindAverageWorkoutByWeek400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type FindAverageWorkoutByWeek404Type = SwaggerResourceNotFoundDtoType

export type FindAverageWorkoutByWeekQueryResponseType = FindAverageWorkoutByWeek200Type

export type FindAverageWorkoutByWeekTypeQuery = {
  Response: FindAverageWorkoutByWeek200Type
  Errors: FindAverageWorkoutByWeek400Type | FindAverageWorkoutByWeek404Type
}
