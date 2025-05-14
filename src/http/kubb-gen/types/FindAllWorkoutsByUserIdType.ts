import type { PaginatedDtoType } from './PaginatedDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'
import type { WorkoutDtoType } from './WorkoutDtoType'

export type FindAllWorkoutsByUserIdQueryParamsType = {
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

export type FindAllWorkoutsByUserId200Type = PaginatedDtoType & {
  /**
   * @type array | undefined
   */
  results?: WorkoutDtoType[] | undefined
}

/**
 * @description Bad request
 */
export type FindAllWorkoutsByUserId400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type FindAllWorkoutsByUserId404Type = SwaggerResourceNotFoundDtoType

export type FindAllWorkoutsByUserIdQueryResponseType = FindAllWorkoutsByUserId200Type

export type FindAllWorkoutsByUserIdTypeQuery = {
  Response: FindAllWorkoutsByUserId200Type
  QueryParams: FindAllWorkoutsByUserIdQueryParamsType
  Errors: FindAllWorkoutsByUserId400Type | FindAllWorkoutsByUserId404Type
}
