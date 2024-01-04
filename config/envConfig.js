const { config } = require('dotenv')

config()

const envListConfig = {
  MONGO_URI: process.env.MONGO_URI,
  MONGO_PASS: process.env.MONGO_PASS,
  PORT: process.env.PORT,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRED: process.env.ACCESS_TOKEN_EXPIRED,
  REFRESH_TOKEN_EXPIRED: process.env.REFRESH_TOKEN_EXPIRED
}

module.exports = envListConfig
