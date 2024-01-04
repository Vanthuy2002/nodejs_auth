const { config } = require('dotenv')

config()

const envListConfig = {
  MONGO_URI: process.env.MONGO_URI,
  MONGO_PASS: process.env.MONGO_PASS,
  PORT: process.env.PORT
}

module.exports = envListConfig
