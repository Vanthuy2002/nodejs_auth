const tokenServices = require('../services/token')

class TokensController {
  async handleRefreshToken(req, res) {
    const cookies = req.cookies
    const data = await tokenServices.refresh(cookies)
    res.status(data.status).json(data)
  }
}

module.exports = TokensController
