import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null

// Always use Gemini since we're switching to it exclusively
const USE_GEMINI = true

export async function generateDocument(template, conversation) {
  try {
    // Extract relevant information from conversation
    const userInputs = extractUserInputs(conversation)
    
    // Fill template with user inputs
    let document = template.templateContent

    // Replace placeholders with user inputs
    template.fields.forEach(field => {
      const value = userInputs[field.name] || `[${field.name}]`
      document = document.replace(new RegExp(`\\[${field.name}\\]`, 'g'), value)
    })

    // Use Gemini to refine the document
    if (genAI) {
      document = await refineWithGemini(document, conversation, template.name)
    }

    return document
  } catch (error) {
    console.error('Document generation error:', error)
    throw error
  }
}

function extractUserInputs(conversation) {
  const inputs = {}
  
  conversation.forEach(msg => {
    if (msg.role === 'user') {
      // Simple extraction - in production, use more sophisticated NLP
      const text = msg.content.toLowerCase()
      
      // Extract common fields
      if (text.includes('name')) {
        const match = msg.content.match(/name[:\s]+([^\n,]+)/i)
        if (match) inputs['name'] = match[1].trim()
      }
      if (text.includes('address')) {
        const match = msg.content.match(/address[:\s]+([^\n]+)/i)
        if (match) inputs['address'] = match[1].trim()
      }
      if (text.includes('date')) {
        const match = msg.content.match(/date[:\s]+([^\n,]+)/i)
        if (match) inputs['date'] = match[1].trim()
      }
      if (text.includes('amount') || text.includes('price')) {
        const match = msg.content.match(/(?:amount|price)[:\s]+([^\n,]+)/i)
        if (match) inputs['amount'] = match[1].trim()
      }
    }
  })

  return inputs
}

async function refineWithGemini(document, conversation, docType) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const prompt = `You are a legal document generator. Refine the following ${docType} document based on the conversation context. 
Ensure it follows Indian legal standards and includes all necessary clauses.

Conversation summary:
${conversation.map(m => `${m.role}: ${m.content}`).join('\n')}

Document template:
${document}

Generate a complete, professional legal document. Return only the document text, no explanations.`

  const result = await model.generateContent(prompt)
  return result.response.text()
}