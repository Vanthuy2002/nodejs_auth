const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/authController')

const authController = new AuthController()
router.post('/', authController.handleLogin)

module.exports = router
