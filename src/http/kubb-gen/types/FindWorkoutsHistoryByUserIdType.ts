import type { FindWorkoutsHistoryByUserIdResponseDtoType } from './FindWorkoutsHistoryByUserIdResponseDtoType'
import type { PaginatedDtoType } from './PaginatedDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

export type FindWorkoutsHistoryByUserIdQueryParamsType = {
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
  /**
   * @description The workoutId reference to search
   * @type string
   */
  query?: (string | null) | undefined
}

export type FindWorkoutsHistoryByUserId200Type = PaginatedDtoType & {
  /**
   * @type array | undefined
   */
  results?: FindWorkoutsHistoryByUserIdResponseDtoType[] | undefined
}

/**
 * @description Bad request
 */
export type FindWorkoutsHistoryByUserId400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type FindWorkoutsHistoryByUserId404Type = SwaggerResourceNotFoundDtoType

export type FindWorkoutsHistoryByUserIdQueryResponseType = FindWorkoutsHistoryByUserId200Type

export type FindWorkoutsHistoryByUserIdTypeQuery = {
  Response: FindWorkoutsHistoryByUserId200Type
  QueryParams: FindWorkoutsHistoryByUserIdQueryParamsType
  Errors: FindWorkoutsHistoryByUserId400Type | FindWorkoutsHistoryByUserId404Type
}
