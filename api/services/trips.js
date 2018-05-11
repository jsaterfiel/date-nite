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
  },
  cancelTrip: async (tripID) => {
    try {
      await db.cancelTrip(tripID)
    } catch (e) {
      console.log('Trips cancelTrip db', e)
      throw new Error('Error cancelling trip')
    }
    return true
  },
  getTrips: async (userID) => {
    try {
      return await db.getTrips(userID)
    } catch (e) {
      console.log('Trips getTrips db', e)
      throw new Error('Error getting trips')
    }
  }
}

module.exports = Trips
