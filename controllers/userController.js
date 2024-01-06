const userServices = require('../services/users')

class UserController { 

	async getAllUsers(req, res){
		const data = await userServices.getAll()
		res.status(data.status).json(data)
	}
	
	async whoIam(req, res){
		const email = req?.currentUser.email
		const data = await userServices.getMe(email)
		res.status(data.status).json(data)
	}
}

module.exports = UserController
