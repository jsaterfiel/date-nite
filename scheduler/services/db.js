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
      const params = {
        startTime: {$gte: tripStart.getTime(), $lt: tripEnd.getTime()},
        active: true,
        scheduled: false
      }
      data = await trips.find(params)
    } catch (e) {
      console.log('db getLocation findById', e)
      throw e
    } finally {
      try { dbo.close() } catch (e) { }
    }
    return data
  },
  tripScheduled: async id => {
    const dbo = await DB.getConnection()
    let trips = null
    try {
      trips = await dbo.collection('trips')
    } catch (e) {
      console.log('db tripScheduled get collection', e)
      throw e
    } finally {
      if (trips === null) {
        try { dbo.close() } catch (e) { }
      }
    }
    try {
      await trips.updateById(id, {$set: {scheduled: true}})
    } catch (e) {
      console.log('db tripScheduled updateById', e)
      throw e
    } finally {
      try { dbo.close() } catch (e) { }
    }
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
      console.log('db getUser get collection', e)
      throw e
    } finally {
      if (users === null) {
        try { dbo.close() } catch (e) { }
      }
    }
    try {
      data = await users.findById(id)
    } catch (e) {
      console.log('db getUser findById', e)
      throw e
    } finally {
      try { dbo.close() } catch (e) { }
    }
    return data
  }
}
module.exports = DB
