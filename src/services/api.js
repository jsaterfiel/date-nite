import Axios from 'axios'
import Config from '../config'

const apiInstance = Axios.create()

apiInstance.interceptors.request.use((config) => {
  config.url = Config.ApiURL + config.url
  return config
})

const API = {
  signUp: async accessCode => {
    let result
    try {
      result = await apiInstance.get('api/uber-sign-up?accessCode=' + encodeURIComponent(accessCode))
    } catch (e) {
      return false
    }
    return result.sessionID
  }
}

export default API
