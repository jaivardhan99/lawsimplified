import express from 'express'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import Transaction from '../models/Transaction.js'
import User from '../models/User.js'

const router = express.Router()

let razorpay = null
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  })
} else {
  console.warn('Razorpay not configured. Payment features will be disabled.')
}

// Create payment order
router.post('/', async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(503).json({ error: 'Payment service is not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in environment variables.' })
    }

    const { amount, userId, plan, docType } = req.body

    if (!amount || !userId) {
      return res.status(400).json({ error: 'Amount and userId are required' })
    }

    const options = {
      amount: amount, // amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    }

    const order = await razorpay.orders.create(options)

    // Save transaction
    const transaction = new Transaction({
      userId,
      orderId: order.id,
      amount,
      type: plan === 'subscription' ? 'subscription' : 'one-time',
      docType: docType || null,
      plan: plan || null,
      status: 'pending',
      razorpayOrderId: order.id
    })

    await transaction.save()

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    })
  } catch (error) {
    console.error('Payment creation error:', error)
    res.status(500).json({ error: 'Failed to create payment order' })
  }
})

// Verify payment
router.post('/verify', async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(503).json({ error: 'Payment service is not configured.', success: false })
    }

    const { orderId, paymentId, signature, plan } = req.body

    if (!orderId || !paymentId || !signature) {
      return res.status(400).json({ error: 'Missing payment details' })
    }

    // Verify signature
    const text = `${orderId}|${paymentId}`
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex')

    if (generatedSignature !== signature) {
      return res.status(400).json({ error: 'Invalid signature', success: false })
    }

    // Update transaction
    const transaction = await Transaction.findOne({ razorpayOrderId: orderId })
    if (transaction) {
      transaction.status = 'completed'
      transaction.paymentId = paymentId
      transaction.razorpayPaymentId = paymentId
      transaction.razorpaySignature = signature
      await transaction.save()

      // Update user subscription if it's a subscription payment
      if (plan === 'subscription') {
        const user = await User.findOne({ firebaseUid: transaction.userId })
        if (user) {
          user.subscription.type = 'pro'
          user.subscription.startDate = new Date()
          const endDate = new Date()
          endDate.setMonth(endDate.getMonth() + 1)
          user.subscription.endDate = endDate
          user.subscription.isActive = true
          await user.save()
        }
      } else {
        // Increment document count for one-time payment
        const user = await User.findOne({ firebaseUid: transaction.userId })
        if (user) {
          user.documentsGenerated += 1
          await user.save()
        }
      }
    }

    res.json({ success: true, transactionId: transaction?._id })
  } catch (error) {
    console.error('Payment verification error:', error)
    res.status(500).json({ error: 'Payment verification failed', success: false })
  }
})

export default router

