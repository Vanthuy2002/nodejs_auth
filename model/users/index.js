const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    username: String,
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    refresh_token: String
  },
  { timestamps: true }
)

const User = model('User', userSchema)
module.exports = User
