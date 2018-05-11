const db = require('./db')

const Trips = {
  saveTrip: async (userID, pickupLng, pickupLat, locID, startTime, people) => {
    try {
      await db.saveTrip(userID, pickupLng, pickupLat, locID, startTime, people)
    } catch (e) {
      console.log('Trips saveTrip db', e)
      throw new Error('Error saving trip')
    }
    return true
  }
}

module.exports = Trips
