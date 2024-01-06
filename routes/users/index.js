const {Router} = require("express")
const UserController = require("../../controllers/userController")
const checkValidToken = require('../../middleware/checkTokens')
const permissionAction = require('../../middleware/permission')
const ROLES = require('../../config/roles')
const { ADMIN } = ROLES

const userRoutes = Router()
const userCtrl = new UserController()

userRoutes.get("/", checkValidToken, permissionAction(ADMIN) , userCtrl.getAllUsers)
userRoutes.get("/whoiam", checkValidToken, userCtrl.whoIam)

module.exports = userRoutes
