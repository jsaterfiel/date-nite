import Axios from 'axios'
import { Config } from '../config'

const apiInstance = Axios.create()

apiInstance.interceptors.request.use((config) => {
  config.url = Config.ApiURL + config.url
  return config
})

const API = {
  saveDate: async (locID, pickupLng, pickupLat, startTime) => {
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
