const { Router } = require('express')
const TokensController = require('../../controllers/tokenController')

const tokenRoutes = Router()
const tokenCtrl = new TokensController()
tokenRoutes.route('/').get(tokenCtrl.handleRefreshToken)

module.exports = tokenRoutes
