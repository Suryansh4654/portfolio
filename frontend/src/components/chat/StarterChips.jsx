export default function StarterChips({ onSelect }) {
  const chips = [
    "What are Suryansh's strongest skills?",
    "Tell me about EventHub",
    "Which project demonstrates Django?",
    "What AI projects has Suryansh built?",
    "What are Suryansh's achievements?",
    "Why should I hire Suryansh?"
  ];

  return (
    <div className="flex flex-col gap-2 w-full mt-2">
      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
        SUGGESTED QUESTIONS:
      </span>
      {chips.map((chip, i) => (
        <button
          key={i}
          onClick={() => onSelect(chip)}
          className="text-left text-xs p-3 rounded-xl border border-white/10 bg-[#10131a] text-slate-300 hover:text-white hover:border-[#0066ff] hover:bg-[#0066ff]/10 transition-all w-full shadow-sm"
        >
          ✦ {chip}
        </button>
      ))}
    </div>
  );
}
