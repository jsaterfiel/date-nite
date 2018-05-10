const redis = require('redis')
const bluebird = require('bluebird')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const cache = redis.createClient({url: 'redis://redis:6379'})

module.exports = cache
