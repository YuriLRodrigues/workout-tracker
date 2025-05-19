export const updateExerciseBodyDtoExecutionTypeEnum = {
  REPETITION: 'REPETITION',
  TIME: 'TIME',
} as const

export type UpdateExerciseBodyDtoExecutionTypeEnumType =
  (typeof updateExerciseBodyDtoExecutionTypeEnum)[keyof typeof updateExerciseBodyDtoExecutionTypeEnum]

export const updateExerciseBodyDtoMuscleTypeEnum = {
  CHEST: 'CHEST',
  BACK: 'BACK',
  BICEPS: 'BICEPS',
  TRICEPS: 'TRICEPS',
  SHOULDERS: 'SHOULDERS',
  LEGS: 'LEGS',
  CALVES: 'CALVES',
  ABS: 'ABS',
  FULL_BODY: 'FULL_BODY',
  GLUTES: 'GLUTES',
  HAMSTRINGS: 'HAMSTRINGS',
  QUADRICEPS: 'QUADRICEPS',
  ADDUCTORS_ABDUCTORS: 'ADDUCTORS_ABDUCTORS',
} as const

export type UpdateExerciseBodyDtoMuscleTypeEnumType =
  (typeof updateExerciseBodyDtoMuscleTypeEnum)[keyof typeof updateExerciseBodyDtoMuscleTypeEnum]

export type UpdateExerciseBodyDtoType = {
  /**
   * @description The name of the exercise
   * @type string | undefined
   */
  name?: string | undefined
  /**
   * @description A brief description of the exercise
   * @type string | undefined
   */
  description?: string | undefined
  /**
   * @description Type of execution: repetition or time
   * @type string | undefined
   */
  executionType?: UpdateExerciseBodyDtoExecutionTypeEnumType | undefined
  /**
   * @description The muscle group targeted by the exercise
   * @type string | undefined
   */
  muscleType?: UpdateExerciseBodyDtoMuscleTypeEnumType | undefined
  /**
   * @description Target number of repetitions
   * @type number | undefined
   */
  targetRepetitions?: number | undefined
  /**
   * @description Target rest time between sets (in seconds)
   * @type number | undefined
   */
  targetResTime?: number | undefined
  /**
   * @description Target number of sets
   * @type number | undefined
   */
  targetSets?: number | undefined
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
