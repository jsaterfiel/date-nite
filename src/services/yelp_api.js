const Axios = require('axios')
const Config = require('../config.js')

const DEFAULT_LIMIT = 50
const DEFAULT_RADIUS = 16000 // 16000 m = 10 mi
const YelpConfig = Config.YelpConfig

const YelpAPI = {
  getBusinesses: async (searchCriteria) => {
    let response
    const limit = searchCriteria.limit || DEFAULT_LIMIT
    const radius = searchCriteria.radius || DEFAULT_RADIUS
    try {
      const queryString = `term=${searchCriteria.term}&location=${searchCriteria.location}&radius=${radius}&limit=${limit}`
      const url = `${YelpConfig.API_URL}businesses/search?${queryString}`
      response = await Axios.get(url, {
        headers: {
          Authorization: 'Bearer ' + YelpConfig.API_KEY
        }
      })

      return response
    } catch (ex) {
      console.log(ex)
      return []
    }
  }
}

module.exports = YelpAPI
