import express from 'express'
import { chatWithAI } from '../services/aiService.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { message, conversation, docType } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const response = await chatWithAI(message, conversation || [], docType)

    res.json(response)
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ 
      isError: true,
      rawText: 'Failed to process chat message',
      recommendation: 'I am sorry, but I encountered an error. Please try again later.'
    })
  }
})

export default router

