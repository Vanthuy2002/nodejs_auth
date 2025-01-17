const definedRoutes = (app) => {
  app.use('/', require('./root'))
  app.use('/register', require('./register'))
  app.use('/auth', require('./auth'))
  app.use('/posts', require('./posts'))
  app.use('/refresh-token', require('./tokens'))
  app.use('/users', require('./users'))
}

module.exports = definedRoutes
