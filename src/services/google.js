import Axios from 'axios'
import { GoogleConfig } from '../config'

const apiInstance = Axios.create()

apiInstance.interceptors.request.use((config) => {
  config.url = GoogleConfig.API_URL_PREFIX + config.url
  return config
})

const API = {
  geocode: async (term) => {
    let result
    try {
      result = await apiInstance.get('geocode/json', {
        params: {
          address: term,
          key: GoogleConfig.API_KEY
        }
      })
    } catch (e) {
      console.log('Error querying google geocode', e)
      return false
    }
    if (result.data.results.length > 0) {
      return result.data.results[0].geometry.location
    }
    return false
  }
}

export default API
