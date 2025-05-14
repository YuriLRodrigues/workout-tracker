import type { FindPhysicalStatsByUserIdResponseDtoType } from './FindPhysicalStatsByUserIdResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'

/**
 * @description Physical found or not
 */
export type FindPhysicalStatsByUserId200Type = FindPhysicalStatsByUserIdResponseDtoType

/**
 * @description Bad request
 */
export type FindPhysicalStatsByUserId400Type = SwaggerBadRequestDtoType

export type FindPhysicalStatsByUserIdQueryResponseType = FindPhysicalStatsByUserId200Type

export type FindPhysicalStatsByUserIdTypeQuery = {
  Response: FindPhysicalStatsByUserId200Type
  Errors: FindPhysicalStatsByUserId400Type
}
