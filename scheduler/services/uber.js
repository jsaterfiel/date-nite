const axios = require('axios')
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
  requestPickup: async (user, loc, trip) => {
    // find product
    let result
    let car = null
    try {
      console.log({
        longitude: trip.location.coordinates[0],
        latitude: trip.location.coordinates[1]
      })
      result = await uberInstance.get('products', {
        params: {
          longitude: trip.location.coordinates[0],
          latitude: trip.location.coordinates[1]
        },
        headers: {common: {'Authorization': 'Bearer ' + user.token.access_token}}
      })
      console.log(result.data)
      for (let product of result.data.products) {
        if (product.product_group === 'uberx') {
          car = product
        }
      }
    } catch (e) {
      console.log('uber requestPickup products', e.response.data)
      throw new Error('Error with request')
    }

    if (car === null) {
      if (result.data.products.length > 0) {
        car = result.data.products[0]
      } else {
        throw new Error('No uber found')
      }
    }

    // request estimate (post)
    let fareID = null
    try {
      result = await uberInstance.post('requests/estimate', {
        product_id: car.product_id,
        start_longitude: trip.location.coordinates[0],
        start_latitude: trip.location.coordinates[1],
        end_longitude: loc.location.coordinates[0],
        end_latitude: loc.location.coordinates[1]
      },
      {headers: {common: {'Authorization': 'Bearer ' + user.token.access_token}}})
      if (result.data.fare) {
        fareID = result.data.fare.fare_id
      }
    } catch (e) {
      console.log('uber requestPickup requests estimate', e.response.data)
      throw new Error('Error with request')
    }

    if (fareID === null) {
      throw new Error('Unable to request fair due to surge pricing')
    }

    // request (post)
    try {
      result = await uberInstance.post('requests', {
        fare_id: fareID,
        product_id: car.product_id,
        start_longitude: trip.location.coordinates[0],
        start_latitude: trip.location.coordinates[1],
        end_longitude: loc.location.coordinates[0],
        end_latitude: loc.location.coordinates[1]
      },
      {headers: {common: {'Authorization': 'Bearer ' + user.token.access_token}}})
      console.log('request', result.data)
      if (result.data.request_id === undefined || result.data.product_id === undefined) {
        throw new Error(`failed to schedule the trip_id: ${trip._id}`, result.data)
      } else {
        console.log(`Scheduled trip - trip_id:${trip._id}, request_id:${result.data.request_id}, product_id:${result.data.product_id}`)
      }
    } catch (e) {
      console.log('uber requestPickup requests', e.response.data)
      throw e
    }
    return true
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
