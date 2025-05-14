import { createPhysical } from './createPhysical'
import { findPhysicalStatsByUserId } from './findPhysicalStatsByUserId'
import { updatePhysical } from './updatePhysical'

export function physicalController() {
  return { createPhysical, updatePhysical, findPhysicalStatsByUserId }
}
