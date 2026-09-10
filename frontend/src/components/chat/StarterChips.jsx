export default function StarterChips({ onSelect }) {
  const chips = [
    "What backend frameworks does he know?",
    "Tell me about his real-time project",
    "What's he working on right now?",
    "Is he a good fit for a Django/AI role?"
  ];

  return (
    <div className="flex flex-col gap-2 w-full mt-2">
      {chips.map((chip, i) => (
        <button
          key={i}
          onClick={() => onSelect(chip)}
          className="text-left text-xs md:text-sm p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all w-full md:w-[85%] shadow-sm self-end"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
