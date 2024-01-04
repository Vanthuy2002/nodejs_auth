const cors = require('cors')
const corsOptions = require('./corsOptions')
const { logger } = require('../middleware/logEvents')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')

const globalAppConFig = (app) => {
  // custom middleware logger
  app.use(logger)

  // Cross Origin Resource Sharing
  app.use(cors(corsOptions))

  // built-in middleware to handle urlencoded form data
  app.use(express.urlencoded({ extended: false }))

  // built-in middleware for json
  app.use(express.json())

  // middleware for cookie
  app.use(cookieParser())

  //serve static files
  app.use('/', express.static(path.join(__dirname, '/public')))
}

module.exports = globalAppConFig
