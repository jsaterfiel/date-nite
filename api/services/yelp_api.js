const Axios = require('axios')
const Config = require('../config.js')

const DEFAULT_LIMIT = 50
const DEFAULT_RADIUS = 16000 // 16000 m = 10 mi
const YelpConfig = Config.YelpConfig

const YelpAPI = {
  getBusinesses: async (searchCriteria) => {
    let response, queryString
    const limit = !isNaN(searchCriteria.limit) ? parseInt(searchCriteria.limit) : DEFAULT_LIMIT
    const radius = !isNaN(searchCriteria.radius) ? parseFloat(searchCriteria.radius) : DEFAULT_RADIUS
    if (searchCriteria.location) {
      queryString = `term=${searchCriteria.term}&location=${searchCriteria.location}&radius=${radius}&limit=${limit}`
    } else {
      queryString = `term=${searchCriteria.term}&latitude=${searchCriteria.latitude}&longitude=${searchCriteria.longitude}
                      &radius=${radius}&limit=${limit}`
    }
    try {
      const url = `${YelpConfig.API_URL}businesses/search?${queryString}`
      response = await Axios.get(url, {
        headers: {
          Authorization: 'Bearer ' + YelpConfig.API_KEY
        }
      })

      return response
    } catch (ex) {
      console.log('ERROR Yelp API Search \n', ex)
      return []
    }
  },

  matchBusiness: async (info) => {
    let response
    const defaultInfo = {
      country: 'US',
      address1: 'a', // Some value required with this parameter by Yelp
      match_threshold: 'default',
      limit: 1
    }
    const businessInfo = {
      name: info.name,
      latitude: info.latitude,
      longitude: info.longitude,
      city: info.city,
      state: info.state
    }
    const parameters = {...businessInfo, ...defaultInfo}
    try {
      const url = `${YelpConfig.API_URL}businesses/matches`
      response = await Axios.get(url, {
        headers: {
          Authorization: 'Bearer ' + YelpConfig.API_KEY
        },
        params: parameters
      })

      console.log('API Response', response.data.businesses[0])
      return response
    } catch (ex) {
      console.log('ERROR Yelp API Match \n', ex)
      return []
    }
  }
}

module.exports = YelpAPI
