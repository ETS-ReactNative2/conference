import I18n from '../../locales/i18n'

const isNetworkUnavailable = err => {
  return (err.response === undefined && err.message === "Network request failed") || (err.response === undefined && err.message === 'Network Error')
}
  
const getErrorDataFromNetworkException = err => {
  let errorMessage = ''
  let isFieldError = false
  const noInternetAccess = isNetworkUnavailable(err)
  if (noInternetAccess) {
    errorMessage = I18n.t('common.errors.no_internet_connection')
  } else {
    const isInternalServerError = err.response.status >= 500
    const isInvalidRequestError = err.response.status === 400
    const errorCode = err.response.data
    if (isInternalServerError) {
      errorMessage = I18n.t('common.errors.server_error')
    } else if (isInvalidRequestError) {
      errorMessage = I18n.t('common.errors.incorrect_request')
    } else {
      errorMessage = I18n.t(`common.errors.${errorCode}`)
      isFieldError = true
    }
  }
  return {
    errorMessage,
    isFieldError
  }
}

const isInternetAvailable = async () => {
  try {
    const response = await fetch('https://www.google.com')
    return response.status === 200
  } catch (err) {
    return !isNetworkUnavailable(err)
  }
}

export { isInternetAvailable, isNetworkUnavailable, getErrorDataFromNetworkException }