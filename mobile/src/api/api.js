import axios from 'axios'
import { decamelizeKeys } from 'humps'
import { storageService } from '../services'

const TOKEN_NAME = 'AUTH-TOKEN'

export async function signup ({ email, password, phone }) {
  return axios.post('/api/users/', { email, password, phone })
}

export async function fetchProfessionals (filters) {
  const token = await storageService.getItem(TOKEN_NAME);
  return axios.get('/api/professionals/', {
    params: filters,
    paramsSerializer: params => transformRequestOptions(params),
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
  })
}

export async function fetchProjects (filters) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.get('/api/projects/', {
    params: filters,
    paramsSerializer: params => transformRequestOptions(params),
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
  })
}

export async function fetchInvestors (filters) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.get('/api/investors/', {
    params: filters,
    paramsSerializer: params => transformRequestOptions(params),
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
  })
}

export async function fetchMyBasic () {
  const token = await storageService.getItem(TOKEN_NAME)
  return new Promise(async resolve => {
    try {
      resolve(await axios.get('/api/my_person/', {
        headers: {
          'X-Authorization': `Bearer ${token}`
        }
      }))
    } catch (ex) {
      resolve({ data: null })
    }
  })
}

export async function fetchMyProfile () {
  const token = await storageService.getItem(TOKEN_NAME)
  return new Promise(async resolve => {
    try {
      resolve(await axios.get('/api/my_professional/', {
        headers: {
          'X-Authorization': `Bearer ${token}`
        }
      }))
    } catch (ex) {
      resolve({ data: null })
    }
  })
}

export async function fetchMyProject () {
  const token = await storageService.getItem(TOKEN_NAME)
  return new Promise(async resolve => {
    try {
      resolve(await axios.get('/api/my_project/', {
        headers: {
          'X-Authorization': `Bearer ${token}`
        }
      }))
    } catch (ex) {
      resolve({ data: null })
    }
  })
}

export async function fetchMyInvestor () {
  const token = await storageService.getItem(TOKEN_NAME)
  return new Promise(async resolve => {
    try {
      resolve(await axios.get('/api/my_investor/', {
        headers: {
          'X-Authorization': `Bearer ${token}`
        }
      }))
    } catch (ex) {
      resolve({ data: null })
    }
  })
}

export async function reactivateProfile () {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.post('/api/my_professional/reactivate/', {}, {
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
  })
}

export async function deactivateProfile () {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.post('/api/my_professional/deactivate/', {}, {
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
  })
}

export async function reactivateInvestor () {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.post('/api/my_investor/reactivate/', {}, {
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
  })
}

export async function deactivateInvestor () {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.post('/api/my_investor/deactivate/', {}, {
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
  })
}

export async function leaveProject () {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.post('/api/my_project/leave/', {}, {
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
  })
}

export async function createJob ({
  role, skillsText, city, country, link, description, partTime, localRemoteOptions, payments, project
}) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.post(
    '/api/my_project/jobs/',
    decamelizeKeys({
      role,
      skillsText,
      city,
      country,
      link,
      description,
      partTime,
      localRemoteOptions,
      payments,
      project
    }),
    {
      headers: {
        'X-Authorization': `Bearer ${token}`
      }
    })
}

export async function createOrUpdateConferenceUser ({ firstName, lastName, title, company, twitter, facebook, linkedin, telegram }) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.put(
    '/api/my_person/',
    decamelizeKeys({ firstName, lastName, title, company, twitter, facebook, linkedin, telegram }),
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
  whitepaper,
  region,
  regionOtherText
}) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.put('/api/my_project/', decamelizeKeys({
    description,
    industry,
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
    whitepaper,
    region,
    regionOtherText
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
  return axios.put('/api/my_investor/', decamelizeKeys({
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

export async function putMyProfessional ({
  role, roleOtherText, skillsText, traitsText, knowMost, relocate, remote, country, city, age, experience
}) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.put('/api/my_professional/', decamelizeKeys({
    role,
    roleOtherText,
    skillsText,
    traitsText,
    knowMost,
    relocate,
    remote,
    country,
    city,
    age,
    experience
  }), {
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
  })
}

export async function getMyProjectJobs () {
  const token = storageService.getItem(TOKEN_NAME)
  return axios.get('/api/my_project/jobs/', {
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
  })
}

// todo postMyProjectJobs

export async function deleteMyProjectJobsId ({ id }) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.delete('/api/my_project/jobs/' + id + '/', {
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
  })
}

// todo getMyProjectJobsId

// todo putMyProjectJobsId

export async function getMyProjectMembers () {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.get('/api/my_project/members/', {
    headers: {
      'X-Authorization': `Bearer ${token}`,
      Accept: 'application/json'
    }
  })
}

export async function postMyProjectMembers ({ email }) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.post(
    '/api/my_project/members/',
    decamelizeKeys({ email }),
    {
      headers: {
        'X-Authorization': `Bearer ${token}`
      }
    })
}

export async function deleteMyProjectMembersId ({ id }) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.delete('/api/my_project/members/' + id + '/', {
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
  })
}

export async function getProfessionals (filters) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.get('/api/professionals/', {
    params: filters,
    paramsSerializer: params => transformRequestOptions(params),
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
  return axios.get('/schedule/', {
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
