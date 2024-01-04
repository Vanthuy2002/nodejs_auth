const { Schema, model } = require('mongoose')

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    like: Number,
    comment: Number
  },
  { timestamps: true }
)

const Posts = model('Posts', postSchema)
module.exports = Posts
