import type { LogsType } from './LogsType'
import type { PaginatedDtoType } from './PaginatedDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

export type FindAllLogsByExerciseIdPathParamsType = {
  /**
   * @type string
   */
  exerciseId: string
}

export type FindAllLogsByExerciseIdQueryParamsType = {
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

export type FindAllLogsByExerciseId200Type = PaginatedDtoType & {
  /**
   * @type array | undefined
   */
  results?: LogsType[] | undefined
}

/**
 * @description Bad request
 */
export type FindAllLogsByExerciseId400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type FindAllLogsByExerciseId404Type = SwaggerResourceNotFoundDtoType

export type FindAllLogsByExerciseIdQueryResponseType = FindAllLogsByExerciseId200Type

export type FindAllLogsByExerciseIdTypeQuery = {
  Response: FindAllLogsByExerciseId200Type
  PathParams: FindAllLogsByExerciseIdPathParamsType
  QueryParams: FindAllLogsByExerciseIdQueryParamsType
  Errors: FindAllLogsByExerciseId400Type | FindAllLogsByExerciseId404Type
}
