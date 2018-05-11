const axios = require('axios')
const config = require('./config')

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
  requestPickup: async (user, loc, trip) => {
    // do uber pickup
    console.log(user, loc, trip)
  },
  getEstimate: async (startLng, startLat, endLng, endLat, sessionID) => {
    let result = null
    let carID = null
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
      for (let car of result.data.products) {
        if (car.product_group === 'uberx') {
          carID = car.product_id
        }
      }
    } catch (e) {
      console.log('uber getEstimate products', e.response.data)
      throw new Error('Error with request')
    }

    if (carID === null) {
      throw new Error('No uberx found')
    }

    // get time estimate for pickup
    try {
      result = await uberInstance.get('estimates/time', {
        params: {
          start_longitude: startLng,
          start_latitude: startLat,
          product_id: carID
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
          product_id: carID
        },
        headers: {common: {'Authorization': 'Bearer ' + user.token.access_token}}
      })
      if (result.data.prices.length > 0) {
        for (let price of result.data.prices) {
          if (price.product_id === carID) {
            priceRange = price.estimate
          }
        }
      }
    } catch (e) {
      console.log('uber getEstimate price', e.response.data)
      throw new Error('Error with request')
    }
    const output = {
      productID: carID,
      pickupTime: pickupTime,
      estimate: priceRange
    }
    return output
  }
}

module.exports = API
