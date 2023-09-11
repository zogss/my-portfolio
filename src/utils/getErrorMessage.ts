export const getErrorMessage = (
  error?: any,
  setValidationErrors?: (errors: { rule: string; field: string; message: string }[]) => void
): string | void => {
  if (error?.response?.data?.errors?.length && setValidationErrors) {
    const errors = error?.response?.data?.errors
    setValidationErrors(errors)
  } else {
    if (error?.response?.data?.errors?.length) {
      return error.response.data?.errors[0].message.replace(/.*?:\s?/, '')
    } else if (error?.response?.data?.message || error?.response?.message || error?.message) {
      return error?.response?.data?.message || error?.response?.message || error?.message
    }
    return 'An error occurred'
  }
}
