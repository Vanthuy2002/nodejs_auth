const express = require('express')
const router = express.Router()
const RegisterControllers = require('../controllers/registerController')

const registerCtrl = new RegisterControllers()

router.post('/', registerCtrl.handleRegister)

module.exports = router
