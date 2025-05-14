export const logsExerciseExecutionTypeEnum = {
  REPETITION: 'REPETITION',
  TIME: 'TIME',
} as const

export type LogsExerciseExecutionTypeEnumType =
  (typeof logsExerciseExecutionTypeEnum)[keyof typeof logsExerciseExecutionTypeEnum]

export type LogsType = {
  /**
   * @description Unique identifier for the log
   * @type string
   */
  id: string
  /**
   * @description Maximum number of sets performed during the exercise
   * @type number
   */
  maxSeries: number
  /**
   * @description Maximum weight lifted during the exercise (in kilograms)
   * @type number
   */
  maxWeight: number
  /**
   * @description Indicates the perceived level of effort during the workout.
   * @type number
   */
  effortLevel: number
  /**
   * @description Maximum number of repetitions achieved in a single set
   * @type number
   */
  maxRepeat: number
  /**
   * @description Average rest time between sets (in seconds)
   * @type number
   */
  averageRestTime: number
  /**
   * @description Optional notes or observations about the exercise session
   * @type string | undefined
   */
  notes?: string | undefined
  /**
   * @description ID of the related workout session (optional)
   * @type string | undefined
   */
  sessionId?: string | undefined
  /**
   * @description ID of the exercise being logged
   * @type string
   */
  exerciseId: string
  /**
   * @description ID of the user who performed the exercise
   * @type string
   */
  userId: string
  /**
   * @description Date and time when the log was created
   * @type string, date-time
   */
  createdAt: Date
  /**
   * @description Exercise execution type
   * @type string
   */
  exerciseExecutionType: LogsExerciseExecutionTypeEnumType
}
