export const updatePersonalInfoBodyDtoGenderEnum = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  NON_BINARY: 'NON_BINARY',
  TRANSGENDER: 'TRANSGENDER',
  PREFER_NOT_TO_SAY: 'PREFER_NOT_TO_SAY',
  OTHER: 'OTHER',
} as const

export type UpdatePersonalInfoBodyDtoGenderEnumType =
  (typeof updatePersonalInfoBodyDtoGenderEnum)[keyof typeof updatePersonalInfoBodyDtoGenderEnum]

export type UpdatePersonalInfoBodyDtoType = {
  /**
   * @description The user\'s first name
   * @type string | undefined
   */
  name?: string | undefined
  /**
   * @description The user\'s last name
   * @type string | undefined
   */
  lastName?: string | undefined
  /**
   * @description The user phone number
   * @type string | undefined
   */
  phone?: string | undefined
  /**
   * @description The user birth date (YYYY-MM-DD)
   * @type string | undefined, date-time
   */
  birthDate?: Date | undefined
  /**
   * @description The user gender
   * @type string | undefined
   */
  gender?: UpdatePersonalInfoBodyDtoGenderEnumType | undefined
}
