const { responseClient } = require('../../utils')
const Posts = require('../../model/posts')
const { faker } = require('@faker-js/faker')

class PostServices {
  async getAll(query) {
    const page = Number(query.page)
    const limit = Number(query.limit)
    const offset = (page - 1) * limit

    const [posts, totalDocs] = await Promise.all([
      Posts.find({}).skip(offset).limit(limit).sort(query.sort),
      Posts.countDocuments({})
    ])

    const totalPages = Math.ceil(totalDocs / limit)
    return responseClient({
      message: 'Get all posts ok',
      status: 200,
      posts,
      page,
      limit,
      totalDocs,
      totalPages
    })
  }

  async createPost(body) {
    await Posts.create(body)
    return responseClient({ message: 'Create post successful', status: 201 })
  }

  async getPost(id) {
    const post = await Posts.findById(id, 'title author content like comment')
    if (!post)
      return responseClient({ message: 'No post was found', status: 404 })

    return responseClient({
      message: 'Get details post ok!!',
      status: 200,
      post
    })
  }

  async updatedPost(id, body) {
    const postUpdated = await Posts.findByIdAndUpdate(
      id,
      { ...body },
      { returnDocument: 'after' }
    )

    return responseClient({
      message: 'Updated post successful',
      status: 200,
      post: postUpdated
    })
  }

  async deletePost(id) {
    await Posts.findByIdAndDelete(id)
    return responseClient({
      message: `Delete post with id ${id} successful`,
      status: 200
    })
  }

  async insertData() {
    const document = {
      title: faker.lorem.sentence(6),
      content: faker.lorem.paragraphs(5),
      author: faker.person.fullName,
      like: faker.number.int(),
      comment: faker.number.int()
    }
    const payload = []
    for (let i = 0; i < 100; i++) {
      payload.push(document)
    }

    await Posts.insertMany(payload)
    return responseClient({
      message: 'Insert data for development ok',
      status: 200
    })
  }
}

const postServices = new PostServices()
module.exports = postServices
