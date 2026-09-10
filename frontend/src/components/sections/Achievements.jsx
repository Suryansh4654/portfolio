import { Trophy, Award } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export default function Achievements() {
  const { data } = usePortfolioData();
  const achievements = data?.achievements || [];
  const certifications = data?.certifications || [];

  return (
    <section id="achievements" className="py-24 bg-[#10131a]">
      <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
        
        {/* Tag Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#0066ff] font-mono text-sm font-bold">/</span>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">MILESTONES</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mb-12">
          Achievements & Recognitions
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Achievements Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-[#0066ff] uppercase tracking-widest mb-4 flex items-center gap-2">
              <Trophy size={16} /> COMPETITIVE HONORS
            </h3>

            {achievements.map((item, index) => (
              <div key={index} className="dev-card p-6 rounded-2xl space-y-2 group">
                <div className="flex justify-between items-start">
                  <h4 className="font-display font-bold text-base text-white group-hover:text-[#0066ff] transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-[#10131a] px-2.5 py-1 rounded-full border border-white/5 shrink-0 ml-2">
                    {item.date}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2">
                  <span className="text-[10px] font-mono font-bold text-slate-300 bg-[#0066ff]/10 text-[#0066ff] px-2.5 py-0.5 rounded-full border border-[#0066ff]/20">
                    {item.issuer}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-[#0066ff] uppercase tracking-widest mb-4 flex items-center gap-2">
              <Award size={16} /> CERTIFICATIONS & COURSES
            </h3>

            {certifications.map((cert, index) => (
              <div key={index} className="dev-card p-5 rounded-2xl flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0066ff]/10 text-[#0066ff] font-mono font-bold flex items-center justify-center text-sm border border-[#0066ff]/20">
                    {cert.issuer.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-white group-hover:text-[#0066ff] transition-colors">
                      {cert.title}
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">{cert.issuer}</span>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold text-slate-400 bg-[#10131a] px-2.5 py-1 rounded-full border border-white/5">
                  {cert.date}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
