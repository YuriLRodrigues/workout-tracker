import { createExercise } from './createExercise'
import { deleteExercise } from './deleteExercise'
import { findAllExercisesByWorkoutId } from './findAllExercisesByWorkoutId'
import { findExerciseById } from './findExerciseById'
import { updateExercise } from './updateExercise'

export function exerciseController() {
  return { createExercise, deleteExercise, findExerciseById, findAllExercisesByWorkoutId, updateExercise }
}
