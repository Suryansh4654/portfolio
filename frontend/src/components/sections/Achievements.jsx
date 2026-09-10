import { Trophy, Briefcase, Brain } from 'lucide-react';

export default function Achievements() {
  const achievementsList = [
    {
      icon: <Trophy size={24} className="text-amber-400" />,
      title: "TCS CodeVita Season 13",
      highlight: "Global Rank 3448",
      detail: "Ranked 3448 globally in TCS CodeVita competitive programming contest.",
      badge: "TCS CodeVita"
    },
    {
      icon: <Briefcase size={24} className="text-blue-400" />,
      title: "Infosys DSE Offer",
      highlight: "Digital Specialist Engineer",
      detail: "Secured Digital Specialist Engineer role at Infosys through HackWithInfy 2026.",
      badge: "Infosys"
    },
    {
      icon: <Brain size={24} className="text-purple-400" />,
      title: "DSA Problem Solving",
      highlight: "300+ Problems Solved",
      detail: "Solved 300+ data structures and algorithm challenges across LeetCode & CodeChef.",
      badge: "LeetCode & CodeChef"
    }
  ];

  return (
    <section id="achievements" className="py-20 bg-[#10131a]">
      <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#0066ff] font-mono text-sm font-bold">/</span>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">RECOGNITIONS</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mb-12">
          Achievements & Honors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievementsList.map((item, index) => (
            <div key={index} className="dev-card p-6 rounded-2xl space-y-3 group hover:border-[#0066ff]/50 transition-all">
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 rounded-xl bg-[#10131a] border border-white/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 bg-[#10131a] px-2.5 py-1 rounded-full border border-white/5">
                  {item.badge}
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-base text-white group-hover:text-[#0066ff] transition-colors">
                  {item.title}
                </h3>
                <span className="text-sm font-mono font-bold text-[#0066ff] block mt-0.5">
                  {item.highlight}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
