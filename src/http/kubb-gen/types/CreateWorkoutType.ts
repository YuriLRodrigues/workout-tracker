import type { CreateWorkoutBodyDtoType } from './CreateWorkoutBodyDtoType'
import type { CreateWorkoutResponseDtoType } from './CreateWorkoutResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

/**
 * @description Workout created successfully
 */
export type CreateWorkout201Type = CreateWorkoutResponseDtoType

/**
 * @description Bad request
 */
export type CreateWorkout400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type CreateWorkout404Type = SwaggerResourceNotFoundDtoType

export type CreateWorkoutMutationRequestType = CreateWorkoutBodyDtoType

export type CreateWorkoutMutationResponseType = CreateWorkout201Type

export type CreateWorkoutTypeMutation = {
  Response: CreateWorkout201Type
  Request: CreateWorkoutMutationRequestType
  Errors: CreateWorkout400Type | CreateWorkout404Type
}
