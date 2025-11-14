import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: String,
  category: {
    type: String,
    enum: ['Personal', 'Business', 'Property'],
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  imageUrl: String,
  author: String,
  publishedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Article', articleSchema)

