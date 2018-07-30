import { SET_LOADING, UNSET_LOADING } from './action-types'

const initialState = {
  isLoading: false,
  loadingMessage: 'Loading...',
}

export function globalReducer (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
        loadingMessage: action.data.message
      }
    case UNSET_LOADING:
      return {
        ...state,
        isLoading: false,
        message: ''
      }
    default:
      return state;
  }
}
