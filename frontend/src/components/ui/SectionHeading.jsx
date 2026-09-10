export default function SectionHeading({ title, subtitle, badge }) {
  const badgeText = badge || title.toUpperCase();
  return (
    <div className="text-center mb-16 relative z-10">
      {/* Warm Pinterest Pill Badge */}
      <div className="inline-block px-4 py-1 rounded-full bg-[#ebe8df] dark:bg-[#22202c] border border-[var(--color-border)] text-xs font-mono font-bold tracking-widest text-[var(--color-text-secondary)] uppercase mb-3">
        {badgeText}
      </div>
      
      {/* Display Title */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight mb-4 text-[var(--color-text-primary)]">
        {title}
      </h2>
      
      {/* Subtitle */}
      {subtitle && (
        <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed font-sans">
          {subtitle}
        </p>
      )}

      {/* Subtle Divider Line */}
      <div className="w-12 h-1 bg-[var(--color-text-primary)] rounded-full mx-auto mt-6 opacity-80" />
    </div>
  );
}
