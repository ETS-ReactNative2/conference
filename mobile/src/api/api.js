import axios from 'axios'
import { decamelizeKeys } from 'humps'
import { storageService } from '../services';

const TOKEN_NAME = 'AUTH-TOKEN';

export async function signup ({ email, password, phone }) {
  return axios.post('/api/users/', { email, password, phone })
}

export async function fetchProjects() {
  const token = await storageService.getItem(TOKEN_NAME);
  return axios.get('/api/projects', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}

export async function fetchInvestors() {
  const token = await storageService.getItem(TOKEN_NAME);
  return axios.get('/api/investors', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}

export async function createConferenceUser ({ firstName, lastName, title, company, twitter, facebook, linkedin, telegram }) {
  return axios.post('/api/users/', decamelizeKeys({
    firstName, lastName, title, company, twitter, facebook, linkedin, telegram
  }))
}

export async function createInvestee ({
  country, description, fundingStage, giveaway, notable, name, productStage, tagline, tokenType
}) {
  const token = await storageService.getItem(TOKEN_NAME);
  return axios.post('/api/projects/', decamelizeKeys({
    country,
    description,
    fundingStage,
    giveaway,
    notable,
    name,
    productStage,
    tagline,
    tokenType
  }), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}

export async function createInvestor ({
  country, description, fundingStage, ticketSizes, name, productStages, tagline, tokenTypes
}) {
  const token = await storageService.getItem(TOKEN_NAME);
  return axios.post('/api/investors/', decamelizeKeys({
    country,
    description,
    fundingStage,
    ticketSizes,
    name,
    productStages,
    tagline,
    tokenTypes
  }), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
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

export async function fetchConferenceSchedule() {
  return axios.get('/schedule', { headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }})
}

export async function login(username, password) {
  return axios.post('/api-token-auth/', {
    username,
    password
  }, { headers: {
     Accept: 'application/json',
    'Content-Type': 'application/json'
  }})
}