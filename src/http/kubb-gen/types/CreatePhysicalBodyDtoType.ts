export type CreatePhysicalBodyDtoType = {
  /**
   * @description Height in centimeters
   * @minLength 30
   * @type number
   */
  height: number
  /**
   * @description Weight in kilograms
   * @minLength 1
   * @type number
   */
  weight: number
  /**
   * @description Age in years
   * @minLength 1
   * @maxLength 120
   * @type number
   */
  age: number
  /**
   * @description Body fat percentage (optional)
   * @minLength 1
   * @maxLength 100
   * @type number
   */
  bodyFat?: (number | null) | undefined
  /**
   * @description Muscle mass in kilograms (optional)
   * @minLength 1
   * @type number
   */
  muscleMass?: (number | null) | undefined
  /**
   * @description User goal, such as \"Lose weight\", \"Gain muscle\", etc.
   * @type string
   */
  goal: string
}
