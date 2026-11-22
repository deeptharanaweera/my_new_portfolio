'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowUpRight,
  Bot,
  Copy,
  CornerDownLeft,
  Loader2,
  Send,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const starterQuestions = [
  'Which project best demonstrates full-stack architecture?',
  'Summarize recent work and primary technical focus',
  'What databases and cloud platforms are used most?',
  'How can we collaborate or get in touch for a role?',
];

// Simple helper to render text with markdown links like [Title](/projects/id)
const FormattedAssistantText = ({ content }) => {
  if (!content) return null;

  // Split by link pattern: [Link Text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        value: content.substring(lastIndex, match.index),
      });
    }
    parts.push({
      type: 'link',
      text: match[1],
      href: match[2],
    });
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < content.length) {
    parts.push({
      type: 'text',
      value: content.substring(lastIndex),
    });
  }

  return (
    <div className="whitespace-pre-wrap leading-relaxed text-sm">
      {parts.map((p, idx) => {
        if (p.type === 'link') {
          const isInternal = p.href.startsWith('/');
          return isInternal ? (
            <Link
              key={idx}
              href={p.href}
              className="inline-flex items-center gap-0.5 text-primary font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              <span>{p.text}</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          ) : (
            <a
              key={idx}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-primary font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              <span>{p.text}</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          );
        }
        return <span key={idx}>{p.value}</span>;
      })}
    </div>
  );
};

const AIAssistantDrawer = ({ isOpen, onClose, onOpen, portfolioData }) => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am ${portfolioData?.personalInfo?.name || 'the'}'s AI Portfolio Assistant, powered by Gemini. You can ask me anything about the architecture of projects, technical competencies, or professional experience.`,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query || loading) return;

    setApiError(null);
    const userMessage = {
      id: String(Date.now()),
      role: 'user',
      content: query,
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: newHistory.map((m) => ({ role: m.role, content: m.content })),
          portfolioData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'API_KEY_MISSING') {
          setApiError(data.message);
        } else {
          setApiError(data.message || 'AI assistant encountered an unexpected error.');
        }
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          role: 'assistant',
          content: data.reply,
        },
      ]);
    } catch (err) {
      console.error('AI chat failed:', err);
      setApiError('Unable to connect to the portfolio AI endpoint. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Bottom-Right Always-Visible Trigger Button */}
      {!isOpen && onOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpen}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-foreground text-background shadow-2xl hover:shadow-primary/20 border border-border/80 group transition-all duration-300 backdrop-blur-md cursor-pointer"
          aria-label="Open AI Portfolio Assistant"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute -inset-1 rounded-full bg-primary/40 animate-ping opacity-60" />
            <div className="relative w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center border border-primary/30">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold tracking-tight text-background leading-none flex items-center gap-1">
              Ask AI
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </span>
            <span className="text-[10px] font-mono text-background/70 leading-tight mt-0.5">
              Portfolio Assistant
            </span>
          </div>
        </motion.button>
      )}

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-card border-l border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                    Studio AI Assistant
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      Grounded
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Ask questions regarding projects & architecture
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
                aria-label="Close Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error Notification */}
            {apiError && (
              <div className="mx-4 mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium">AI Service Notice</p>
                  <p className="opacity-90">{apiError}</p>
                </div>
              </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        isUser
                          ? 'bg-primary text-primary-foreground rounded-br-xs'
                          : 'bg-muted/60 text-foreground border border-border/60 rounded-bl-xs'
                      }`}
                    >
                      {isUser ? (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      ) : (
                        <FormattedAssistantText content={msg.content} />
                      )}
                    </div>

                    {isUser && (
                      <div className="w-7 h-7 rounded-full bg-muted text-muted-foreground border border-border flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {loading && (
                <div className="flex gap-3 items-center text-muted-foreground text-xs py-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                  <span>Analyzing portfolio architecture & drafting answer...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Starter Prompts */}
            {messages.length <= 2 && !loading && (
              <div className="p-4 pt-0 space-y-1.5">
                <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  Suggested Prompts
                </p>
                <div className="flex flex-col gap-1.5">
                  {starterQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="text-left text-xs p-2 rounded-lg bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/40 transition-colors duration-150"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-4 border-t border-border bg-card">
              <div className="relative flex items-center">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about architecture, stack, experience..."
                  rows={2}
                  className="w-full resize-none rounded-xl border border-border bg-muted/40 px-3.5 py-2.5 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || loading}
                  className="absolute right-2 bottom-2 p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  aria-label="Send Message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Press Enter to send · Shift+Enter for newline</span>
                <span className="font-mono">Gemini 2.5 Flash</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
};

export default AIAssistantDrawer;
