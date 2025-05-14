import type { FindFrequencyByWeekAndUserIdDtoType } from './FindFrequencyByWeekAndUserIdDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

/**
 * @description Average frequency by week found
 */
export type FindFrequencyByWeekAndUserId200Type = FindFrequencyByWeekAndUserIdDtoType

/**
 * @description Bad request
 */
export type FindFrequencyByWeekAndUserId400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type FindFrequencyByWeekAndUserId404Type = SwaggerResourceNotFoundDtoType

export type FindFrequencyByWeekAndUserIdQueryResponseType = FindFrequencyByWeekAndUserId200Type

export type FindFrequencyByWeekAndUserIdTypeQuery = {
  Response: FindFrequencyByWeekAndUserId200Type
  Errors: FindFrequencyByWeekAndUserId400Type | FindFrequencyByWeekAndUserId404Type
}
