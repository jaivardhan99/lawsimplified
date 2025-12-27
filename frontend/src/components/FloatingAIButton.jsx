import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import apiClient from '../utils/apiClient';

const FloatingAIButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const getInitialMessage = async () => {
    setLoading(true);
    try {
      const res = await apiClient.post('/api/chat', { message: 'Hi', conversation: [] });
      const assistantMessage = {
        role: 'assistant',
        content: res.data.rawText,
      };
      setMessages([assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages([errorMessage]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      getInitialMessage();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await apiClient.post('/api/chat', {
        message: input,
        conversation: messages,
      });

      const assistantMessage = {
        role: 'assistant',
        content: res.data.rawText, // Using rawText for now
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    setLoading(false);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-xl shadow-xl w-80 h-96 flex flex-col border border-gray-200">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-deep-blue to-primary-800 p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gold-500 p-2 rounded-full">
                <Bot className="w-5 h-5 text-deep-blue" />
              </div>
              <h3 className="text-soft-white font-semibold">Legal Assistant</h3>
            </div>
            <button 
              onClick={toggleChat}
              className="text-soft-white hover:text-gold-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex mb-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white rounded-br-none'
                      : 'bg-white text-gray-900 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start mb-3">
                <div className="bg-white rounded-2xl p-3 rounded-bl-none shadow-sm">
                  <div className="flex space-x-1">
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
          <div className="p-3 border-t border-gray-200 bg-white rounded-b-xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-deep-blue p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
          aria-label="Open help chat"
        >
          <Bot className="w-6 h-6 group-hover:animate-pulse" />
        </button>
      )}
    </div>
  );
};

export default FloatingAIButton;
