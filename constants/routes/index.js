const express = require('express')
const SERVER_CONFIGS = require('./constants/server')
const configureServer = require('./server')
//const configureRoutes = require('./routes')
const app = express()

configureServer(app)

app.listen(SERVER_CONFIGS.PORT, error => {
  if (error) throw error
  console.log('Server running on port: ' + SERVER_CONFIGS.PORT)
})

const paymentApi = require('./payment')
const configureRoutes = app => {
  paymentApi(app)
}
configureRoutes(app)

module.exports = configureRoutes
