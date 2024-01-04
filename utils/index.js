const jwt = require('jsonwebtoken')
const envListConfig = require('../config/envConfig')

const { TOKEN_SECRET, TOKEN_EXPIRED } = envListConfig

const responseClient = (param) => {
  return param
}

const generateTokens = async (payload, expiresIn = TOKEN_EXPIRED) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn }, (err, token) => {
      if (err) return reject(err.message)
      resolve(token)
    })
  })
}

const verifyToken = (tokens) => {
  return new Promise((resolve, reject) => {
    jwt.verify(tokens, TOKEN_SECRET, (err, decoded) => {
      if (err) return reject(err.message)
      resolve(decoded)
    })
  })
}

const checkTokenExpired = async (tokens) => {
  const decoded = await verifyToken(tokens)
  const expiredTime = decoded?.exp

  const now = Date.now() / 100
  return now < expiredTime
}

module.exports = {
  responseClient,
  generateTokens,
  checkTokenExpired,
  verifyToken
}
