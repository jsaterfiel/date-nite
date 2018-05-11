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
  createUser: async userData => {
    const dbo = await DB.getConnection()
    userData._id = userData.uuid
    let users = null
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
      await users.removeById(userData._id)
    } catch (e) {
      console.log('db createUser del', e)
      // don't care as this can be thrown when the record doesn't exist
    }

    try {
      await users.insert(userData)
    } catch (e) {
      console.log('db createUser insert', e)
      throw e
    } finally {
      try { dbo.close() } catch (e) { }
    }
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
  },
  saveTrip: async (userID, pickupLng, pickupLat, locID, startTime, people) => {
    const dbo = await DB.getConnection()
    let trips = null
    try {
      trips = await dbo.collection('trips')
    } catch (e) {
      console.log('db createUser get collection', e)
      throw e
    } finally {
      if (trips === null) {
        try { dbo.close() } catch (e) { }
      }
    }

    try {
      await trips.insert({
        userID: userID,
        locID: locID,
        startTime: startTime,
        people: people,
        active: true,
        scheduled: false,
        location: {
          type: 'Point',
          coordinates: [pickupLng, pickupLat]
        }
      })
    } catch (e) {
      console.log('db saveTrip insert', e)
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
  searchLocations: async (lng, lat, radiusMeters, priceNum) => {
    const dbo = await DB.getConnection()
    let locs = null
    let data = null
    try {
      locs = await dbo.collection('locations')
    } catch (e) {
      console.log('db searchLocations get collection', e)
      throw e
    } finally {
      if (locs === null) {
        try { dbo.close() } catch (e) { }
      }
    }
    try {
      data = await locs.find({
        location:
          { $near:
             {
               $geometry: { type: 'Point', coordinates: [ parseFloat(lng), parseFloat(lat) ] },
               $minDistance: 0,
               $maxDistance: parseInt(radiusMeters)
             }
          },
        price: { $gte: parseInt(priceNum) }
      })
    } catch (e) {
      console.log('db searchLocations find', e)
      throw e
    } finally {
      try { dbo.close() } catch (e) { }
    }
    return data
  }
}

module.exports = DB
