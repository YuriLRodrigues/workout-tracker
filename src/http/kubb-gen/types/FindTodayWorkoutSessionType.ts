import type { FindTodayWorkoutSessionResponseDtoType } from './FindTodayWorkoutSessionResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

export type FindTodayWorkoutSessionPathParamsType = {
  /**
   * @type string
   */
  workoutId: string
}

/**
 * @description Session found or not
 */
export type FindTodayWorkoutSession200Type = FindTodayWorkoutSessionResponseDtoType

/**
 * @description Bad request
 */
export type FindTodayWorkoutSession400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type FindTodayWorkoutSession404Type = SwaggerResourceNotFoundDtoType

export type FindTodayWorkoutSessionQueryResponseType = FindTodayWorkoutSession200Type

export type FindTodayWorkoutSessionTypeQuery = {
  Response: FindTodayWorkoutSession200Type
  PathParams: FindTodayWorkoutSessionPathParamsType
  Errors: FindTodayWorkoutSession400Type | FindTodayWorkoutSession404Type
}
