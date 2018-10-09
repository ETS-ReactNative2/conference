import { batchActions } from 'redux-batch-enhancer'
import { getErrorDataFromNetworkException } from '../common/utils'
import * as globalActions from '../global/actions'
import { LOAD_SCHEDULE, LOAD_SCHEDULE_SUCCESS, LOAD_SCHEDULE_ERROR } from './action-types'
import { scheduleService } from '../services'

export const fetchConferenceScheduleSuccess = schedule => ({
  type: LOAD_SCHEDULE_SUCCESS,
  schedule
})

export const fetchConferenceSchedule = () => async dispatch => {
  try {
    dispatch({ type: LOAD_SCHEDULE })
    const mappedSchedule = await scheduleService.fetchSchedule()
    dispatch(fetchConferenceScheduleSuccess(mappedSchedule))
  } catch (err) {
    const errorData = getErrorDataFromNetworkException(err)
    dispatch(batchActions([globalActions.showAlertError(errorData.errorMessage), { type: LOAD_SCHEDULE_ERROR }]))
  }
}
