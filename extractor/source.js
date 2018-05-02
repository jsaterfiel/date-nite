const axios = require('axios')
const querystring = require('querystring')

const sourceInstance = axios.create()

const sourceURL = 'https://opentable.herokuapp.com/api/restaurants'

const API = {
  /**
   * page starts at 1
   */
  getPage: async page => {
    try {
      const results = await sourceInstance.get(sourceURL + '?' + querystring.stringify({
        country: 'US',
        page: page,
        per_page: 100
      }))
      return results.data
    } catch (e) {
      console.log('error when getting page ' + page, e)
      throw e
    }
  }
}

module.exports = API
