export type PhysicalDtoType = {
  /**
   * @description User height in centimeters
   * @type number
   */
  height: number
  /**
   * @description User weight in kilograms
   * @type number
   */
  weight: number
  /**
   * @description User age in years
   * @type number
   */
  age: number
  /**
   * @description User body fat percentage
   * @type number
   */
  bodyFat?: (number | null) | undefined
  /**
   * @description User muscle mass in kilograms
   * @type number
   */
  muscleMass?: (number | null) | undefined
  /**
   * @description User fitness goal
   * @type string
   */
  goal: string
  /**
   * @description User unique identifier
   * @type string
   */
  userId: string
  /**
   * @description Record creation timestamp
   * @type string, date-time
   */
  createdAt: Date
  /**
   * @description Record last update timestamp
   * @type string, date-time
   */
  updatedAt?: (Date | null) | undefined
}
