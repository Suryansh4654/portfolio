import { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Code2 } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export default function Projects() {
  const { data } = usePortfolioData();
  const projects = data?.projects || [];

  return (
    <section id="projects" className="py-24 bg-[#161922] border-t border-b border-white/5">
      <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
        
        {/* Tag Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#0066ff] font-mono text-sm font-bold">/</span>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">PORTFOLIO</span>
        </div>

        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Featured Works & Production Builds
          </h2>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div 
              key={project.title}
              className="dev-card p-8 rounded-3xl flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono font-bold text-[#0066ff] bg-[#0066ff]/10 px-3 py-1 rounded-full border border-[#0066ff]/20">
                    {project.date || "Production"}
                  </span>
                  {project.live_url && (
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      LIVE ONLINE
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-display font-extrabold text-white mb-3 group-hover:text-[#0066ff] transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {project.description || project.summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech_stack.map(tech => (
                    <span key={tech} className="text-xs font-mono text-slate-300 bg-[#10131a] px-3 py-1 rounded-lg border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                {project.github_url && (
                  <a 
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300 hover:text-white transition-colors"
                  >
                    <Github size={14} /> VIEW SOURCE
                  </a>
                )}

                {project.live_url && (
                  <a 
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white bg-[#0066ff] hover:bg-[#0052cc] px-4 py-2 rounded-full transition-all shadow-md"
                  >
                    LAUNCH APPLICATION <ArrowUpRight size={14} />
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
