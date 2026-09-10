import { motion } from 'framer-motion';

export default function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      skills: ["Python", "Java", "C++", "JavaScript", "SQL"]
    },
    {
      title: "Backend",
      skills: ["Django", "Django REST Framework", "REST APIs", "WebSockets", "JWT"]
    },
    {
      title: "AI / GenAI",
      skills: ["LangChain", "LangGraph", "RAG", "Prompt Engineering", "Gemini API"]
    },
    {
      title: "Frontend",
      skills: ["React", "HTML", "CSS", "Tailwind CSS"]
    },
    {
      title: "Database & Tools",
      skills: ["PostgreSQL", "MySQL", "Docker", "Git/GitHub", "Postman"]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-[#10131a]">
      <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#0066ff] font-mono text-sm font-bold">/</span>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">TECHNICAL ARSENAL</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mb-12">
          Skills & Technologies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div 
              key={category.title}
              className="dev-card p-6 rounded-2xl space-y-4 group hover:border-[#0066ff]/50 transition-all"
            >
              <h3 className="text-xs font-mono font-bold text-[#0066ff] uppercase tracking-widest border-b border-white/5 pb-2">
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2 pt-1">
                {category.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-3.5 py-1.5 rounded-xl bg-[#10131a] border border-white/5 text-xs font-mono font-semibold text-slate-200 group-hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
