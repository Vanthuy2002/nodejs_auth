const definedRoutes = (app) => {
  app.use('/', require('./root'))
  app.use('/register', require('./register'))
  app.use('/auth', require('./auth'))
  app.use('/posts', require('./posts'))
}

module.exports = definedRoutes
