const { Router } = require('express')
const checkValidToken = require('../../middleware/checkTokens')
const PostController = require('../../controllers/postController')

const postCtrl = new PostController()
const postRoutes = Router()
postRoutes
  .route('/')
  .get(checkValidToken, postCtrl.getAllPosts)
  .post(checkValidToken, postCtrl.createPost)

postRoutes
  .route('/:id')
  .get(checkValidToken, postCtrl.getDetailsPost)
  .patch(checkValidToken, postCtrl.updatePost)
  .delete(checkValidToken, postCtrl.deletePost)

module.exports = postRoutes
