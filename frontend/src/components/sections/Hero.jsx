import { motion } from 'framer-motion';
import { ArrowRight, FileText, Github, Linkedin, Code, Trophy, Briefcase, GraduationCap, Brain } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export default function Hero() {
  const { data } = usePortfolioData();
  const profile = data?.profile || {};

  return (
    <section id="hero" className="relative pt-32 pb-12 bg-[#10131a] flex flex-col justify-between overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 relative z-10 my-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 z-20 space-y-6 text-left">
            <div className="w-16 h-1 bg-[#0066ff] mb-6" />
            
            <div className="space-y-2">
              <span className="text-[#0066ff] font-mono text-xs font-bold uppercase tracking-widest block">
                SOFTWARE ENGINEER & AI ARCHITECT
              </span>
              <h1 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight leading-tight">
                Suryansh Pandey
              </h1>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#0066ff] tracking-tight">
                AI Engineer & Backend-Focused Full-Stack Developer
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
              I build scalable backend systems, full-stack applications, and AI-powered products using Python, Django, React, and modern GenAI technologies.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#projects" 
                className="px-7 py-3.5 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-mono font-bold tracking-wider transition-all shadow-lg hover:shadow-[0_0_25px_rgba(0,102,255,0.4)] inline-flex items-center gap-2"
              >
                VIEW PROJECTS <ArrowRight size={14} />
              </a>
              
              <a 
                href="/resume.pdf" 
                download
                className="px-7 py-3.5 rounded-full bg-[#161922] hover:bg-[#1c202b] text-white border border-white/10 hover:border-white/30 text-xs font-mono font-bold tracking-wider transition-all inline-flex items-center gap-2"
              >
                DOWNLOAD RESUME <FileText size={14} />
              </a>
            </div>

            {/* Social Links Strip */}
            <div className="pt-2 flex items-center gap-6 text-xs font-mono font-bold text-slate-400">
              <a 
                href={profile.github_url || "https://github.com/Suryansh4654"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#0066ff] transition-colors flex items-center gap-1.5"
              >
                <Github size={15} /> GitHub
              </a>
              <span>·</span>
              <a 
                href={profile.linkedin_url || "https://www.linkedin.com/in/backend-suryansh-pandey/"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#0066ff] transition-colors flex items-center gap-1.5"
              >
                <Linkedin size={15} /> LinkedIn
              </a>
              <span>·</span>
              <a 
                href={profile.leetcode_url || "https://leetcode.com/u/suryansh_4654/"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#0066ff] transition-colors flex items-center gap-1.5"
              >
                <Code size={15} /> LeetCode
              </a>
            </div>
          </div>

          {/* Right Column: Center Avatar Photo (5 cols) */}
          <div className="lg:col-span-5 flex justify-center items-center relative z-10 my-6 lg:my-0">
            <div className="relative w-72 sm:w-80 lg:w-84 aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-b from-slate-800/50 to-[#10131a] border border-white/10 shadow-2xl">
              <img 
                src="/suryansh.jpg" 
                alt="Suryansh Pandey" 
                className="w-full h-full object-cover object-[center_15%] filter contrast-105"
              />
            </div>
          </div>

        </div>

        {/* 🏆 Section 2: Achievement Strip directly below Hero */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-[#161922] border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Trophy size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">TCS CodeVita</span>
              <span className="text-xs font-bold text-white">Global Rank 3448</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#161922] border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
              <Briefcase size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Infosys</span>
              <span className="text-xs font-bold text-white">DSE Offer</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#161922] border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
              <Brain size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Problem Solving</span>
              <span className="text-xs font-bold text-white">300+ DSA Problems</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#161922] border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <GraduationCap size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Academics</span>
              <span className="text-xs font-bold text-white">B.Tech CSE — 8.23 CGPA</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
