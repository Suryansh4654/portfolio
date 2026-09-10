import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useChat } from '../../hooks/useChat';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isStreaming, sendMessage, stopGeneration } = useChat();

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-[var(--color-accent)] hover:bg-[var(--color-accent-secondary)] rounded-full shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center justify-center text-white z-50 transition-colors"
            aria-label="Open chat"
          >
            <MessageCircle size={24} />
            <span className="absolute inset-0 rounded-full bg-[var(--color-accent)] animate-ping opacity-20"></span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 right-0 md:bottom-10 md:right-10 w-full h-[80vh] md:w-[400px] md:h-[560px] bg-[var(--color-bg-card)] md:rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-[var(--color-border)]"
            role="dialog"
            aria-modal="true"
            aria-label="Ask My Portfolio"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-[var(--color-border)] flex justify-between items-center bg-gradient-to-r from-[var(--color-bg-card)] to-[var(--color-bg-secondary)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white">
                  <span className="font-display font-bold text-sm">AI</span>
                </div>
                <div>
                  <h3 className="font-bold font-display text-[var(--color-text-primary)]">Ask My Portfolio</h3>
                  <p className="text-xs text-[var(--color-text-secondary)]">Powered by Gemini AI</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors p-1"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <ChatMessages 
              messages={messages} 
              isStreaming={isStreaming} 
              onSend={sendMessage}
            />

            {/* Input Area */}
            <ChatInput 
              onSend={sendMessage} 
              disabled={isStreaming} 
              onStop={stopGeneration}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
