const bluebird = require('bluebird')
const redis = require('redis')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const subscriber = redis.createClient()
const client = redis.createClient()

const redisRequestChannel = 'request_channel'

subscriber.on('message', async (channel, msg) => {
  const request = JSON.parse(msg)
  let response = {success: false, results: []}
  try {
    // TODO: call uber
    response.results = {hello: 'world'}
    response.message = request.data.message
    response.username = request.data.username
    response.success = true
  } catch (err) {
    response.success = false
    response.err_msg = err.message
  }
  await client.publishAsync(request.channel, JSON.stringify(response))
})

subscriber.on('error', async (channel, msg) => {
  await subscriber.unsubscribeAsync()
  await subscriber.quitAsync()
})

subscriber.subscribeAsync(redisRequestChannel)

console.log('SCHEDULER RUNNING')
