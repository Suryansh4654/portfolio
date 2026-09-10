import { useEffect, useRef } from 'react';
import StarterChips from './StarterChips';

export default function ChatMessages({ messages, isStreaming, onSend }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--color-bg-primary)] scroll-smooth" aria-live="polite">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col justify-end">
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-4 rounded-2xl rounded-tl-sm mb-6 inline-block max-w-[85%] self-start shadow-sm">
            <p className="text-[var(--color-text-primary)] text-sm leading-relaxed">
              Hi! I'm Suryansh's AI assistant. I know all about his skills, projects, and background. What would you like to know?
            </p>
          </div>
          <StarterChips onSelect={onSend} />
        </div>
      ) : (
        messages.map((msg, idx) => (
          <div 
            key={msg.id || idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-6 h-6 rounded-full bg-[var(--color-accent)] flex shrink-0 items-center justify-center text-white text-[10px] mr-2 mt-1">
                AI
              </div>
            )}
            <div 
              className={`p-3 md:p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-[var(--color-accent)] text-white rounded-tr-sm' 
                  : 'bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-tl-sm'
              }`}
            >
              {msg.content || (
                isStreaming && idx === messages.length - 1 ? (
                  <div className="flex gap-1 items-center h-5">
                    <span className="w-1.5 h-1.5 bg-[var(--color-text-secondary)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-[var(--color-text-secondary)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-[var(--color-text-secondary)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                ) : ''
              )}
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
