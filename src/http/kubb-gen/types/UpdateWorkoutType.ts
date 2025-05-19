import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'
import type { UpdateWorkoutBodyDtoType } from './UpdateWorkoutBodyDtoType'
import type { UpdateWorkoutResponseDtoType } from './UpdateWorkoutResponseDtoType'

export type UpdateWorkoutPathParamsType = {
  /**
   * @type string
   */
  workoutId: string
}

/**
 * @description Workout updated successfully
 */
export type UpdateWorkout201Type = UpdateWorkoutResponseDtoType

/**
 * @description Bad request
 */
export type UpdateWorkout400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type UpdateWorkout404Type = SwaggerResourceNotFoundDtoType

export type UpdateWorkoutMutationRequestType = UpdateWorkoutBodyDtoType

export type UpdateWorkoutMutationResponseType = UpdateWorkout201Type

export type UpdateWorkoutTypeMutation = {
  Response: UpdateWorkout201Type
  Request: UpdateWorkoutMutationRequestType
  PathParams: UpdateWorkoutPathParamsType
  Errors: UpdateWorkout400Type | UpdateWorkout404Type
}
