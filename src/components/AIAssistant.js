'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Sparkles,
  X,
  Send,
  User,
  RotateCcw,
  Maximize2,
  Minimize2,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

const SUGGESTIONS = [
  'Who is Deeptha Ranaweera?',
  'Chat on WhatsApp 💬',
  'Summarize top projects',
  'Tell me about work experience',
  'What is the tech stack?'
];

// Helper to parse markdown links and bold formatting safely
function FormattedMessage({ text }) {
  if (!text) return null;

  // Pattern for markdown links: [link text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
    }
    parts.push({ type: 'link', text: match[1], url: match[2] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.substring(lastIndex) });
  }

  return (
    <span className="inline-block w-full">
      {parts.map((p, idx) => {
        if (p.type === 'link') {
          const isWhatsApp = p.url.includes('wa.me');
          return (
            <a
              key={idx}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={
                isWhatsApp
                  ? 'inline-flex items-center gap-1.5 px-3 py-1.5 my-1.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-xs shadow-md shadow-green-600/20 transition-all'
                  : 'text-primary underline font-semibold hover:text-primary/80 transition-colors'
              }
            >
              {isWhatsApp && <MessageCircle className="w-3.5 h-3.5" />}
              {p.text}
              {!isWhatsApp && <ExternalLink className="w-3 h-3 inline ml-0.5" />}
            </a>
          );
        }

        // Format bold text **bold**
        const subParts = p.content.split(/\*\*(.*?)\*\*/g);
        return (
          <span key={idx}>
            {subParts.map((sub, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="font-semibold text-foreground">
                  {sub}
                </strong>
              ) : (
                sub
              )
            )}
          </span>
        );
      })}
    </span>
  );
}

export default function AIAssistant({ portfolioData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hi there! 👋 I'm the AI Portfolio Copilot for **${portfolioData?.personalInfo?.name || 'Deeptha Ranaweera'}**. \n\nAsk me anything about Deeptha's projects, work experience, tech stack, or click below to connect directly on WhatsApp!`
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const cleanPhone = (portfolioData?.personalInfo?.phone || '').replace(/[^0-9]/g, '');
  const developerName = portfolioData?.personalInfo?.name || 'Deeptha Ranaweera';
  const waUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        `Hi ${developerName}, I'm reaching out from your portfolio and would like to connect!`
      )}`
    : null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isFullScreen]);

  const handleSend = async (userText) => {
    const textToSend = typeof userText === 'string' ? userText : inputValue;
    if (!textToSend.trim() || isLoading) return;

    // Special trigger: If user clicks WhatsApp suggestion
    if (textToSend.includes('WhatsApp') && waUrl) {
      window.open(waUrl, '_blank');
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'user',
          text: textToSend
        },
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: `Opening WhatsApp chat with **${developerName}**! 📱\n\nIf it didn't open automatically, [Click Here to Chat on WhatsApp](${waUrl}).`
        }
      ]);
      setInputValue('');
      return;
    }

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend.trim()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          portfolioData: portfolioData || {}
        })
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: data.reply
          }
        ]);
      } else {
        throw new Error(data.error || 'Failed to get answer');
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: `I'm having a brief moment processing that, but you can explore ${developerName}'s work on the Projects and About pages, or [Chat Directly on WhatsApp](${waUrl || 'https://wa.me'})!`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: `Chat reset. What else would you like to know about ${developerName}?`
      }
    ]);
  };

  return (
    <>
      {/* Dimmed backdrop when in Full View mode */}
      {isOpen && isFullScreen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsFullScreen(false)}
        />
      )}

      <div className={`fixed ${isFullScreen ? 'inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 pointer-events-none' : 'bottom-6 right-6 z-50'}`}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`bg-card border border-border shadow-2xl flex flex-col overflow-hidden pointer-events-auto transition-all duration-300 ${
                isFullScreen
                  ? 'w-full max-w-4xl h-[90vh] rounded-3xl'
                  : 'w-[92vw] sm:w-[440px] h-[580px] max-h-[85vh] rounded-2xl mb-3'
              }`}
            >
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-primary via-indigo-600 to-primary text-white flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white ring-1 ring-black/10 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                      Portfolio AI Copilot
                      <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                    </h3>
                    <p className="text-xs text-white/80">
                      {isFullScreen ? 'Full View Interactive Assistant' : 'Always ready to answer questions'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Direct WhatsApp Quick Link */}
                  {waUrl && (
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-white text-xs font-semibold transition-colors border border-green-400/30 mr-1"
                      title="Direct WhatsApp Chat"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-green-300" />
                      <span>WhatsApp</span>
                    </a>
                  )}

                  {/* Expand / Minimize Full View Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsFullScreen((prev) => !prev)}
                    className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    title={isFullScreen ? 'Exit full view' : 'Expand to full view'}
                  >
                    {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>

                  {/* Reset conversation */}
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    title="Reset conversation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  {/* Close modal */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setIsFullScreen(false);
                    }}
                    className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    title="Close chat"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-sm bg-background/50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        isFullScreen ? 'max-w-[75%]' : 'max-w-[85%]'
                      } ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-card border border-border text-foreground shadow-xs rounded-bl-none'
                      }`}
                    >
                      <FormattedMessage text={msg.text} />
                    </div>

                    {msg.sender === 'user' && (
                      <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 items-center text-muted-foreground text-xs py-2">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 animate-spin" />
                    </div>
                    <div className="flex items-center gap-1.5 bg-card border border-border px-3 py-2 rounded-xl">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestions Chips */}
              <div className="px-3 sm:px-4 py-2 border-t border-border bg-card/60 overflow-x-auto flex gap-2 no-scrollbar">
                {SUGGESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(item)}
                    disabled={isLoading}
                    className="px-3 py-1.5 text-xs rounded-full border border-border bg-card hover:border-primary hover:text-primary transition-colors whitespace-nowrap text-muted-foreground font-medium flex items-center gap-1 shrink-0"
                  >
                    {item.includes('WhatsApp') && <MessageCircle className="w-3 h-3 text-green-500" />}
                    {item}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-3 sm:p-4 border-t border-border bg-card flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about projects, skills, experience, or direct connect..."
                  className="flex-1 px-4 py-2.5 text-sm bg-muted/50 border border-border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity flex items-center gap-1.5 font-semibold text-xs sm:text-sm"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Trigger Button */}
        {!isOpen && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-primary to-indigo-600 text-white shadow-xl hover:shadow-primary/30 transition-shadow duration-300 group"
            aria-label="Toggle AI Assistant"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400" />
            </span>
            <div className="flex items-center gap-1.5 font-semibold text-sm">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Ask AI</span>
            </div>
          </motion.button>
        )}
      </div>
    </>
  );
}
