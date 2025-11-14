import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  paymentId: String,
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  type: {
    type: String,
    enum: ['one-time', 'subscription'],
    required: true
  },
  docType: String,
  plan: String,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

transactionSchema.index({ userId: 1 })
// Removed duplicate index since unique: true already creates an index for orderId

export default mongoose.model('Transaction', transactionSchema)