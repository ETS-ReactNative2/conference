import axios from 'axios'
import { camelizeKeys, decamelizeKeys } from 'humps'

axios.defaults.transformResponse = [
  ...axios.defaults.transformResponse,
  data => camelizeKeys(data)
]

const baseURL = 'http://18.219.97.90:8000'

export async function signup ({ email, password, phone }) {
  return axios.post(baseURL + '/api/users/', { email, password, phone })
}

export async function login ({ email, password }) {
  return axios.post('/auth/login', { email, password })
}

export async function fetchProjects() {
  return axios.get(baseURL + '/api/projects')
}

export async function fetchInvestors() {
  return axios.get(baseURL + '/api/investors')
}

export async function createConferenceUser ({ name, title, company, twitter, facebook }) {
  return axios.post(baseURL + '/api/users/', {
    name, title, company, twitter, facebook
  })
}

export async function createInvestee ({
  country, description, fundingStage, giveaway, notable, name, productStage, tagline, tokenType
}) {
  return axios.post(baseURL + '/api/projects/', decamelizeKeys({
    country,
    description,
    fundingStage,
    giveaway,
    notable,
    name,
    productStage,
    tagline,
    tokenType
  }))
}

export async function createInvestor ({
  country, description, fundingStage, maxTickets, minTickets, name, productStages, tagline, tokenTypes
}) {
  return axios.post(baseURL + '/api/investors/', decamelizeKeys({
    country,
    description,
    fundingStage,
    maxTickets,
    minTickets,
    name,
    productStages,
    tagline,
    tokenTypes
  }))
}
