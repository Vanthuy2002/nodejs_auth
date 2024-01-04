const express = require('express')
const globalAppConFig = require('./config/global')
const app = express()
const path = require('path')
const errorHandler = require('./middleware/errorHandler')
const definedRoutes = require('./routes')
const envConfigList = require('./config/envConfig')
const connectMongoose = require('./database')

const PORT = envConfigList.PORT
// middleware global
globalAppConFig(app)

// routes
definedRoutes(app)

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
connectMongoose().catch(console.dir)
