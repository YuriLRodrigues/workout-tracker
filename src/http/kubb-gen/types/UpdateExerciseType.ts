import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'
import type { UpdateExerciseBodyDtoType } from './UpdateExerciseBodyDtoType'
import type { UpdateExerciseResponseDtoType } from './UpdateExerciseResponseDtoType'

export type UpdateExercisePathParamsType = {
  /**
   * @type string
   */
  exerciseId: string
}

/**
 * @description Exercise updated successfully
 */
export type UpdateExercise201Type = UpdateExerciseResponseDtoType

/**
 * @description Bad request
 */
export type UpdateExercise400Type = SwaggerBadRequestDtoType

/**
 * @description Resource not found
 */
export type UpdateExercise404Type = SwaggerResourceNotFoundDtoType

export type UpdateExerciseMutationRequestType = UpdateExerciseBodyDtoType

export type UpdateExerciseMutationResponseType = UpdateExercise201Type

export type UpdateExerciseTypeMutation = {
  Response: UpdateExercise201Type
  Request: UpdateExerciseMutationRequestType
  PathParams: UpdateExercisePathParamsType
  Errors: UpdateExercise400Type | UpdateExercise404Type
}
