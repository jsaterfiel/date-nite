const mongo = require('mongodb-bluebird')

const dbURL = 'mongodb://127.0.0.1:27017/datenite'

const options = { keepAlive: 1, connectTimeoutMS: 30000, reconnectTries: 3 }

const locDB = 'locations'

const DB = {
  getConnection: async () => {
    try {
      return await mongo.connect(dbURL, options)
    } catch (e) {
      console.log(e)
    }
    return null
  },
  emptyLocations: async () => {
    const dbo = await DB.getConnection()

    // destroy collection if it exists.  Catch isn't logged because mongo throws an error if the collection doesn't exist
    try { await dbo.dropCollection(locDB) } catch (e) {}

    try {
      await dbo.createCollection(locDB)
      const locs = await dbo.collection(locDB)
      await locs.createIndex({ location: '2dsphere' })
    } catch (e) {
      console.log('emptyLocations get collection', e)
      throw e
    } finally {
      try { dbo.close() } catch (e) { }
    }
  },
  addGeoIndex: async () => {
    const dbo = await DB.getConnection()

    try {
      const locs = await dbo.collection(locDB)
      await locs.createIndex({ location: '2dsphere' })
    } catch (e) {
      console.log('addGeoIndex get collection', e)
      throw e
    } finally {
      try { dbo.close() } catch (e) { }
    }
  },
  insertBulkLocations: async data => {
    const dbo = await DB.getConnection()
    let locations = null
    try {
      locations = await dbo.collection(locDB)
    } catch (e) {
      console.log('insertBulkLocations get collection', e)
      throw e
    } finally {
      if (locations === null) {
        try { dbo.close() } catch (e) { }
      }
    }

    // clean up the data by setting an _id
    // move everything into a feature object for geojson formatting for geospatial searching
    for (let i = 0; i < data.length; i++) {
      let loc = data[i]
      let newLoc = {
        _id: loc.id + '',
        name: loc.name,
        address: loc.address,
        city: loc.city,
        state: loc.state,
        area: loc.area,
        postal_code: loc.postal_code,
        country: loc.country,
        phone: loc.phone,
        price: loc.price,
        reserve_url: loc.reserve_url,
        mobile_reserve_url: loc.mobile_reserve_url,
        image_url: loc.image_url,
        location: {
          type: 'Point',
          coordinates: [loc.lng, loc.lat]
        }
      }
      data[i] = newLoc
    }

    try {
      await locations.insert(data)
    } catch (e) {
      console.log('insertBulkLocations insert', e)
      throw e
    } finally {
      try { dbo.close() } catch (e) { }
    }
  },
  countLocations: async () => {
    const dbo = await DB.getConnection()
    let locations = null
    try {
      locations = await dbo.collection(locDB)
    } catch (e) {
      console.log('countLocations get collection', e)
      throw e
    } finally {
      if (locations === null) {
        try { dbo.close() } catch (e) { }
      }
    }
    let count = 0
    try {
      count = await locations.count()
    } catch (e) {
      console.log('countLocations count', e)
      throw e
    } finally {
      try { dbo.close() } catch (e) { }
    }
    return count
  }
}

module.exports = DB
