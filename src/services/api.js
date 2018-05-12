import Axios from 'axios'
import { Config } from '../config'

const apiInstance = Axios.create()

apiInstance.interceptors.request.use((config) => {
  config.url = Config.ApiURL + config.url
  return config
})

const API = {
  saveTrip: async (session, locID, pickupLng, pickupLat, startTime, people) => {
    let result
    try {
      result = await apiInstance.post('api/trips', {
        session: session,
        locID: locID,
        pickupLng: pickupLng,
        pickupLat: pickupLat,
        startTime: startTime, // timestamp
        people: people
      })
    } catch (e) {
      return false
    }
    return result.data
  },
  getTrips: async (session) => {
    let result
    try {
      result = await apiInstance.get('api/trips?session=' + encodeURIComponent(session))
    } catch (e) {
      return false
    }
    return result.data
  },
  cancelTrip: async (session, id) => {
    const tripID = encodeURIComponent(id)
    const sessionID = encodeURIComponent(session)
    try {
      await apiInstance.delete(`api/trips/${tripID}?session=${sessionID}`)
    } catch (e) {
      console.log('error api cancelTrip', e.message)
      return false
    }
  },
  searchLocations: async (lng, lat, radius, price) => {
    const lngStr = encodeURIComponent(lng)
    const latStr = encodeURIComponent(lat)
    const radiusStr = encodeURIComponent(radius)
    const priceStr = encodeURIComponent(price)
    try {
      const results = await apiInstance.get(`api/locations/search/${lngStr}/${latStr}/${radiusStr}/${priceStr}`)
      return results.data
    } catch (e) {
      console.log('error api searchLocations')
    }
  },
  signUp: async accessCode => {
    let result
    try {
      result = await apiInstance.get('api/uber-sign-up?accessCode=' + encodeURIComponent(accessCode))
    } catch (e) {
      return false
    }
    return result.data
  },
  logout: async session => {
    try {
      await apiInstance.get('api/logout?session=' + encodeURIComponent(session))
    } catch (e) {
      throw e
    }
  },
  getBusinessInfo: async (info) => {
    let response
    try {
      response = await apiInstance.get('api/yelp/businesses/match', {
        params: info
      })
      if (response.data.businesses.length === 0) return null

      const businessId = response.data.businesses[0].id
      response = await apiInstance.get(`api/yelp/businesses/${businessId}`, {
        params: info
      })
      return response.data
    } catch (e) {
      console.log('action getBusinessInfo', e)
    }
  },
  estimateTrip: async (session, startLng, startLat, locID) => {
    try {
      const response = await apiInstance.get('api/uber/estimate', {
        params: {
          session,
          startLng,
          startLat,
          locID
        }
      })
      return response.data
    } catch (e) {
      console.log('action estimateTrip', e)
    }
  },
  getDuration: async (startLng, startLat, endLng, endLat) => {
    try {
      const response = await apiInstance.get('api/maps/duration', {
        params: {
          startLng,
          startLat,
          endLng,
          endLat
        }
      })
      console.log('duration', response.data)
      return response.data
    } catch (e) {
      console.log('action getDuration', e)
    }
  }
}

export default API
