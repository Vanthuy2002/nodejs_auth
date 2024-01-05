const { Router } = require('express')
const checkValidToken = require('../../middleware/checkTokens')
const PostController = require('../../controllers/postController')
const permissionAction = require('../../middleware/permission')
const ROLES = require('../../config/roles')
const { EDITOR, ADMIN } = ROLES

const postCtrl = new PostController()
const postRoutes = Router()
postRoutes
  .route('/')
  .get(checkValidToken, postCtrl.getAllPosts)
  .post(checkValidToken, permissionAction(EDITOR, ADMIN), postCtrl.createPost)

postRoutes
  .route('/:id')
  .get(checkValidToken, postCtrl.getDetailsPost)
  .patch(checkValidToken, permissionAction(EDITOR, ADMIN), postCtrl.updatePost)
  .delete(checkValidToken, permissionAction(ADMIN), postCtrl.deletePost)

postRoutes
  .route('/many')
  .post(permissionAction(ADMIN), postCtrl.insertManyPost)
  .delete(permissionAction(ADMIN), postCtrl.deleteMany)

module.exports = postRoutes
