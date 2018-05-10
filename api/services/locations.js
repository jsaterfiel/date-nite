const db = require('./db')
const cache = require('./cache')
const crypto = require('crypto')

const CACHE_TIMEOUT = 86400
const CACHE_PREFIX_LOC = 'loc_'
const CACHE_PREFIX_SEARCH = 'search_'

const Locs = {
  getLocation: async id => {
    const cacheKey = CACHE_PREFIX_LOC + id
    try {
      const result = await cache.getAsync(cacheKey)
      if (result !== null) {
        return JSON.parse(result)
      }
    } catch (e) {
      console.log('Locs getLocation fetch cache', e)
    }

    // fetch and cache location from db if not in cache
    let loc
    try {
      loc = await db.getLocation(id)
    } catch (e) {
      console.log('Locs getLocation db', e)
      throw new Error('Location not found')
    }

    if (loc === null) {
      throw new Error('Location not found')
    }

    try {
      await cache.setAsync(cacheKey, JSON.stringify(loc), 'EX', CACHE_TIMEOUT)
    } catch (e) {
      console.log('Locs getLocation set cache')
    }

    return loc
  },
  search: async (lng, lat, radiusMeters, priceNum) => {
    // generate cache key
    const hash = crypto.createHash('md5')
    hash.update(lng + lat + radiusMeters + priceNum)
    const cacheKey = CACHE_PREFIX_SEARCH + hash.digest('hex')

    let locs
    try {
      const result = await cache.getAsync(cacheKey)
      if (result !== null) {
        console.log('cached!')
        return JSON.parse(result)
      }
    } catch (e) {
      console.log('Locs getLocation fetch cache', e)
    }

    // fetch and cache location from db if not in cache
    try {
      locs = await db.searchLocations(lng, lat, radiusMeters, priceNum)
      console.log('searched!')
    } catch (e) {
      console.log('Locs search db', e)
      throw new Error('Unable to process your request')
    }

    if (locs === null) {
      throw new Error('Location not found')
    }

    try {
      await cache.setAsync(cacheKey, JSON.stringify(locs), 'EX', CACHE_TIMEOUT)
    } catch (e) {
      console.log('Locs getLocation set cache')
    }

    return locs
  }
}

module.exports = Locs
