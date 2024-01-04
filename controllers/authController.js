const { login } = require('../services/auth')
class AuthController {
  async handleLogin(req, res) {
    const data = await login(req.body)
    res.status(data.status).json({ ...data })
  }
}

module.exports = AuthController
