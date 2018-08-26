import { combineReducers } from 'redux'
import { globalReducer } from './global'
import { notificationsReducer } from './notifications'
import { profileReducer } from './profile'
import { searchReducer } from './search'
import { signUpReducer } from './signup'
import { scheduleReducer } from './schedule'
import { filterReducer } from './filters'

export default combineReducers({
  signUp: signUpReducer,
  search: searchReducer,
  notifications: notificationsReducer,
  global: globalReducer,
  schedule: scheduleReducer,
  profile: profileReducer,
  filter: filterReducer
})
