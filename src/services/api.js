import Axios from 'axios'
import { Config } from '../config'

const apiInstance = Axios.create()

apiInstance.interceptors.request.use((config) => {
  config.url = Config.ApiURL + config.url
  return config
})

const API = {
  saveDate: async (session, locID, pickupLng, pickupLat, startTime, people) => {
    let result
    try {
      result = await apiInstance.post('api/trips/save', {
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
