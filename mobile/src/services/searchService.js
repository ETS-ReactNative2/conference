import * as api from '../api/api'

export const fetchDefaults = () => {
  return Promise.all([
    api.fetchProjects({ defaults: true }),
    api.fetchInvestors({ defaults: true }),
    api.fetchProfessionals({ default: true })
  ])
}

export const fetchMatches = (projectFilters, investorFilters, professionalFilters, jobFilters) => {
  return Promise.all([
    api.fetchProjects(projectFilters),
    api.fetchInvestors(investorFilters),
    api.fetchProfessionals(professionalFilters),
    api.fetchJobs(jobFilters)
  ])
}