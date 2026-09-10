import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export default function Skills() {
  const { data } = usePortfolioData();
  const skills = data?.skills || [];
  
  const categories = ['All', ...new Set(skills.map(s => s.category))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 bg-[#10131a]">
      <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
        
        {/* Header Tag & Title */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#0066ff] font-mono text-sm font-bold">/</span>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">MY SKILLS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              My extensive list of skills
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="w-10 h-10 rounded-full bg-[#0066ff] text-white flex items-center justify-center font-bold text-sm shadow-md">
              ✦
            </span>
          </div>
        </div>

        {/* Categories Pill Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                activeCategory === cat 
                  ? 'bg-[#0066ff] text-white shadow-lg' 
                  : 'bg-[#161922] text-slate-300 border border-white/5 hover:border-white/20'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Skill Tiles Matrix Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="dev-card p-5 rounded-2xl flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#10131a] border border-white/10 flex items-center justify-center shrink-0 text-xl group-hover:border-[#0066ff] transition-colors">
                  <i className={`${skill.icon_class} text-[#0066ff] group-hover:scale-110 transition-transform`} />
                </div>

                <div className="min-w-0 flex-grow">
                  <h3 className="font-bold text-sm text-white truncate font-display group-hover:text-[#0066ff] transition-colors">
                    {skill.name}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mt-0.5">
                    {skill.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
