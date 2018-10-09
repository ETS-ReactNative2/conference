import * as api from '../api/api'

export const fetchFilters = () => {
  return Promise.all([
    api.fetchInvestorFilter(),
    api.fetchProjectFilter(),
    api.fetchProfessionalFilter(),
    api.fetchJobsFilter(),
  ])
}