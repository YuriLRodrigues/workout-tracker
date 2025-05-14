import type { FindLogTodayByExerciseIdResponseDtoType } from './FindLogTodayByExerciseIdResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

export type FindLogTodayByExerciseIdPathParamsType = {
  /**
   * @type string
   */
  exerciseId: string
}

/**
 * @description Logs completed found
 */
export type FindLogTodayByExerciseId200Type = FindLogTodayByExerciseIdResponseDtoType

/**
 * @description Bad request
 */
export type FindLogTodayByExerciseId400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type FindLogTodayByExerciseId404Type = SwaggerResourceNotFoundDtoType

export type FindLogTodayByExerciseIdQueryResponseType = FindLogTodayByExerciseId200Type

export type FindLogTodayByExerciseIdTypeQuery = {
  Response: FindLogTodayByExerciseId200Type
  PathParams: FindLogTodayByExerciseIdPathParamsType
  Errors: FindLogTodayByExerciseId400Type | FindLogTodayByExerciseId404Type
}
