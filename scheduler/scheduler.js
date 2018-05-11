const db = require('./db')
const uber = require('./uber')

const Scheduler = {
  checkTrips: () => {
    const promise = db.findTrips()
    promise.then(async (trips) => {
      for (let trip of trips) {
        const user = await db.getUser(trip.user_id)
        const loc = await db.getLocation(trip.loc_id)
        await uber.requestPickup(user, loc, trip)
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
