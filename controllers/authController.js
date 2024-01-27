const { login, logOut } = require('../services/auth')
class AuthController {
  async handleLogin(req, res) {
    const data = await login(req.body)
    res.cookie('tokens', data.refresh_token, {
      httpOnly: true,
      maxAge: 24 * 3600 * 1000,
      sameSite: 'None',
      secure: true
    })
    res.status(data.status).json({
		message : data.message, 
		status: data.status, 
		access_token : data.access_token
	})
  }

  async handleLogOut(req, res) {
    const cookies = req.cookies
    const data = await logOut(cookies)
    if (data.status === 404 || data.status === 200) {
      res.clearCookie('tokens', { httpOnly: true , path : "/", secure : true, sameSite : "None"})
    }
    res.status(data.status).json(data)
  }
}

module.exports = AuthController
