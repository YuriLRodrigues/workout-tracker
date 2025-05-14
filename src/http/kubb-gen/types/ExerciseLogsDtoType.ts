export type ExerciseLogsDtoType = {
  /**
   * @description Unique identifier of the log
   * @type string
   */
  id: string
  /**
   * @description Highest number of repetitions achieved
   * @type number
   */
  maxRepeat: number
  /**
   * @description Highest number of sets achieved
   * @type number
   */
  maxSeries: number
  /**
   * @description Average rest time between sets (in seconds)
   * @type number
   */
  averageRestTime: number
  /**
   * @description Additional notes or observations about the exercise log
   * @type string
   */
  notes: string
  /**
   * @description Timestamp when the log was created
   * @type string, date-time
   */
  createdAt: Date
}
