import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Sparkles } from 'lucide-react';
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
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-[#0066ff] hover:bg-[#0052cc] rounded-full shadow-[0_0_25px_rgba(0,102,255,0.4)] flex items-center justify-center text-white z-50 transition-colors"
            aria-label="Ask Suryansh's AI Assistant"
          >
            <MessageCircle size={24} />
            <span className="absolute inset-0 rounded-full bg-[#0066ff] animate-ping opacity-20"></span>
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
            className="fixed bottom-0 right-0 md:bottom-10 md:right-10 w-full h-[85vh] md:w-[420px] md:h-[580px] bg-[#161922] md:rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-white/10"
            role="dialog"
            aria-modal="true"
            aria-label="Ask Suryansh's AI Assistant"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/10 flex justify-between items-center bg-[#10131a]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0066ff] flex items-center justify-center text-white font-bold text-sm shadow-md">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-bold font-display text-white text-sm">Ask Suryansh's AI Assistant</h3>
                  <p className="text-[11px] font-mono text-slate-400">Ask about my skills, projects & achievements</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
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

            {/* Footer Branding */}
            <div className="py-1.5 bg-[#10131a] text-center border-t border-white/5">
              <span className="text-[10px] font-mono text-slate-400">
                Powered by Gemini · Grounded in my portfolio
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
