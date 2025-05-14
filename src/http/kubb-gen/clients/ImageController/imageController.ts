import { deleteImage } from './deleteImage'
import { updateImage } from './updateImage'
import { uploadImage } from './uploadImage'

export function imageController() {
  return { uploadImage, deleteImage, updateImage }
}
