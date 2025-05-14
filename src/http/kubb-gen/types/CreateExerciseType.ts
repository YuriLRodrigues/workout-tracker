import type { CreateExerciseBodyDtoType } from './CreateExerciseBodyDtoType'
import type { CreateExerciseResponseDtoType } from './CreateExerciseResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

export type CreateExercisePathParamsType = {
  /**
   * @type string
   */
  workoutId: string
}

/**
 * @description Exercise created successfully
 */
export type CreateExercise201Type = CreateExerciseResponseDtoType

/**
 * @description Bad request
 */
export type CreateExercise400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type CreateExercise404Type = SwaggerResourceNotFoundDtoType

export type CreateExerciseMutationRequestType = CreateExerciseBodyDtoType

export type CreateExerciseMutationResponseType = CreateExercise201Type

export type CreateExerciseTypeMutation = {
  Response: CreateExercise201Type
  Request: CreateExerciseMutationRequestType
  PathParams: CreateExercisePathParamsType
  Errors: CreateExercise400Type | CreateExercise404Type
}
