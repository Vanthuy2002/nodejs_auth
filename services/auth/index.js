const bcrypt = require('bcrypt')
const { responseClient, generateTokens } = require('../../utils')
const User = require('../../model/users')
const envListConfig = require('../../config/envConfig')

const { REFRESH_TOKEN_EXPIRED } = envListConfig

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
  const payload = { email: user.email }
  // matched , create tokens
  const [access_token, refresh_token] = await Promise.all([
    generateTokens(payload),
    generateTokens(payload, REFRESH_TOKEN_EXPIRED)
  ])
  // save refresh_tokens in db
  await User.findByIdAndUpdate(user._id, { refresh_token })
  return responseClient({
    status: 200,
    message: 'Login successful',
    access_token,
    refresh_token
  })
}
const logOut = async (cookies) => {
  // delete access_token in client
  if (!cookies?.tokens)
    return responseClient({ message: 'Not found cookies', status: 403 })

  const refresh_token = cookies.tokens
  // is refresh_token has in DB??
  const user = await User.findOne({ refresh_token })
  if (!user) {
    // not found user -> must be clear cookie
    // res.clearCookie('tokens', {httpOnly : true})
    return responseClient({
      message: 'Not found user',
      status: 404
    })
  }

  // delete refresh_token in db
  await User.findByIdAndUpdate(user._id, { $unset: { refresh_token: 1 } })
  return responseClient({ message: 'Logout successful', status: 200 })
}

module.exports = { register, login, logOut }
