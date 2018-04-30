const axios = require('axios')
const querystring = require('querystring')
const redis = require('redis')
const bluebird = require('bluebird')
const uuid = require('uuid/v4')
const db = require('./db')
const config = require('../config')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const uberInstance = axios.create()
const cache = redis.createClient({url: 'redis://redis:6379'})

uberInstance.interceptors.request.use((reqConfig) => {
  if (reqConfig.url.indexOf('https://') === -1) {
    reqConfig.url = config.UberEndPoint + reqConfig.url
  }
  // somehow an auth header was set here? 'Authorization: Bearer oijsdfoisdofiusodifus'
  let token = null
  if (reqConfig.data && reqConfig.data.token) {
    console.log('token found')
    token = reqConfig.data.token
    reqConfig.headers['Authorization'] = 'Bearer ' + token
  }
  console.log('header', reqConfig.headers)
  return reqConfig
})

const API = {
  auth: async accessCode => {
    let result = null
    try {
      result = await uberInstance.post(config.UberAuthEndPoint, querystring.stringify({
        'client_id': config.UberClientID,
        'client_secret': config.UberClientSecret,
        'grant_type': 'authorization_code',
        'redirect_uri': 'http://localhost/sign-up',
        'code': accessCode
      }))
    } catch (e) {
      console.log('token request', e.response.data.error)
      return null
    }
    console.log('token', result.data.access_token)
    const sessionID = uuid()
    const token = result.data.access_token
    // get profile
    const profile = await API.profile(token)
    if (profile === null) {
      return null
    }
    // check if user is in mongo
    await db.createUser(profile)
    // store user profile in redis
    console.log('redis key', 'session_' + sessionID)
    await cache.setAsync('session_' + sessionID, JSON.stringify(profile), 'EX', result.data.expires_in)
    return sessionID
  },

  profile: async token => {
    let result = null
    try {
      result = await uberInstance.get('me', {headers: {common: {'Authorization': 'Bearer ' + token}}})
    } catch (e) {
      console.log('profile request', e.response.data)
      return null
    }
    console.log('profile', result.data)
    return result.data
  }
}

module.exports = API
