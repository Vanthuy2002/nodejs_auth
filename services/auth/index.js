const bcrypt = require('bcrypt')
const { responseClient } = require('../../utils')
const User = require('../../model/users')

const register = async (body) => {
  const { email, pwd } = body
  if (!email || !pwd)
    return responseClient({
      status: 400,
      message: 'User and password are require'
    })

  // check esist in Db
  const userExist = await User.findOne({ email })
  if (userExist)
    return responseClient({
      status: 403,
      message: `Email : ${email} already exists`
    })

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10)
    const username = email.split('@')[0]

    const newUser = { username, email, password: hashedPwd }
    // save in db
    await User.create(newUser)

    return responseClient({
      status: 201,
      message: `New user with email : ${email} was created`
    })
  } catch (err) {
    return responseClient({ status: 500, message: err.message })
  }
}

const login = async (body) => {
  const { email, password } = body
  if (!email || !password)
    return responseClient({
      status: 400,
      message: 'Email or password was required'
    })
  // found user in DB
  const user = await User.findOne({ email })
  if (!user)
    return responseClient({
      status: 403,
      message: 'Email or password not correct'
    })
  // evaluate password
  const matched = await bcrypt.compare(password, user.password)
  // check matched password
  if (!matched) {
    return responseClient({
      status: 403,
      message: 'Email or password not correct'
    })
  }
  // matched , create tokens
  return responseClient({ status: 200, message: 'Login successful' })
}

module.exports = { register, login }
