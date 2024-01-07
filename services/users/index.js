const User = require("../../model/users")
const { responseClient } = require('../../utils')

class UserServices {
	
	async getMe(email){
		const user = await User.findOne({email}).select('name email')
		if(!user) return responseClient({
			message : "Not found user, try again",
			status : 404
		})
		
		return responseClient({
			message : "Get me successful",
			status : 200,
			user
		})
	}
	
	async getAll(){
		const users = await User.find({}).select('name email')
		return responseClient({
			message : "Get all users successfull",
			status : 200,
			users
		})
	}
	
}

const userServices = new UserServices()
module.exports = userServices