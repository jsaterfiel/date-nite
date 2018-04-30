const mongo = require('mongodb-bluebird')

const dbURL = 'mongodb://mongo:27017/datenite'

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
      console.log('createUser get collection', e)
      throw e
    } finally {
      if (users === null) {
        try { dbo.close() } catch (e) { }
      }
    }

    try {
      await users.removeById(userData._id)
    } catch (e) {
      console.log('createUser del', e)
      // don't care as this can be thrown when the record doesn't exist
    }

    try {
      await users.insert(userData)
    } catch (e) {
      console.log('createUser insert', e)
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
      console.log('createUser get collection', e)
      throw e
    } finally {
      if (users === null) {
        try { dbo.close() } catch (e) { }
      }
    }
    try {
      data = await users.findById(id)
    } catch (e) {
      console.log('createUser findById', e)
      throw e
    } finally {
      try { dbo.close() } catch (e) { }
    }
    return data
  }
}

module.exports = DB
