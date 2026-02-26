
import { GoogleGenerativeAI } from '@google/generative-ai'
import { lexEaseData } from '../data/lexData.js'

// Lazy initialization to ensure env vars are loaded
let genAI = null;

export async function chatWithAI(message, conversation, docType) {
  try {
    // Initialize on first use
    if (!genAI && process.env.GEMINI_API_KEY) {
      genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }

    // Check if Gemini AI service is configured
    if (!genAI) {
      console.warn('GEMINI_API_KEY is missing.');
      return {
        isError: true,
        response: 'The AI service is not configured. Please set up the Gemini API key in your environment variables.',
        rawText: 'The AI service is not configured.',
        recommendation: 'AI service not configured.'
      }
    }

    return await chatWithGemini(message, conversation, docType)
  } catch (error) {
    console.error('AI service error:', error)
    return {
      isError: true,
      response: 'I apologize, but I encountered an error regarding the AI service connection. Please try again later.',
      rawText: 'System Error encountered.',
      recommendation: 'System Error encountered.'
    }
  }
}

async function chatWithGemini(message, conversation, docType) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  // --- BRAIN LOGIC START ---

  // 1. Identification – match user message against known issue profiles
  let identifiedIssue = null;
  const lowerMsg = message.toLowerCase();

  if (lexEaseData && lexEaseData.issueProfiles) {
    for (const issue of lexEaseData.issueProfiles) {
      if (issue.keywords.some(k => lowerMsg.includes(k))) {
        identifiedIssue = issue;
        break;
      }
    }
  }

  // 2. Context Building – assemble relevant knowledge for the LLM
  let brainContext = "";

  if (identifiedIssue) {
    brainContext += `\n[MATCHED ISSUE PROFILE]\n`;
    brainContext += `Issue: ${identifiedIssue.issue_name} (ID: ${identifiedIssue.issue_id})\n`;
    brainContext += `Legal Domain: ${identifiedIssue.legal_domain}\n`;
    brainContext += `Severity: ${identifiedIssue.severity}\n`;
    brainContext += `Clarifying Questions to ask if info missing: ${JSON.stringify(identifiedIssue.clarifying_questions)}\n`;

    // Map to recommended documents
    if (lexEaseData.issueToDocumentRules && lexEaseData.issueToDocumentRules[identifiedIssue.issue_id]) {
      const rules = lexEaseData.issueToDocumentRules[identifiedIssue.issue_id];

      rules.recommended_documents.forEach(doc => {
        brainContext += `\n[RECOMMENDED DOCUMENT: ${doc.document_name}]\n`;
        brainContext += `Type: ${doc.document_type}\n`;
        brainContext += `Valid When: ${doc.trigger_condition}\n`;
        brainContext += `Why This Document: ${doc.why_this_document}\n`;
        if (doc.legal_basis) {
          brainContext += `Legal Basis: ${JSON.stringify(doc.legal_basis)}\n`;
        }

        // Attach deep document knowledge
        if (lexEaseData.documentProfiles[doc.document_name]) {
          const profile = lexEaseData.documentProfiles[doc.document_name];
          brainContext += `  Who Sends: ${profile.who_sends}\n`;
          brainContext += `  Who Receives: ${profile.who_receives}\n`;
          brainContext += `  Purpose: ${profile.purpose}\n`;
          brainContext += `  Next Steps After Sending: ${JSON.stringify(profile.next_steps_after_sending)}\n`;
          if (profile.risk_if_skipped) {
            brainContext += `  Risk If Skipped: ${profile.risk_if_skipped}\n`;
          }
        }
      });
    }

    // Escalation path
    if (lexEaseData.escalationPaths && lexEaseData.escalationPaths[identifiedIssue.issue_id]) {
      brainContext += `\n[ESCALATION PATH]\n`;
      brainContext += JSON.stringify(lexEaseData.escalationPaths[identifiedIssue.issue_id], null, 2) + "\n";
    }

  } else {
    brainContext += `\n[NO SPECIFIC ISSUE PROFILE MATCHED]\n`;
    brainContext += `The user's query did not directly match a known issue profile.\n`;
    brainContext += `Try to understand their intent and either:\n`;
    brainContext += `- Ask clarifying questions to identify the right issue/document\n`;
    brainContext += `- If they mention a document by name, provide info about it\n`;
    brainContext += `- If they ask a general legal question, answer helpfully\n`;
  }

  // Available documents list (always provide for reference)
  brainContext += `\n[ALL AVAILABLE DOCUMENTS IN OUR LIBRARY]\n`;
  if (lexEaseData.availableDocuments) {
    lexEaseData.availableDocuments.forEach(d => {
      brainContext += `• ${d.name} (${d.category}) – ₹${d.price}\n`;
    });
  }

  // Behavior rules
  brainContext += `\n[BEHAVIOR RULES]\n`;
  lexEaseData.responseRules.forEach(rule => {
    brainContext += `• If ${rule.scenario}: ${rule.bot_action}\n`;
  });

  // Language simplification vocabulary
  brainContext += `\n[VOCABULARY – Use these simple explanations for legal terms]\n`;
  Object.entries(lexEaseData.languageSimplification).forEach(([term, explanation]) => {
    brainContext += `• ${term}: ${explanation}\n`;
  });

  // --- BRAIN LOGIC END ---

  const systemPrompt = `You are LexEase, a friendly and knowledgeable legal assistant for Indian Law built into the LexEase platform.

YOUR CORE PURPOSE:
You help everyday people understand their legal situation, recommend the right legal document from our library, and guide them step-by-step. You are action-oriented — you don't just advise, you point users to the exact document they need and explain how to use it.

YOUR KNOWLEDGE BASE FOR THIS QUERY:
${brainContext}

GUIDELINES (follow strictly):

1. **IDENTIFY THE PROBLEM**: Understand what the user needs. If a [MATCHED ISSUE PROFILE] was found, use it.

2. **ASK CLARIFYING QUESTIONS**: If key details are missing (check the clarifying questions list), ask them conversationally — one or two at a time, not all at once.

3. **RECOMMEND A DOCUMENT**: Once you understand the situation, recommend the specific document from [RECOMMENDED DOCUMENT] or [ALL AVAILABLE DOCUMENTS]. Always mention the document name exactly as listed. Say something like:
   "I'd recommend you get a **Rent Agreement** from our Docs Library."

4. **EXPLAIN CLEARLY**: For any recommended document, explain:
   - What it does (in simple language)
   - Who sends/signs it
   - Why it's important
   - What happens after you send/sign it

5. **SIMPLIFY LEGAL TERMS**: Whenever you use a legal term, explain it in plain language using the [VOCABULARY] section.

6. **GUIDE TO ACTION**: Direct users to the **Docs Library** page on LexEase to find and draft their document. If their issue is complex, suggest the **Lawyer Connect** page.

7. **TONE**: Be warm, empathetic, professional, and encouraging. Speak like a helpful friend who happens to know law. Use simple English. Avoid legal jargon unless you explain it immediately.

8. **SAFETY**: Never give advice that could be illegal. If someone asks for something unlawful, politely refuse and suggest the legal alternative.

9. **FORMATTING**: Use short paragraphs. Use bullet points or numbered lists for steps. Bold important document names. Keep responses concise but complete — aim for 3-6 short paragraphs max.

10. **SCOPE**: You are a legal document assistant, not a lawyer. Always remind users that for complex cases they should consult a professional lawyer (available through our Lawyer Connect feature).

${docType ? `ADDITIONAL CONTEXT: The user is currently interested in or viewing: ${docType}` : ''}
`;

  // Build conversation for the model
  let fullPrompt = `${systemPrompt}\n\n[CONVERSATION HISTORY]\n`;
  if (conversation && conversation.length > 0) {
    // Only include last 10 messages to avoid context overflow
    const recentConversation = conversation.slice(-10);
    recentConversation.forEach(msg => {
      fullPrompt += `${msg.role === 'user' ? 'User' : 'LexEase'}: ${msg.content}\n`;
    });
  }
  fullPrompt += `User: ${message}\nLexEase:`;

  // Retry logic for rate limiting
  const maxRetries = 2;
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        const delay = attempt * 5000; // 5s, 10s
        console.log(`Retry attempt ${attempt}, waiting ${delay / 1000}s...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();
      return parseLexEaseResponse(text, identifiedIssue);

    } catch (error) {
      lastError = error;
      console.error(`Gemini attempt ${attempt + 1} error:`, error.message || error);

      // Only retry on rate limit (429) errors
      const isRateLimit = error.message && (error.message.includes('429') || error.message.includes('quota') || error.message.includes('retry'));
      if (!isRateLimit || attempt === maxRetries) {
        break;
      }
    }
  }

  // If all retries failed, try fallback model
  if (lastError?.message && (lastError.message.includes('not found') || lastError.message.includes('not supported'))) {
    try {
      console.log("Trying fallback model gemini-2.0-flash...");
      const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const result = await fallbackModel.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();
      return parseLexEaseResponse(text, identifiedIssue);
    } catch (fallbackError) {
      console.error("Fallback model also failed:", fallbackError.message || fallbackError);
    }
  }

  return {
    isError: true,
    response: "I'm having trouble connecting right now. Please try again in a moment.",
    rawText: "Connection Error",
    recommendation: "Connection Error"
  };
}


function parseLexEaseResponse(text, identifiedIssue) {
  // Determine if the response recommends generating a document
  const lowerText = text.toLowerCase();
  const suggestsDoc = lowerText.includes("shall we prepare") ||
    lowerText.includes("generate this") ||
    lowerText.includes("create this document") ||
    lowerText.includes("draft this") ||
    lowerText.includes("docs library") ||
    lowerText.includes("start drafting");

  // Extract the recommended document name
  let documentType = null;
  if (identifiedIssue && lexEaseData.issueToDocumentRules[identifiedIssue.issue_id]) {
    documentType = lexEaseData.issueToDocumentRules[identifiedIssue.issue_id]
      ?.recommended_documents[0]?.document_name || null;
  }

  return {
    response: text,
    isError: false,
    rawText: text,
    suggestGenerate: suggestsDoc,
    documentType: documentType
  };
}
