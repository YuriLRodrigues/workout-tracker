import type { ExerciseDtoType } from './ExerciseDtoType'
import type { PaginatedDtoType } from './PaginatedDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

export type FindAllExercisesByWorkoutIdPathParamsType = {
  /**
   * @type string
   */
  workoutId: string
}

export type FindAllExercisesByWorkoutIdQueryParamsType = {
  /**
   * @description Page for pagination
   * @default 1
   * @type number | undefined
   */
  page?: number | undefined
  /**
   * @description Limit for pagination
   * @default 9
   * @type number | undefined
   */
  limit?: number | undefined
}

export type FindAllExercisesByWorkoutId200Type = PaginatedDtoType & {
  /**
   * @type array | undefined
   */
  results?: ExerciseDtoType[] | undefined
}

/**
 * @description Bad request
 */
export type FindAllExercisesByWorkoutId400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type FindAllExercisesByWorkoutId404Type = SwaggerResourceNotFoundDtoType

export type FindAllExercisesByWorkoutIdQueryResponseType = FindAllExercisesByWorkoutId200Type

export type FindAllExercisesByWorkoutIdTypeQuery = {
  Response: FindAllExercisesByWorkoutId200Type
  PathParams: FindAllExercisesByWorkoutIdPathParamsType
  QueryParams: FindAllExercisesByWorkoutIdQueryParamsType
  Errors: FindAllExercisesByWorkoutId400Type | FindAllExercisesByWorkoutId404Type
}
