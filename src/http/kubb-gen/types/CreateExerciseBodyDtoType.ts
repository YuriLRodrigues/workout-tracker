export const createExerciseBodyDtoExecutionTypeEnum = {
  REPETITION: 'REPETITION',
  TIME: 'TIME',
} as const

export type CreateExerciseBodyDtoExecutionTypeEnumType =
  (typeof createExerciseBodyDtoExecutionTypeEnum)[keyof typeof createExerciseBodyDtoExecutionTypeEnum]

export const createExerciseBodyDtoMuscleTypeEnum = {
  CHEST: 'CHEST',
  BACK: 'BACK',
  BICEPS: 'BICEPS',
  TRICEPS: 'TRICEPS',
  SHOULDERS: 'SHOULDERS',
  LEGS: 'LEGS',
  CALVES: 'CALVES',
  ABS: 'ABS',
  FULL_BODY: 'FULL_BODY',
} as const

export type CreateExerciseBodyDtoMuscleTypeEnumType =
  (typeof createExerciseBodyDtoMuscleTypeEnum)[keyof typeof createExerciseBodyDtoMuscleTypeEnum]

export type CreateExerciseBodyDtoType = {
  /**
   * @description The name of the exercise
   * @type string
   */
  name: string
  /**
   * @description A brief description of the exercise
   * @type string
   */
  description: string
  /**
   * @description Type of execution: repetition or time
   * @type string
   */
  executionType: CreateExerciseBodyDtoExecutionTypeEnumType
  /**
   * @description The muscle group targeted by the exercise
   * @type string
   */
  muscleType: CreateExerciseBodyDtoMuscleTypeEnumType
  /**
   * @description Target number of repetitions
   * @type number
   */
  targetRepetitions: number
  /**
   * @description Target rest time between sets (in seconds)
   * @type number
   */
  targetResTime: number
  /**
   * @description Target number of sets
   * @type number
   */
  targetSets: number
  /**
   * @description Optional video reference for the exercise
   * @type string | undefined
   */
  videoReference?: string | undefined
  /**
   * @description Optional banner ID associated with the exercise
   * @type string | undefined
   */
  bannerId?: string | undefined
}
