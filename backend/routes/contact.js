import express from 'express'
import { sendContactEmail } from '../services/emailService.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Send email
    try {
      await sendContactEmail({ name, email, subject, message })
      res.json({ success: true, message: 'Message sent successfully' })
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      res.status(500).json({ error: 'Failed to send message' })
    }
  } catch (error) {
    console.error('Contact error:', error)
    res.status(500).json({ error: 'Failed to process contact form' })
  }
})

export default router

