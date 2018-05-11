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
      console.log('error', e.message)
      return false
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
  }
}

export default API
