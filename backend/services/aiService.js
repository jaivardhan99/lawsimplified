
import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { promises as fs } from 'fs'
import { join } from 'path'

// Lazy initialization to ensure env vars are loaded
let genAI = null;

// Always use Gemini since we're switching to it exclusively
const USE_GEMINI = true

export async function chatWithAI(message, conversation, docType) {
  try {
    // Initialize on first use
    if (!genAI && process.env.GEMINI_API_KEY) {
      genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }

    // Check if Gemini AI service is configured
    if (!genAI) {
      return {
        isError: true,
        rawText: 'The AI service is not configured. Please set up the Gemini API key.',
        recommendation: 'AI service not configured.'
      }
    }

    // Always use Gemini
    return await chatWithGemini(message, conversation, docType)
  } catch (error) {
    console.error('AI service error:', error)
    return {
      isError: true,
      rawText: 'I apologize, but I encountered an error. Please try again or contact support if the issue persists.',
      recommendation: 'I apologize, but I encountered an error.'
    }
  }
}

async function chatWithGemini(message, conversation, docType) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  // Read system prompt from file
  let systemPrompt = ''
  try {
    const promptPath = join(process.cwd(), 'chatbotinfo.txt')
    systemPrompt = await fs.readFile(promptPath, 'utf-8')
  } catch (err) {
    console.error('Failed to read chatbotinfo.txt:', err)
    // Fallback minimal prompt
    systemPrompt = 'You are LexEase, a legal assistant. Please answer user queries about legal documents.'
  }

  // Append context
  systemPrompt += `\n\n${docType ? `The user is interested in creating a ${docType} document.` : ''} `

  const conversationText = conversation
    .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content} `)
    .join('\n');

  const prompt = `${systemPrompt} \n\nConversation history: \n${conversationText} \n\nUser: ${message} \n\nAssistant: `;

  const result = await model.generateContent(prompt);

  if (!result.response || !result.response.text) {
    console.error("AI response was blocked or empty.", JSON.stringify(result, null, 2));
    return {
      isError: true,
      rawText: "I'm sorry, I couldn't generate a response. This might be due to a content policy.",
      recommendation: "I'm sorry, I couldn't generate a response."
    };
  }

  const aiResponse = result.response.text();
  return parseLexEaseResponse(aiResponse);
}

function parseLexEaseResponse(text) {
  const lines = text.split('\n').filter(line => line.trim() !== '');

  let recommendation = '';
  let explanation = '';
  let questions = [];
  let disclaimer = '';
  let isComplete = false;
  let isError = false;
  let documentType = null;


  if (text.includes("This may require legal advice.")) {
    return {
      isError: true,
      rawText: text,
      recommendation: "This may require legal advice. I can connect you with a lawyer."
    }
  }

  // Simple parsing based on keywords
  try {
    recommendation = lines[0] || '';
    const docMatch = recommendation.match(/You may need a (.+)\./);
    if (docMatch && docMatch[1]) {
      documentType = docMatch[1].replace(/an? /, '');
    }

    explanation = lines[1] || '';

    const questionStartIndex = lines.findIndex(line => line.startsWith('-'));
    const disclaimerStartIndex = lines.findIndex(line => line.startsWith('This is general guidance'));

    if (questionStartIndex !== -1) {
      const endSlice = disclaimerStartIndex !== -1 ? disclaimerStartIndex : lines.length;
      questions = lines.slice(questionStartIndex, endSlice).map(q => q.substring(1).trim());
    }

    if (disclaimerStartIndex !== -1) {
      disclaimer = lines[disclaimerStartIndex];
    } else {
      disclaimer = "This is general guidance, not legal advice."; // Fallback
    }

    if (lines.some(l => l.toLowerCase().includes("shall we prepare it?"))) {
      isComplete = true;
    }

  } catch (e) {
    // If parsing fails, return the raw text
    return { rawText: text };
  }


  return {
    recommendation,
    explanation,
    questions,
    disclaimer,
    documentType,
    isComplete,
    isError,
    rawText: text, // for debugging
  };
}

