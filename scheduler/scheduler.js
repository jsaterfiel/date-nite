const db = require('./services/db')
const uber = require('./services/uber')

const Scheduler = {
  checkTrips: () => {
    const promise = db.findTrips()
    promise.then(async (trips) => {
      for (let trip of trips) {
        const user = await db.getUser(trip.userID)
        const loc = await db.getLocation(trip.locID)
        try {
          await uber.requestPickup(user, loc, trip)
          await db.tripScheduled(trip._id)
        } catch (e) {
          console.log(e)
        }
      }
      Scheduler.repeat()
    }).catch(reason => {
      console.log('error checkTrips', reason)
      Scheduler.repeat()
    })
  },
  repeat: () => {
    setTimeout(Scheduler.checkTrips, 60000)
  }
}

console.log('SCHEDULER RUNNING')

Scheduler.checkTrips()
