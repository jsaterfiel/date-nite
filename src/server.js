const express = require('express')
const bodyParser = require('body-parser')
const Yelp = require('./services/yelp_api') 
const Config = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(express.static('output'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Content-Type', 'application/json')
  next()
})

app.get('/api/yelp/businesses', async (req, res) => {
  try {
    const result = await Yelp.getBusinesses(req.query)
    res.status(200).send(JSON.stringify(result.data))
  } catch (error) {
    console.log('ERROR api/yelp/businesses ', error)
    res.status(500).send(error)
  }
})

// 404 handling
app.use((req, res) => {
  res.status(404)
  res.send(JSON.stringify({error: 'api path doesn\'t exist'}))
})


app.listen(Config.PORT, () => {
  console.log('CS-554 Final Project: Team 404 - API Server')
  console.log(`Server running on port: ${Config.PORT}`)
})

module.exports = app
