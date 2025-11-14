import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI client
const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null

// Always use Gemini since we're switching to it exclusively
const USE_GEMINI = true

export async function chatWithAI(message, conversation, docType) {
  try {
    // Check if Gemini AI service is configured
    if (!genAI) {
      return {
        text: 'I apologize, but the AI service is not configured. Please set up the Gemini API key in the environment variables. For now, I can help you understand that you need a ' + (docType || 'legal document') + '. Would you like me to guide you through the process?',
        suggestGenerate: false,
        preview: null
      }
    }

    // Always use Gemini
    return await chatWithGemini(message, conversation, docType)
  } catch (error) {
    console.error('AI service error:', error)
    // Return a fallback response instead of throwing
    return {
      text: 'I apologize, but I encountered an error. Please try again or contact support if the issue persists.',
      suggestGenerate: false,
      preview: null
    }
  }
}

async function chatWithGemini(message, conversation, docType) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const systemPrompt = `You are a helpful AI legal advisor for LexEase, an Indian legal documentation platform. 
Your role is to:
1. Understand user's legal document needs
2. Ask clarifying questions to gather necessary information
3. Suggest appropriate legal documents
4. Guide users through the document creation process
5. Be professional, clear, and helpful
6. Focus on Indian legal requirements

${docType ? `The user is interested in creating a ${docType} document.` : ''}

When the user has provided enough information, suggest generating the document.`

  const conversationText = conversation
    .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
    .join('\n')

  const prompt = `${systemPrompt}\n\nConversation history:\n${conversationText}\n\nUser: ${message}\n\nAssistant:`

  const result = await model.generateContent(prompt)
  const aiResponse = result.response.text()

  const suggestGenerate = aiResponse.toLowerCase().includes('generate') || 
                          aiResponse.toLowerCase().includes('ready to create') ||
                          conversation.length > 5

  return {
    text: aiResponse,
    suggestGenerate,
    preview: suggestGenerate ? generatePreview(docType || 'Document') : null
  }
}

function generatePreview(docType) {
  return `Document Preview for ${docType}:

This is a preview of your generated document. The full document will include all the details you've provided during our conversation.

To download the complete document in PDF or Word format, please complete the payment process.

[Document content will be generated based on your inputs]`
}

