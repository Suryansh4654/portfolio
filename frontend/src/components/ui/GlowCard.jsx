import { useRef, useState } from 'react';

export default function GlowCard({ children, className = "", onClick }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.12)] cursor-pointer ${className}`}
    >
      {/* Background radial soft light */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity: isFocused ? 1 : 0,
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.08), transparent 80%)`
        }}
      />
      {/* Precision border neon outline */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-0"
        style={{
          opacity: isFocused ? 1 : 0,
          background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(139, 92, 246, 0.35), transparent 60%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px'
        }}
      />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
