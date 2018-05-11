const express = require('express')
const bodyParser = require('body-parser')
const uberService = require('./services/uber')
const Yelp = require('./services/yelp_api')
const locService = require('./services/locations')
const tripsService = require('./services/trips')

const app = express()

app.use(bodyParser.json())
app.use(express.static('output'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Content-Type', 'application/json')
  if (req.method === 'OPTIONS') {
    res.end()
  } else {
    next()
  }
})

app.get('/api', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({ hello: 'world' }))
})

app.get('/api/logout', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  const sessionID = req.query.session
  if (sessionID === undefined) {
    res.status(500)
    res.send(JSON.stringify({ error: 'Missing query parameter.  Parameters are: session' }))
    return
  }

  try {
    await uberService.logout(sessionID)
  } catch (e) {
    res.status(500)
    res.send(JSON.stringify({ error: e.message }))
    return
  }
  res.send(JSON.stringify({ success: true }))
})

// cancel date trip
app.delete('/api/trips/:id', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // get all params
  const sessionID = req.query.session
  const tripID = req.params.id

  if (sessionID === undefined) {
    res.status(500)
    res.send(JSON.stringify({ error: 'Missing query parameter.  Parameters are: session' }))
    return
  }

  const user = await uberService.getUser(sessionID)
  if (user === false) {
    res.status(500)
    res.send(JSON.stringify({ error: 'Invalid User' }))
    return
  }
  try {
    await tripsService.cancelTrip(tripID)
  } catch (e) {
    res.status(500)
    res.send(JSON.stringify({ error: e.message }))
    return
  }
  res.send(JSON.stringify({success: true}))
})

// save date trip
app.post('/api/trips', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // get all params
  const sessionID = req.body.session
  const pickupLng = req.body.pickupLng
  const pickupLat = req.body.pickupLat
  const locID = req.body.locID
  const startTime = req.body.startTime
  const people = req.body.people

  if (sessionID === undefined || pickupLng === undefined || pickupLat === undefined || locID === undefined || startTime === undefined || people === undefined) {
    res.status(500)
    res.send(JSON.stringify({ error: 'Missing parameter.  Parameters are: session, pickupLng, pickupLat, locID, startTime, people' }))
    return
  }

  const user = await uberService.getUser(sessionID)
  if (user === false) {
    res.status(500)
    res.send(JSON.stringify({ error: 'Invalid User' }))
    return
  }
  try {
    await tripsService.saveTrip(user._id, pickupLng, pickupLat, locID, startTime, people)
  } catch (e) {
    res.status(500)
    res.send(JSON.stringify({ error: e.message }))
    return
  }
  res.send(JSON.stringify({success: true}))
})

app.get('/api/trips', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // get all params
  const sessionID = req.query.session
  if (sessionID === undefined) {
    res.status(500)
    res.send(JSON.stringify({ error: 'Missing query string parameter.  Parameters are: session' }))
    return
  }

  const user = await uberService.getUser(sessionID)
  if (user === false) {
    res.status(500)
    res.send(JSON.stringify({ error: 'Invalid User' }))
    return
  }
  let results
  let data = []
  try {
    results = await tripsService.getTrips(user._id)
    for (let trip of results) {
      try {
        let loc = await locService.getLocation(trip.locID)
        data.push({
          tripID: trip._id,
          timestamp: trip.startTime,
          active: trip.active,
          location: {
            name: loc.name,
            address: loc.address,
            city: loc.city,
            state: loc.state,
            reserve_url: loc.reserve_url,
            image_url: loc.image_url
          }
        })
      } catch (e) {
        console.log('error while getting loc', e)
        continue
      }
    }
  } catch (e) {
    res.status(500)
    res.send(JSON.stringify({ error: e.message }))
    return
  }
  res.send(JSON.stringify(data))
})

// handle oauth2 redirect from uber
app.get('/api/uber-sign-up', async (req, res) => {
  // get code (access token)
  const accessCode = req.query.accessCode
  if (accessCode === undefined) {
    res.status(500)
    res.send(JSON.stringify({ error: 'Missing accessCode parameter' }))
    return
  }
  res.setHeader('Content-Type', 'application/json')
  const result = await uberService.auth(accessCode)
  res.send(JSON.stringify(result))
})

app.get('/api/uber/estimate', async (req, res) => {
  // get query string params and ensure they exist
  const sessionID = req.query.session
  const startLng = req.query.startLng
  const startLat = req.query.startLat
  const endLng = req.query.endLng
  const endLat = req.query.endLat
  if (sessionID === undefined || startLng === undefined || startLat === undefined || endLng === undefined || endLat === undefined) {
    res.status(500)
    res.send(JSON.stringify({ error: 'Missing parameter.  Parameters are: session, startLng, startLat, endLng, endLat' }))
    return
  }
  res.setHeader('Content-Type', 'application/json')
  try {
    const result = await uberService.getEstimate(startLng, startLat, endLng, endLat, sessionID)
    res.send(JSON.stringify(result))
  } catch (e) {
    res.status(500)
    res.send(JSON.stringify({error: e.message}))
  }
})

// get all businesses in an area
app.get('/api/yelp/businesses', async (req, res) => {
  try {
    const result = await Yelp.getBusinesses(req.query)
    res.status(200).send(JSON.stringify(result.data))
  } catch (error) {
    console.log('ERROR api/yelp/businesses ', error)
    res.status(500)
    res.send(JSON.stringify({ error: 'Unable to process the request to yelp' }))
  }
})

// get a specific restaurant by name and location
app.get('/api/yelp/businesses/match', async (req, res) => {
  try {
    const result = await Yelp.matchBusiness(req.query)
    res.status(200).send(JSON.stringify(result.data))
  } catch (error) {
    console.log('ERROR api/yelp/businesses/match ', error)
    res.status(500).send(error)
  }
})

// get restaurant details by Id
app.get('/api/yelp/businesses/:id', async (req, res) => {
  try {
    const result = await Yelp.getBusinessesById(req.params.id)
    res.status(200).send(JSON.stringify(result.data))
  } catch (error) {
    console.log('ERROR api/yelp/businesses/:id ', error)
    res.status(500).send(error)
    console.log('ERROR api/yelp/businesses ', error)
    res.send(JSON.stringify({ error: 'Unable to process the request to yelp' }))
  }
})

// get a location by its id
app.get('/api/locations/:id', async (req, res) => {
  try {
    const result = await locService.getLocation(req.params.id)
    res.status(200).send(JSON.stringify(result))
  } catch (error) {
    console.log('ERROR api/locations ', error)
    res.send(JSON.stringify({ error: error.message }))
  }
})

// search locations by lng, lat, radius(meters) and price id (2-4)
app.get('/api/locations/search/:lng/:lat/:radius/:price', async (req, res) => {
  try {
    const result = await locService.search(req.params.lng, req.params.lat, req.params.radius, req.params.price)
    res.status(200).send(JSON.stringify(result))
  } catch (error) {
    console.log('ERROR api/locations/search ', error)
    res.send(JSON.stringify({ error: error.message }))
  }
})

// 404 handling
app.use((req, res) => {
  res.status(404)
  res.send(JSON.stringify({ error: 'api path doesn\'t exist' }))
})

const port = 3000

app.listen(port, () => {
  console.log('CS-554 Final Project: Team 404 - API Server')
  console.log(`Server running on port: ${port}`)
})

module.exports = app
