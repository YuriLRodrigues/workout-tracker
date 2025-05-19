import type { ExerciseLogsDtoType } from './ExerciseLogsDtoType'

export const exerciseDtoMuscleTypeEnum = {
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

export type ExerciseDtoMuscleTypeEnumType = (typeof exerciseDtoMuscleTypeEnum)[keyof typeof exerciseDtoMuscleTypeEnum]

export const exerciseDtoExecutionTypeEnum = {
  REPETITION: 'REPETITION',
  TIME: 'TIME',
} as const

export type ExerciseDtoExecutionTypeEnumType =
  (typeof exerciseDtoExecutionTypeEnum)[keyof typeof exerciseDtoExecutionTypeEnum]

export type ExerciseDtoType = {
  /**
   * @description Unique identifier for the exercise
   * @type string
   */
  id: string
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
   * @description The muscle group targeted by the exercise
   * @type string
   */
  muscleType: ExerciseDtoMuscleTypeEnumType
  /**
   * @description Type of execution for the exercise (REPETITION or TIME)
   * @type string
   */
  executionType: ExerciseDtoExecutionTypeEnumType
  /**
   * @description Target number of sets
   * @type number
   */
  targetSets: number
  /**
   * @description Target rest time between sets (in seconds)
   * @type number
   */
  targetResTime: number
  /**
   * @description Target number of repetitions
   * @type number
   */
  targetRepetitions: number
  /**
   * @description Max weight of exercise
   * @type number
   */
  maxWeight: number
  /**
   * @description Last weight of exercise
   * @type number
   */
  lastWeight: number
  /**
   * @description Optional video reference URL for the exercise
   * @type string | undefined
   */
  videoReference?: string | undefined
  /**
   * @description ID of the user who created the exercise
   * @type string
   */
  userId: string
  /**
   * @description ID of the workout this exercise belongs to
   * @type string
   */
  workoutId: string
  /**
   * @description List of logs related to the exercise
   * @type array
   */
  logs: ExerciseLogsDtoType[]
  /**
   * @description Date when the exercise was created
   * @type string, date-time
   */
  createdAt: Date
  /**
   * @description Date when the exercise was last updated
   * @type string | undefined, date-time
   */
  updatedAt?: Date | undefined
}
