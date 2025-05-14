import type { DeleteExerciseResponseDtoType } from './DeleteExerciseResponseDtoType'
import type { SwaggerBadRequestDtoType } from './SwaggerBadRequestDtoType'
import type { SwaggerNotAllowedDtoType } from './SwaggerNotAllowedDtoType'
import type { SwaggerResourceNotFoundDtoType } from './SwaggerResourceNotFoundDtoType'

export type DeleteExercisePathParamsType = {
  /**
   * @type string
   */
  id: string
}

/**
 * @description Exercise successfully deleted
 */
export type DeleteExercise200Type = DeleteExerciseResponseDtoType

/**
 * @description Bad request
 */
export type DeleteExercise400Type = SwaggerBadRequestDtoType

/**
 * @description Not allowed
 */
export type DeleteExercise403Type = SwaggerNotAllowedDtoType

/**
 * @description Resource not found
 */
export type DeleteExercise404Type = SwaggerResourceNotFoundDtoType

export type DeleteExerciseMutationResponseType = DeleteExercise200Type

export type DeleteExerciseTypeMutation = {
  Response: DeleteExercise200Type
  PathParams: DeleteExercisePathParamsType
  Errors: DeleteExercise400Type | DeleteExercise403Type | DeleteExercise404Type
}
