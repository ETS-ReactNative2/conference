import axios from 'axios/index'
import {camelizeKeys} from 'humps'
import Config from 'react-native-config'
import { navigationService } from '../services'
import { PAGES_NAMES } from '../navigation'

export default () => {
  axios.defaults.baseURL = Config.APP_AXIOS_BASE_URL
  // Needs to be set in order for cookies to be sent to the server after auth
  axios.defaults.withCredentials = Config.APP_AXIOS_WITH_CREDENTIALS
  axios.defaults.transformResponse = [
    ...axios.defaults.transformResponse,
    data => camelizeKeys(data)
  ],
  axios.interceptors.response.use(response => response, error => {
    const networkError = error.response === undefined && error.message === 'Network Error'
    const url = error.response === undefined ? '' : error.response.config.url
    if (!networkError && error.response.status === 401 && !url.includes('api-token-auth')) {
      navigationService.navigate(PAGES_NAMES.LOGIN_PAGE)
      return
    }
    return Promise.reject(error)
  })
}
