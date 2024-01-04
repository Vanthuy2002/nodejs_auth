const { login } = require('../services/auth')
class AuthController {
  async handleLogin(req, res) {
    const data = await login(req.body)
    res.cookie('tokens', data.refresh_token, {
      httpOnly: true,
      maxAge: 24 * 3600 * 1000
    })
    res.status(data.status).json({ ...data })
  }
}

module.exports = AuthController
