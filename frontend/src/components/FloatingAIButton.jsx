import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';

// Simple markdown-like renderer for bold and bullet points
const FormattedMessage = ({ text }) => {
  if (!text) return null;

  const lines = text.split('\n');
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;

        // Bullet points
        const isBullet = /^[\s]*[-•*]\s/.test(line) || /^[\s]*\d+[.)]\s/.test(line);

        // Process bold text (**text**)
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        const rendered = parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-semibold text-primary-700">{part.slice(2, -2)}</strong>;
          }
          return <span key={j}>{part}</span>;
        });

        if (isBullet) {
          return (
            <div key={i} className="flex gap-2 ml-1">
              <span className="text-primary-400 mt-0.5 flex-shrink-0 text-xs">●</span>
              <span className="leading-relaxed">{rendered}</span>
            </div>
          );
        }

        return <p key={i} className="leading-relaxed">{rendered}</p>;
      })}
    </div>
  );
};

const QUICK_PROMPTS = [
  { label: '📄 Need a document', message: 'I need help choosing the right legal document' },
  { label: '🏠 Rent issues', message: 'I have a rent or tenancy related issue' },
  { label: '💼 Business help', message: 'I need help with a business agreement' },
  { label: '👤 Personal legal', message: 'I need help with a personal legal document' },
];

const FloatingAIButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        role: 'assistant',
        content: `Hi${user?.displayName ? ' ' + user.displayName : ''}! 👋 I'm your **LexEase Legal Assistant**.\n\nI can help you:\n- Find the right legal document for your situation\n- Understand legal terms in simple language\n- Guide you through the document creation process\n\nWhat do you need help with today?`
      };
      setMessages([welcomeMessage]);
      setShowQuickPrompts(true);
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (messageText) => {
    const text = messageText || input.trim();
    if (!text || loading) return;

    const userMessage = { role: 'user', content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setShowQuickPrompts(false);

    try {
      const res = await apiClient.post('/api/chat', {
        message: text,
        conversation: messages,
      });

      const assistantMessage = {
        role: 'assistant',
        content: res.data.response || res.data.rawText,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error connecting to the AI service. Please try again in a moment.',
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    setLoading(false);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleQuickPrompt = (prompt) => {
    handleSend(prompt.message);
  };

  return (
    <div className="fixed z-50 pointer-events-none" style={{ bottom: '24px', right: '24px' }}>
      {/* Chat Window */}
      <div
        className={`transition-all duration-400 origin-bottom-right ${isOpen
          ? 'opacity-100 scale-100 pointer-events-auto visible'
          : 'opacity-0 scale-90 pointer-events-none invisible'
          }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDuration: isOpen ? '0.4s' : '0.2s',
        }}
      >
        <div className="bg-white rounded-2xl shadow-2xl w-[calc(100vw-32px)] sm:w-[380px] h-[min(520px,80vh)] flex flex-col border border-gray-200/80 overflow-hidden"
          style={{ boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.3)' }}>
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-deep-blue via-primary-800 to-deep-blue p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-gold-500 p-2 rounded-xl shadow-lg shadow-gold-500/30">
                <Bot className="w-5 h-5 text-deep-blue" />
              </div>
              <div>
                <h3 className="text-soft-white font-semibold text-sm">LexEase Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-300/80">Powered by AI</span>
                </div>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-soft-white/70 hover:text-soft-white transition-colors p-1.5 rounded-lg hover:bg-white/10 active:bg-white/20"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50/80 to-white space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} ${idx === messages.length - 1 ? 'animate-fade-in-up' : ''
                  }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mr-2 mt-1 flex-shrink-0 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-primary-600" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl p-3.5 text-sm leading-relaxed ${msg.role === 'user'
                    ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-br-md shadow-md shadow-primary-500/20'
                    : 'bg-white text-gray-700 rounded-bl-md shadow-sm border border-gray-100'
                    }`}
                >
                  {msg.role === 'assistant' ? (
                    <FormattedMessage text={msg.content} />
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {/* Quick Prompts */}
            {showQuickPrompts && messages.length <= 1 && !loading && (
              <div className="flex flex-wrap gap-2 mt-3 animate-fade-in-up">
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="text-xs bg-white border border-primary-200 text-primary-700 px-3.5 py-2 rounded-xl hover:bg-primary-50 hover:border-primary-300 hover:shadow-sm transition-all duration-200 active:scale-95"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex justify-start animate-fade-in-up">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-primary-600" />
                </div>
                <div className="bg-white rounded-2xl px-4 py-3 rounded-bl-md shadow-sm border border-gray-100">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-primary-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100 bg-white flex-shrink-0">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about any legal document..."
                className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-gray-50 hover:bg-white transition-all duration-200 min-h-0"
                disabled={loading}
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="bg-primary-600 hover:bg-primary-500 text-white p-2.5 rounded-xl transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0 active:scale-90 hover:shadow-md hover:shadow-primary-500/25"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className={`pointer-events-auto group relative bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-deep-blue p-4 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center pulse-glow active:scale-90 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
          }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        aria-label="Open help chat"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
      </button>
    </div>
  );
};

export default FloatingAIButton;
