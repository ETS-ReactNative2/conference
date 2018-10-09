import axios from 'axios'
import { decamelizeKeys } from 'humps'
import { storageService } from '../services'
import Config from 'react-native-config'

const TOKEN_NAME = 'AUTH-TOKEN'

export async function signup ({ email, password }) {
  return axios.post('/api/users/', { email, password })
}

export async function fetchProfessionals (filters) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.get('/api/professionals/', {
    params: filters,
    paramsSerializer: params => transformRequestOptions(params),
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
  })
}

export async function fetchJobs (filters) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.get('/api/jobs/', {
    params: filters,
    paramsSerializer: params => transformRequestOptions(params),
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
  })
}

export async function sendMessage ({ investorId, message }) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.post(`/api/investors/${investorId}/messages/`, decamelizeKeys({ message }), {
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
  })
}

export async function sendContact ({ message }) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.post(`/api/contact/messages/`, decamelizeKeys({ message }), {
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

export async function createJob (job) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.post(
    '/api/my_project/jobs/',
    decamelizeKeys(job),
    {
      headers: {
        'X-Authorization': `Bearer ${token}`
      }
    })
}

export async function updateJob (id, job) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.put(
    `/api/my_project/jobs/${id}/`,
    decamelizeKeys(job),
    {
      headers: {
        'X-Authorization': `Bearer ${token}`
      }
    })
}

export async function createOrUpdateConferenceUser ({ firstName, lastName, company, linkedin, telegram }) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.put(
    '/api/my_person/',
    decamelizeKeys({ firstName, lastName, company, linkedin, telegram }),
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
  name,
  productStage,
  tagline,
  tokenType,
  fundraisingAmount,
  github,
  news,
  telegram,
  twitter,
  website,
  whitepaper,
  region,
  regionOtherText,
  imageUrl
}) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.put('/api/my_project/', decamelizeKeys({
    description,
    fundingStage,
    fundraisingAmount,
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
    regionOtherText,
    imageUrl
  }), {
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
  })
}

export async function createInvestor ({
  fundingStages,
  ticketSizes,
  productStages,
  tokenTypes,
  giveaways,
  region,
  nationality,
  regionOtherText
}) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.put('/api/my_investor/', decamelizeKeys({
    fundingStages,
    ticketSizes,
    productStages,
    tokenTypes,
    giveaways,
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

export async function deleteMyProjectJobsId ({ id }) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.delete('/api/my_project/jobs/' + id + '/', {
    headers: {
      'X-Authorization': `Bearer ${token}`
    }
  })
}

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

export async function uploadImage (file) {
  const token = await storageService.getItem(TOKEN_NAME)
  const bodyFormData = new FormData()
  bodyFormData.append('image', {
      uri: file.uri,
      type: 'image/jpeg',
      name: 'testPhotoName.jpg'
    }
  )
  let fetchResponse = ''
  try {
    fetchResponse = await fetch(Config.APP_AXIOS_BASE_URL + '/api/my_person/images/', {
      method: 'post',
      body: bodyFormData,
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'X-Authorization': `Bearer ${ token }`
      }
    })
  } catch (err) {
    throw err;
  }
  if (!fetchResponse.ok) {
    throw {
      response: {
        status: 500
      }
    }
  }
}

// Fetch default filter Options
export async function fetchInvestorFilter () {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.get('/api/investors/defaults/', {
    headers: {
      'X-Authorization': `Bearer ${ token }`,
      Accept: 'application/json'
    }
  })
}

export async function fetchProjectFilter () {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.get('/api/projects/defaults/', {
    headers: {
      'X-Authorization': `Bearer ${ token }`,
      Accept: 'application/json'
    }
  })
}

export async function fetchProfessionalFilter () {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.get('/api/professionals/defaults/', {
    headers: {
      'X-Authorization': `Bearer ${ token }`,
      Accept: 'application/json'
    }
  })
}

export async function fetchJobsFilter () {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.get('/api/jobs/defaults/', {
    headers: {
      'X-Authorization': `Bearer ${ token }`,
      Accept: 'application/json'
    }
  })
}

export async function deleteProjectJob (jobId) {
  const token = await storageService.getItem(TOKEN_NAME)
  return axios.delete(`/api/my_project/jobs/${jobId}/`, {
    headers: {
      'X-Authorization': `Bearer ${ token }`,
      Accept: 'application/json'
    }
  })
}
