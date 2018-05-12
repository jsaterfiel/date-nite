const Axios = require('axios')
const Config = require('../config.js')

const API = {
  getDuration: async (startLng, startLat, endLng, endLat) => {
    let response
    try {
      response = await Axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
        params: {
          origins: `${startLat},${startLng}`,
          destinations: `${endLat},${endLng}`,
          key: Config.GoogleMapsApiKey
        }
      })
      if (response.data.rows.length > 0) {
        return response.data.rows[0].elements[0].duration
      } else {
        throw new Error('no path found for trip')
      }
    } catch (e) {
      console.log('api getDuration', e)
      throw new Error('Invalid request')
    }
  }
}

module.exports = API
