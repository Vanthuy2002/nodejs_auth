const { whitelist } = require('../config/corsOptions')

const credentialOptions = (req, res, next) => {
  const origin = req.headers.origin
  if (whitelist.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', true)
  }
  next()
}

module.exports = credentialOptions
