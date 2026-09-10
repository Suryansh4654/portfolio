import { useState, useRef, useEffect } from 'react';
import { SendHorizonal, Square } from 'lucide-react';

export default function ChatInput({ onSend, disabled, onStop }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  return (
    <div className="p-4 bg-[var(--color-bg-card)] border-t border-[var(--color-border)]">
      <form onSubmit={handleSubmit} className="relative flex items-end bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl focus-within:border-[var(--color-accent)] focus-within:ring-1 focus-within:ring-[var(--color-accent)] transition-all">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, 500))}
          onKeyDown={handleKeyDown}
          placeholder="Ask about my skills, projects..."
          className="w-full max-h-32 bg-transparent text-[var(--color-text-primary)] text-sm py-3 pl-4 pr-12 focus:outline-none resize-none overflow-y-auto"
          rows={1}
          disabled={disabled}
        />
        
        <div className="absolute right-2 bottom-2">
          {disabled ? (
            <button
              type="button"
              onClick={onStop}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-bg-card)] text-red-500 hover:bg-red-500/10 transition-colors"
              title="Stop generation"
            >
              <Square size={16} fill="currentColor" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white disabled:opacity-50 disabled:bg-[var(--color-bg-card)] disabled:text-[var(--color-text-secondary)] transition-colors"
            >
              <SendHorizonal size={16} />
            </button>
          )}
        </div>
      </form>
      <div className="flex justify-between items-center mt-2 px-1">
        <span className="text-[10px] text-[var(--color-text-secondary)]">Enter to send, Shift+Enter for new line</span>
        <span className="text-[10px] text-[var(--color-text-secondary)]">{input.length}/500</span>
      </div>
    </div>
  );
}
