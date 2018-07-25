import axios from 'axios'
import { decamelizeKeys } from 'humps'

export async function signup ({ email, password, phone }) {
  return axios.post('/api/users/', { email, password, phone })
}

export async function login ({ email, password }) {
  return axios.post('/auth/login', { email, password })
}

export async function fetchProjects() {
  return axios.get('/api/projects')
}

export async function fetchInvestors() {
  return axios.get('/api/investors')
}

export async function createConferenceUser ({ name, title, company, twitter, facebook }) {
  return axios.post('/api/users/', {
    name, title, company, twitter, facebook
  })
}

export async function createInvestee ({
  country, description, fundingStage, giveaway, notable, name, productStage, tagline, tokenType
}) {
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
  }))
}

export async function createInvestor ({
  country, description, fundingStage, maxTickets, minTickets, name, productStages, tagline, tokenTypes
}) {
  return axios.post('/api/investors/', decamelizeKeys({
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
    Accept: 'application/json'
  }})
}