import type { FindAllLogsTodayResponseDtoType } from './FindAllLogsTodayResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

export type FindAllLogsTodayPathParamsType = {
  /**
   * @type string
   */
  workoutId: string
}

/**
 * @description Logs found
 */
export type FindAllLogsToday200Type = FindAllLogsTodayResponseDtoType

/**
 * @description Bad request
 */
export type FindAllLogsToday400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type FindAllLogsToday404Type = SwaggerResourceNotFoundDtoType

export type FindAllLogsTodayQueryResponseType = FindAllLogsToday200Type

export type FindAllLogsTodayTypeQuery = {
  Response: FindAllLogsToday200Type
  PathParams: FindAllLogsTodayPathParamsType
  Errors: FindAllLogsToday400Type | FindAllLogsToday404Type
}
