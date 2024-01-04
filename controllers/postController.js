const postServices = require('../services/posts')

class PostController {
  async getAllPosts(req, res) {
    const data = await postServices.getAll(req.query)
    res.status(data.status).json(data)
  }

  async createPost(req, res) {
    const data = await postServices.createPost(req.body)
    res.status(data.status).json(data)
  }

  async getDetailsPost(req, res) {
    const { id } = req.params
    const data = await postServices.getPost(id)
    res.status(data.status).json(data)
  }

  async updatePost(req, res) {
    const { id } = req.params
    const payload = req.body
    const data = await postServices.updatedPost(id, payload)
    res.status(data.status).json(data)
  }

  async deletePost(req, res) {
    const { id } = req.params
    const data = await postServices.deletePost(id)
    res.status(data.status).json(data)
  }

  //   for test and development
  async insertManyPost() {
    const data = await postServices.insertData()
    res.status(data.status).json(data)
  }
}

module.exports = PostController
