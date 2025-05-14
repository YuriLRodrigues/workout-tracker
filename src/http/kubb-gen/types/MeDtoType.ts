export const meDtoGenderEnum = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  NON_BINARY: 'NON_BINARY',
  TRANSGENDER: 'TRANSGENDER',
  PREFER_NOT_TO_SAY: 'PREFER_NOT_TO_SAY',
  OTHER: 'OTHER',
} as const

export type MeDtoGenderEnumType = (typeof meDtoGenderEnum)[keyof typeof meDtoGenderEnum]

export type MeDtoType = {
  /**
   * @description User ID
   * @type string
   */
  id: string
  /**
   * @description User role
   * @type string
   */
  role: string
  /**
   * @description User name
   * @type string
   */
  name: string
  /**
   * @description User last name
   * @type string
   */
  lastName: string
  /**
   * @description User email
   * @type string
   */
  email: string
  /**
   * @description User phone number
   * @type string
   */
  phone?: (string | null) | undefined
  /**
   * @description User birth date (YYYY-MM-DD)
   * @type string, date-time
   */
  birthDate?: (Date | null) | undefined
  /**
   * @description User gender
   * @type string
   */
  gender?: (MeDtoGenderEnumType | null) | undefined
  /**
   * @description Avatar image URL
   * @type string
   */
  avatar?: (string | null) | undefined
  /**
   * @description BlurHash for avatar image
   * @type string
   */
  blurHash?: (string | null) | undefined
  /**
   * @description Date the user was created
   * @type string, date-time
   */
  createdAt: Date
}
