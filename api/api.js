const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(express.static('output'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/api', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({hello: 'world'}))
})

// handle oauth2 redirect from uber
app.get('/api/uber-sign-up', async (req, res) => {
  // get code (access token)
  // exchange for token
  // pull profile info from uber
  // write data to db
  // set user data in redis with generated session key
  // return session key to user or return error
  console.log(req.query.accessCode)
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({sessionId: 'testtest2'}))
})

// 404 handling
app.use((req, res) => {
  res.status(404)
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({error: 'api path doesn\'t exist'}))
})

const port = 3000

app.listen(port, () => {
  console.log('CS-554 Final Project: Team 404 - API Server')
  console.log(`Server running on port: ${port}`)
})

module.exports = app
