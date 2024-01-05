const { Schema, model } = require('mongoose')
const ROLES = require('../../config/roles')

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
    refresh_token: String,
    roles: {
      type: Array,
      default: [ROLES.USER]
    }
  },
  { timestamps: true }
)

const User = model('User', userSchema)
module.exports = User
