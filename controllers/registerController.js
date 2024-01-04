const { register } = require('../services/auth')

class RegisterControllers {
  async handleRegister(req, res) {
    const data = await register(req.body)
    res.status(data.status).json({ ...data })
  }
}

module.exports = RegisterControllers
