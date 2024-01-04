const envListConfig = require('../config/envConfig')
const mongoose = require('mongoose')
const { MONGO_PASS, MONGO_URI } = envListConfig

const connectMongoose = async () => {
  await mongoose.connect(MONGO_URI.replace('<password>', MONGO_PASS))
  console.log('Connected to mongoose!!')
}

module.exports = connectMongoose
