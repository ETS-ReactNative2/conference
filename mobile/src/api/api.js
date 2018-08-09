import axios from 'axios'
import { decamelizeKeys } from 'humps'
import { storageService } from '../services'

const TOKEN_NAME = 'AUTH-TOKEN'

export async function signup ({ email, password, phone }) {
  return axios.post('/api/users/', { email, password, phone })
}

export async function fetchProjects (filters) {
  const token = await storageService.getItem(TOKEN_NAME)
  console.log(token)
  return axios.get('/api/projects', {
    params: filters,
    paramsSerializer: params => transformRequestOptions(params),
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
  })
}

export async function fetchInvestors (filters) {
  const token = await storageService.getItem(TOKEN_NAME)
  console.log(token)
  return axios.get('/api/investors', {
    params: filters,
    paramsSerializer: params => transformRequestOptions(params),
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
  })
}

export async function createConferenceUser ({ firstName, lastName, title, company, twitter, facebook, linkedin, telegram, userId }) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.post(
    '/api/create_update_person/',
    decamelizeKeys({ firstName, lastName, title, company, twitter, facebook, linkedin, telegram, userId }),
    {
      headers: {
        'X-Authorization': `Bearer ${token}`
      }
    })
}

export async function createInvestee ({
  description,
  fundingStage,
  giveaway,
  notable,
  size,
  industry,
  name,
  productStage,
  tagline,
  tokenType,
  fundraisingAmount,
  github,
  legalCountry,
  mainCountry,
  news,
  telegram,
  twitter,
  website,
  whitepaper
}) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.post('/api/create_update_project/', decamelizeKeys({
    description,
    fundingStage,
    fundraisingAmount,
    legalCountry,
    mainCountry,
    github,
    giveaway,
    notable,
    name,
    productStage,
    size,
    tagline,
    tokenType,
    news,
    telegram,
    twitter,
    website,
    whitepaper
  }), {
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
  })
}

export async function createInvestor ({
  fundingStages, ticketSizes, productStages, tokenTypes, giveaways, industries, region, nationality, regionOtherText
}) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.post('/api/create_update_investor/', decamelizeKeys({
    fundingStages,
    ticketSizes,
    productStages,
    tokenTypes,
    giveaways,
    industries,
    region,
    nationality,
    regionOtherText
  }), {
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
  })
}

export async function fetchNotifications () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // For testing errors
      Math.random() >= 0.5 ?
        reject('error') :
        resolve({
          data: [
            {
              id: 1,
              title: 'New olaboga',
              content: 'Datata lorem ipsum lorem ipsum',
              time: new Date(),
              isRead: false
            },
            {
              id: 2,
              title: 'New olaboga',
              content: 'Datata lorem ipsum lorem ipsum',
              time: new Date(),
              isRead: false
            }
          ]
        })
    }, 3000)
  })
}

const transformRequestOptions = params => {
  let options = ''
  for (const key in params) {
    if (typeof params[ key ] !== 'object') {
      options += `${key}=${params[ key ]}&`
    } else if (typeof params[ key ] === 'object' && params[ key ].length) {
      params[ key ].forEach(el => {
        options += `${key}=${el}&`
      })
    }
  }
  return options ? options.slice(0, -1) : options
}

export async function fetchConferenceSchedule () {
  return axios.get('/schedule', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
}

export async function login (username, password) {
  return axios.post('/api-token-auth/', {
    username,
    password
  }, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}
