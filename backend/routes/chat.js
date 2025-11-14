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

    res.json({
      response: response.text,
      suggestGenerate: response.suggestGenerate || false,
      preview: response.preview || null
    })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: 'Failed to process chat message' })
  }
})

export default router

