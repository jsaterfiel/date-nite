const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(express.static('output'))

app.get('/api', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({hello: 'world'}))
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