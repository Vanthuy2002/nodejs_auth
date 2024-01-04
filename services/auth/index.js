const bcrypt = require('bcrypt')
const { responseClient } = require('../../utils')

const register = async (body) => {
  const { user, pwd } = body
  if (!user || !pwd)
    return responseClient({
      status: 400,
      message: 'User and password are require'
    })

  // check esist in Db
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10)
    const newUser = { username: user, password: hashedPwd }
    // save in db

    return responseClient({
      status: 201,
      message: `New user ${user} was created`
    })
  } catch (err) {
    return responseClient({ status: 500, message: err.message })
  }
}

module.exports = { register }
