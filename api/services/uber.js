const axios = require('axios')
const querystring = require('querystring')
const cache = require('./cache')
const uuid = require('uuid/v4')
const db = require('./db')
const config = require('../config')

const uberInstance = axios.create()

uberInstance.interceptors.request.use((reqConfig) => {
  if (reqConfig.url.indexOf('https://') === -1) {
    reqConfig.url = config.UberEndPoint + reqConfig.url
  }
  // somehow an auth header was set here? 'Authorization: Bearer oijsdfoisdofiusodifus'
  let token = null
  if (reqConfig.data && reqConfig.data.token) {
    token = reqConfig.data.token
    reqConfig.headers['Authorization'] = 'Bearer ' + token
  }
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
      console.log('uber token request', e.response.data.error)
      return null
    }
    const sessionID = uuid()
    const token = result.data.access_token

    // get profile
    const profile = await API.profile(token)
    profile.token = result.data
    if (profile === null) {
      return null
    }
    // check if user is in mongo
    await db.createUser(profile)
    // store user profile in redis
    await cache.setAsync('session_' + sessionID, JSON.stringify(profile), 'EX', result.data.expires_in)
    return {sessionID: sessionID, expiresIn: result.data.expires_in}
  },

  profile: async token => {
    let result = null
    try {
      result = await uberInstance.get('me', {headers: {common: {'Authorization': 'Bearer ' + token}}})
    } catch (e) {
      console.log('uber profile request', e.response.data)
      return null
    }
    return result.data
  },

  getUser: async sessionID => {
    try {
      const result = await cache.getAsync('session_' + sessionID)
      if (result === null) return false

      return JSON.parse(result)
    } catch (e) {
      console.log('uber getUser check cache', e)
      return false
    }
  },

  logout: async sessionID => {
    try {
      await cache.delAsync('session_' + sessionID)
    } catch (e) {
      console.log('logout del cache', e)
      throw new Error('Unable to process request')
    }
  },

  getEstimate: async (startLng, startLat, endLng, endLat, sessionID) => {
    let result = null
    let car = null
    let pickupTime = null
    let priceRange = null

    // check for user session
    let user = await API.getUser(sessionID)
    if (user === false) throw new Error('Invalid auth')

    // get products for lng lat
    try {
      result = await uberInstance.get('products', {
        params: {
          longitude: startLng,
          latitude: startLat
        },
        headers: {common: {'Authorization': 'Bearer ' + user.token.access_token}}
      })
      for (let product of result.data.products) {
        if (product.product_group === 'uberx') {
          car = product
        }
      }
    } catch (e) {
      console.log('uber getEstimate products', e.response.data)
      throw new Error('Error with request')
    }

    if (car === null) {
      if (result.data.products.length > 0) {
        car = result.data.products[0]
      } else {
        throw new Error('No uber found')
      }
    }

    // get time estimate for pickup
    try {
      result = await uberInstance.get('estimates/time', {
        params: {
          start_longitude: startLng,
          start_latitude: startLat,
          product_id: car.product_id
        },
        headers: {common: {'Authorization': 'Bearer ' + user.token.access_token}}
      })
      if (result.data.times.length > 0) {
        // in seconds
        pickupTime = result.data.times[0].estimate
      }
    } catch (e) {
      console.log('uber getEstimate time', e.response.data)
      throw new Error('Error with request')
    }

    if (pickupTime === null) {
      throw new Error('No uberx available')
    }

    // get price estimate for trip
    try {
      result = await uberInstance.get('estimates/price', {
        params: {
          start_longitude: startLng,
          start_latitude: startLat,
          end_longitude: endLng,
          end_latitude: endLat,
          product_id: car.product_id
        },
        headers: {common: {'Authorization': 'Bearer ' + user.token.access_token}}
      })
      if (result.data.prices.length > 0) {
        for (let price of result.data.prices) {
          if (price.product_id === car.product_id) {
            priceRange = price.estimate
          }
        }
      }
    } catch (e) {
      console.log('uber getEstimate price', e.response.data)
      throw new Error('Error with request')
    }
    const output = {
      productID: car.product_id,
      productImage: car.image,
      productName: car.display_name,
      pickupTime: pickupTime,
      estimate: priceRange
    }
    return output
  }
}

module.exports = API
