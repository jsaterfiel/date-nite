const mongo = require('mongodb-bluebird')

const dbURL = 'mongodb://mongo-custom:27017/datenite'

const DB = {
  getConnection: async () => {
    try {
      return await mongo.connect(dbURL)
    } catch (e) {
      console.log(e)
    }
    return null
  },
  findTrips: async () => {
    /**
     * Trip example data structure
     * _id : "5af4fb374020059977c7fcaf"
     *  loc_id: "24202"
     *  user_id: "2491f6b5-3e08-406b-87aa-a645ca64bc7b"
     *  trip_time: 123412341234
     *  active: true
     *  scheduled: false
     *  people: 2
     *  location: Object
     *    type: "Point"
     *    coordinates: Array
     *      0: 42.12351
     *      1: -90.12341
     */
    const dbo = await DB.getConnection()
    let trips = null
    let data = null
    const tripStart = new Date()
    const tripEnd = new Date()
    tripEnd.setMinutes(tripEnd.getMinutes() + 5)
    try {
      trips = await dbo.collection('trips')
    } catch (e) {
      console.log('db getLocation get collection', e)
      throw e
    } finally {
      if (trips === null) {
        try { dbo.close() } catch (e) { }
      }
    }
    try {
      data = await trips.find({
        trip_time: {$gte: tripStart, $lt: tripEnd},
        active: true,
        scheduled: false
      })
    } catch (e) {
      console.log('db getLocation findById', e)
      throw e
    } finally {
      try { dbo.close() } catch (e) { }
    }
    return data
  },
  getLocation: async id => {
    const dbo = await DB.getConnection()
    let locs = null
    let data = null
    try {
      locs = await dbo.collection('locations')
    } catch (e) {
      console.log('db getLocation get collection', e)
      throw e
    } finally {
      if (locs === null) {
        try { dbo.close() } catch (e) { }
      }
    }
    try {
      data = await locs.findById(id)
    } catch (e) {
      console.log('db getLocation findById', e)
      throw e
    } finally {
      try { dbo.close() } catch (e) { }
    }
    return data
  },
  getUser: async id => {
    const dbo = await DB.getConnection()
    let users = null
    let data = null
    try {
      users = await dbo.collection('users')
    } catch (e) {
      console.log('db createUser get collection', e)
      throw e
    } finally {
      if (users === null) {
        try { dbo.close() } catch (e) { }
      }
    }
    try {
      data = await users.findById(id)
    } catch (e) {
      console.log('db createUser findById', e)
      throw e
    } finally {
      try { dbo.close() } catch (e) { }
    }
    return data
  }
}
module.exports = DB
