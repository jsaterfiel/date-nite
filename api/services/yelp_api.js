const Axios = require('axios')
const Config = require('../config.js')

const DEFAULT_LIMIT = 50
const DEFAULT_RADIUS = 16000 // 16000 m = 10 mi
const DEFAULT_COUNTRY = 'US'
const DEFAULT_ADDRESS = 'a'
const DEFAULT_MATCH_THRESHOLD = 'default'
const DEFAULT_LIMIT_MATCH = 1
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
      country: DEFAULT_COUNTRY,
      address1: DEFAULT_ADDRESS, // Some value required with this parameter by Yelp
      match_threshold: DEFAULT_MATCH_THRESHOLD,
      limit: DEFAULT_LIMIT_MATCH
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

      return response
    } catch (ex) {
      console.log('ERROR Yelp API Match \n', ex)
      return []
    }
  },

  getBusinessesById: async (id) => {
    let response
    try {
      const url = `${YelpConfig.API_URL}businesses/${id}`
      response = await Axios.get(url, {
        headers: {
          Authorization: 'Bearer ' + YelpConfig.API_KEY
        }
      })

      return response
    } catch (ex) {
      console.log('ERROR Yelp API Id Search  \n', ex)
      return []
    }
  }
}

module.exports = YelpAPI
