import * as api from '../api/api'

export const fetchProfileInfo = () => {
  return Promise.all([
    api.fetchMyProject(),
    api.fetchMyInvestor(),
    api.fetchMyProfile(),
    api.fetchMyBasic()
  ])
}