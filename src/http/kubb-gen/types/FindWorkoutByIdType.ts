import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'
import type { WorkoutDtoType } from './WorkoutDtoType'

export type FindWorkoutByIdPathParamsType = {
  /**
   * @type string
   */
  id: string
}

/**
 * @description Workout found
 */
export type FindWorkoutById200Type = WorkoutDtoType

/**
 * @description Bad request
 */
export type FindWorkoutById400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type FindWorkoutById404Type = SwaggerResourceNotFoundDtoType

export type FindWorkoutByIdQueryResponseType = FindWorkoutById200Type

export type FindWorkoutByIdTypeQuery = {
  Response: FindWorkoutById200Type
  PathParams: FindWorkoutByIdPathParamsType
  Errors: FindWorkoutById400Type | FindWorkoutById404Type
}
