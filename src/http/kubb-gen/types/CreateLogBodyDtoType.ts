export type CreateLogBodyDtoType = {
  /**
   * @description Unique identifier of the session
   * @type string
   */
  sessionId?: (string | null) | undefined
  /**
   * @description Average rest time between sets (in seconds)
   * @type number
   */
  averageRestTime: number
  /**
   * @description Maximum number of repetitions achieved
   * @type number
   */
  maxRepeat: number
  /**
   * @description Maximum number of sets achieved
   * @type number
   */
  maxSeries: number
  /**
   * @description Maximum weight lifted (in kilograms)
   * @type number
   */
  maxWeight: number
  /**
   * @description Indicates the perceived level of effort during the workout.
   * @type number
   */
  effortLevel: number
  /**
   * @description Optional notes or observations about the log
   * @type string | undefined
   */
  notes?: string | undefined
}
