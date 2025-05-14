export type CustomError = {
  error: {
    statusCode: 404
    error:
      | 'Invalid credentials'
      | 'Resource not found'
      | 'Resource already exists'
      | 'Not allowed'
      | 'Inactive resource'
      | 'Invalid image type'
  }
  status: number
  statusText: string
}

export type CustomFetchError = {
  response: CustomError
}
