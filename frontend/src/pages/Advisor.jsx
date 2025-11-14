import { useState, useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Send, Download, FileText, HelpCircle, Bot } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

const Advisor = () => {
  const [searchParams] = useSearchParams()
  const docType = searchParams.get('docType')
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [docPreview, setDocPreview] = useState(null)
  const [showPayment, setShowPayment] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (docType) {
      const initialMessage = {
        role: 'assistant',
        content: `I can help you create a ${docType}. Please describe your requirements, or I can guide you through a series of questions.`
      }
      setMessages([initialMessage])
      setInput(`I need to create a ${docType}`)
    } else {
      const welcomeMessage = {
        role: 'assistant',
        content: 'Hello! I\'m your legal guide. I can help you create legal documents, answer questions, and guide you through the process. What do you need help with today?'
      }
      setMessages([welcomeMessage])
    }
  }, [docType])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await axios.post('/api/chat', {
        message: input,
        conversation: messages,
        docType: docType || null
      })

      const assistantMessage = {
        role: 'assistant',
        content: response.data.response
      }

      setMessages(prev => [...prev, assistantMessage])

      // Check if AI suggests document generation
      if (response.data.suggestGenerate) {
        setDocPreview(response.data.preview)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateDoc = async () => {
    if (!user) {
      alert('Please sign in to generate documents')
      return
    }

    try {
      const response = await axios.post('/api/generateDoc', {
        docType: docType || 'Custom Document',
        conversation: messages,
        userId: user.uid
      })

      setDocPreview(response.data.document)
      setShowPayment(true)
    } catch (error) {
      console.error('Error generating document:', error)
      alert('Failed to generate document. Please try again.')
    }
  }

  const handleDownload = async (format) => {
    if (!user) {
      alert('Please sign in to download documents')
      return
    }

    // Check if user has paid or has subscription
    // For now, show payment flow
    setShowPayment(true)
  }

  const handlePayment = async () => {
    // Razorpay payment integration
    try {
      const response = await axios.post('/api/payment', {
        amount: 29900, // ₹299 in paise
        userId: user.uid,
        docType: docType || 'Document'
      })

      // Load Razorpay script and initialize
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: response.data.amount,
          currency: 'INR',
          name: 'LexEase',
          description: `Payment for ${docType || 'Document'}`,
          order_id: response.data.orderId,
          handler: async (response) => {
            // Verify payment
            const verifyResponse = await axios.post('/api/payment/verify', {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature
            })

            if (verifyResponse.data.success) {
              alert('Payment successful! You can now download the document.')
              setShowPayment(false)
            } else {
              alert('Payment verification failed')
            }
          },
          prefill: {
            email: user.email,
            name: user.displayName || ''
          },
          theme: {
            color: '#0067ff'
          }
        }

        const razorpay = new window.Razorpay(options)
        razorpay.open()
      }
      document.body.appendChild(script)
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment initialization failed')
    }
  }

  return (
    <div className="min-h-screen bg-soft-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg h-[600px] flex flex-col border border-gray-200">
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-deep-blue to-primary-800 rounded-t-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-gold-500 p-2 rounded-full">
                    <Bot className="w-6 h-6 text-deep-blue" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-soft-white">Legal Advisor</h2>
                    {docType && (
                      <p className="text-sm text-gold-300">Document: {docType}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        msg.role === 'user'
                          ? 'bg-primary-600 text-white rounded-br-none'
                          : 'bg-white text-gray-900 rounded-bl-none shadow-md'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white rounded-2xl p-4 rounded-bl-none shadow-md">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm transition duration-300"
                    disabled={loading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transform hover:scale-105"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Document Preview */}
            {docPreview && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-semibold text-deep-blue">Document Preview</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto mb-4 border border-gray-200">
                  <pre className="text-sm whitespace-pre-wrap text-gray-700">{docPreview.substring(0, 500)}...</pre>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload('pdf')}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    PDF
                  </button>
                  <button
                    onClick={() => handleDownload('word')}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    Word
                  </button>
                </div>
              </div>
            )}

            {/* Generate Document Button */}
            {!docPreview && messages.length > 1 && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <button
                  onClick={handleGenerateDoc}
                  className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-deep-blue px-4 py-3 rounded-lg transition duration-300 font-semibold transform hover:scale-105"
                >
                  Generate Document
                </button>
              </div>
            )}

            {/* Help Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-semibold text-deep-blue">Need Help?</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Connect with a qualified lawyer for personalized legal advice.
              </p>
              <Link
                to="/lawyer-connect"
                className="block text-center bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition duration-300 font-semibold transform hover:scale-105"
              >
                Connect with Lawyer
              </Link>
            </div>
          </div>
        </div>

        {/* Payment Modal */}
        {showPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
              <h3 className="text-2xl font-bold mb-4 text-deep-blue">Complete Payment</h3>
              <p className="text-gray-600 mb-6">
                To download this document, please complete the payment of ₹299.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handlePayment}
                  className="flex-1 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-deep-blue px-6 py-3 rounded-lg transition duration-300 font-semibold transform hover:scale-105"
                >
                  Pay Now
                </button>
                <button
                  onClick={() => setShowPayment(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300 transform hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Advisor
