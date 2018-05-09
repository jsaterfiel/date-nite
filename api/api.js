const express = require('express')
const bodyParser = require('body-parser')
const uberService = require('./services/uber')
const Yelp = require('./services/yelp_api')

const app = express()

app.use(bodyParser.json())
app.use(express.static('output'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Content-Type', 'application/json')
  next()
})

app.get('/api', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({ hello: 'world' }))
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

  // exchange for token
  // pull profile info from uber
  // write data to db
  // set user data in redis with generated session key
  // return session key to user or return error
  res.setHeader('Content-Type', 'application/json')
  const result = await uberService.auth(req.query.accessCode)
  res.send(JSON.stringify(result))
})

// get all businesses in an area
app.get('/api/yelp/businesses', async (req, res) => {
  try {
    const result = await Yelp.getBusinesses(req.query)
    res.status(200).send(JSON.stringify(result.data))
  } catch (error) {
    console.log('ERROR api/yelp/businesses ', error)
    res.status(500).send(error)
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
  }
})

// 404 handling
app.use((req, res) => {
  res.status(404)
  res.send(JSON.stringify({ error: 'api path doesn\'t exist' }))
})

const port = 3003

app.listen(port, () => {
  console.log('CS-554 Final Project: Team 404 - API Server')
  console.log(`Server running on port: ${port}`)
})

module.exports = app
