export type WorkoutDtoType = {
  /**
   * @description Unique identifier for the workout
   * @type string
   */
  id: string
  /**
   * @description Unique identifier for the user who created the workout
   * @type string
   */
  userId: string
  /**
   * @description The name of the workout
   * @type string
   */
  name: string
  /**
   * @description A brief description of the workout
   * @type string
   */
  description: string
  /**
   * @description An icon representing the workout
   * @type string
   */
  icon: string
  /**
   * @description A color representing the workout icon
   * @type string
   */
  color: string
  /**
   * @description URL of the workout banner image
   * @type string
   */
  bannerUrl: string
  /**
   * @description Blur hash representation of the banner image for preview purposes
   * @type string
   */
  bannerBlurHash: string
  /**
   * @description Date when the workout was created
   * @type string
   */
  createdAt: string
  /**
   * @description Date when the workout was last updated
   * @type string | undefined
   */
  updatedAt?: string | undefined
  /**
   * @description Total number of exercises in the workout
   * @type number
   */
  totalExercises: number
  /**
   * @description Total number of sets in the workout
   * @type number
   */
  totalSets: number
  /**
   * @description Total number of repetitions in the workout
   * @type number
   */
  totalRepetitions: number
}
