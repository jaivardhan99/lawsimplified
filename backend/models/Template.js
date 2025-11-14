import mongoose from 'mongoose'

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Personal', 'Business', 'Property'],
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  description: String,
  templateContent: {
    type: String,
    required: true
  },
  fields: [{
    name: String,
    type: String,
    required: Boolean,
    placeholder: String
  }],
  price: {
    type: Number,
    default: 299
  },
  isActive: {
    type: Boolean,
    default: true
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

export default mongoose.model('Template', templateSchema)

