import { motion } from 'framer-motion';

export default function About() {
  const quickFacts = [
    { label: "🎓 Education", value: "B.Tech CSE" },
    { label: "📊 CGPA", value: "8.23" },
    { label: "🏆 CodeVita", value: "Rank 3448" },
    { label: "💼 Offer", value: "Infosys DSE" },
    { label: "🧠 DSA", value: "300+ problems" },
    { label: "🎯 Focus", value: "Backend + AI" },
  ];

  return (
    <section id="about" className="py-20 bg-[#161922] border-t border-b border-white/5">
      <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#0066ff] font-mono text-sm font-bold">/</span>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">ABOUT ME</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mb-10">
          Engineering Background & Core Focus
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Bio Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            <p>
              I'm a final-year Computer Science undergraduate focused on backend engineering and AI-integrated applications. I primarily work with Python, Django and REST APIs, while using React to build complete full-stack products.
            </p>
            <p>
              I'm particularly interested in building reliable backend systems, real-time applications, and AI-powered products that solve practical problems.
            </p>
          </div>

          {/* Quick Facts Table / Grid (5 cols) */}
          <div className="lg:col-span-5 bg-[#10131a] p-6 rounded-2xl border border-white/5 space-y-4">
            <h3 className="text-xs font-mono font-bold text-[#0066ff] uppercase tracking-wider border-b border-white/5 pb-3">
              QUICK FACTS
            </h3>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="p-3 bg-[#161922] rounded-xl border border-white/5 flex flex-col justify-between">
                  <span className="text-slate-400 text-[11px] font-medium">{fact.label}</span>
                  <span className="text-white font-bold text-sm mt-1">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
