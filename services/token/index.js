const { responseClient, verifyToken, generateTokens } = require('../../utils')
const User = require('../../model/users')

class TokenServices {
  async refresh(cookies) {
    if (!cookies?.tokens)
      return responseClient({ status: 401, message: 'Not found cookies' })
    // get token from cookies
    const refresh_token = cookies.tokens
    // query in DB. find user
    const user = await User.findOne({ refresh_token })
    if (!user) return responseClient({ message: 'Not found user', status: 403 })
    // decoded token, if ok -> create new access_token
    try {
      const decoded = await verifyToken(refresh_token)
      const payload = { email: decoded.email }
      const access_token = await generateTokens(payload)
      return { status: 201, access_token }
    } catch (err) {
      return responseClient({ message: err.message, status: 403 })
    }
  }
}

const tokenServices = new TokenServices()
module.exports = tokenServices
