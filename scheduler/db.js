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
