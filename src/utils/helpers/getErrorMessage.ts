type ErrorType = {
  response?: {
    data?: {
      errors?: {
        message: string
      }[]
      message?: string
    }
    message?: string
  }
  message?: string
}

type GetErrorMessageType = (error?: unknown) => string | undefined

export const getErrorMessage: GetErrorMessageType = (err) => {
  const error = err as ErrorType

  if (error?.response?.data?.errors?.length) {
    return error.response.data.errors[0].message.replace(/.*?:\s?/, '')
  } else if (error?.response?.data?.message || error?.response?.message || error?.message) {
    return error?.response?.data?.message || error?.response?.message || error?.message
  }
}
