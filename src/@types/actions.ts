import { CustomError } from './custom-error'

export type ActionResponse<T> = {
  success: boolean
  error?: CustomError['error']['error']
  data: T | Error | null
}
