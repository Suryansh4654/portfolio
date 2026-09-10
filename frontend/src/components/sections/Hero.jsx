import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Github, Linkedin, Code, Mail } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export default function Hero() {
  const { data } = usePortfolioData();
  const profile = data?.profile || {};

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 bg-[#10131a] flex flex-col justify-between overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 relative z-10 my-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-5 z-20 space-y-6 text-left">
            {/* White Decorative Line */}
            <div className="w-16 h-1 bg-white mb-8" />
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
              I'm Suryansh, a <span className="text-white block">Full-Stack & AI Developer</span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md font-sans">
              Computer Science undergraduate building high-performance Django REST backends, real-time WebSockets engines, and production-grade LLM RAG pipelines.
            </p>

            {/* Giant Electric Blue Circle Arrow Button */}
            <div className="pt-6">
              <a 
                href="#about" 
                className="btn-circle-blue group"
                aria-label="Scroll to About section"
              >
                <ArrowDown size={28} className="group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Center Column: Portrait Photo Cutout (4 cols) */}
          <div className="lg:col-span-4 flex justify-center items-end relative z-10 my-8 lg:my-0">
            <div className="relative w-72 sm:w-80 lg:w-96 aspect-[3/4] overflow-hidden rounded-3xl bg-gradient-to-b from-slate-800/50 to-[#10131a] border border-white/10 shadow-2xl">
              <img 
                src="/suryansh.jpg" 
                alt="Suryansh Pandey" 
                className="w-full h-full object-cover object-[center_15%] filter contrast-105"
              />
            </div>
          </div>

          {/* Right Column: About, Work, Social Links (3 cols) */}
          <div className="lg:col-span-3 z-20 space-y-8 text-left">
            
            {/* Quick About Block */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">ABOUT ME</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Backend software developer & AI enthusiast. Infosys DSE offer holder via HackWithInfy 2026.
              </p>
              <a href="#about" className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-[#0066ff] transition-colors pt-1">
                LEARN MORE <ArrowRight size={12} />
              </a>
            </div>

            {/* Quick Work Block */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">MY WORK</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                4+ production full-stack builds including EventHub real-time ticketing and StudyRoom co-working.
              </p>
              <a href="#projects" className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-[#0066ff] transition-colors pt-1">
                BROWSE PORTFOLIO <ArrowRight size={12} />
              </a>
            </div>

            {/* Social Links Block */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">FOLLOW ME</h3>
              <div className="flex items-center gap-4 text-slate-300">
                <a href={profile.github_url || "https://github.com/Suryansh4654"} target="_blank" rel="noopener noreferrer" className="hover:text-[#0066ff] transition-colors">
                  <Github size={18} />
                </a>
                <a href={profile.linkedin_url || "https://www.linkedin.com/in/backend-suryansh-pandey/"} target="_blank" rel="noopener noreferrer" className="hover:text-[#0066ff] transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href={profile.leetcode_url || "https://leetcode.com/u/suryansh_4654/"} target="_blank" rel="noopener noreferrer" className="hover:text-[#0066ff] transition-colors">
                  <Code size={18} />
                </a>
                <a href={`mailto:${profile.email || "su12345pandey@gmail.com"}`} className="hover:text-[#0066ff] transition-colors">
                  <Mail size={18} />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
