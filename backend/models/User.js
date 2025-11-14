import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: false,
    unique: false
  },
  email: {
    type: String,
    required: true
  },
  displayName: String,
  photoURL: String,
  provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  passwordHash: {
    type: String,
    required: false
  },
  lastLoginAt: Date,
  subscription: {
    type: {
      type: String,
      enum: ['free', 'standard', 'pro'],
      default: 'free'
    },
    startDate: Date,
    endDate: Date,
    isActive: {
      type: Boolean,
      default: true
    }
  },
  documentsGenerated: {
    type: Number,
    default: 0
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

userSchema.index({ email: 1 }, { unique: true })
userSchema.index({ firebaseUid: 1 })

export default mongoose.model('User', userSchema)