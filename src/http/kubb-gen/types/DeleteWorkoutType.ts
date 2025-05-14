import type { DeleteWorkoutResponseDtoType } from './DeleteWorkoutResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerNotAllowedDtoType } from './SwaggerNotAllowedDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

export type DeleteWorkoutPathParamsType = {
  /**
   * @type string
   */
  id: string
}

/**
 * @description Workout successfully deleted
 */
export type DeleteWorkout200Type = DeleteWorkoutResponseDtoType

/**
 * @description Bad request
 */
export type DeleteWorkout400Type = SwaggerBadRequestDtoType

/**
 * @description Not allowed
 */
export type DeleteWorkout403Type = SwaggerNotAllowedDtoType

/**
 * @description Resource not found
 */
export type DeleteWorkout404Type = SwaggerResourceNotFoundDtoType

export type DeleteWorkoutMutationResponseType = DeleteWorkout200Type

export type DeleteWorkoutTypeMutation = {
  Response: DeleteWorkout200Type
  PathParams: DeleteWorkoutPathParamsType
  Errors: DeleteWorkout400Type | DeleteWorkout403Type | DeleteWorkout404Type
}
