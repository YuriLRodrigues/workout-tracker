import type { ExerciseDtoType } from './ExerciseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

export type FindExerciseByIdPathParamsType = {
  /**
   * @type string
   */
  id: string
}

/**
 * @description Exercise found
 */
export type FindExerciseById200Type = ExerciseDtoType

/**
 * @description Bad request
 */
export type FindExerciseById400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type FindExerciseById404Type = SwaggerResourceNotFoundDtoType

export type FindExerciseByIdQueryResponseType = FindExerciseById200Type

export type FindExerciseByIdTypeQuery = {
  Response: FindExerciseById200Type
  PathParams: FindExerciseByIdPathParamsType
  Errors: FindExerciseById400Type | FindExerciseById404Type
}
