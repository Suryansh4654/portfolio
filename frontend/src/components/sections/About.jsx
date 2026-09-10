import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export default function About() {
  const { data } = usePortfolioData();
  const profile = data?.profile || {};

  const techLogos = [
    { name: "Python / Django", label: "Django REST" },
    { name: "ReactJS", label: "ReactJS" },
    { name: "PostgreSQL", label: "PostgreSQL" },
    { name: "LangChain & RAG", label: "LangChain" },
    { name: "Docker", label: "Docker" },
  ];

  return (
    <section id="about" className="py-24 bg-[#161922] border-t border-b border-white/5">
      <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
        
        {/* Tag Header */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[#0066ff] font-mono text-sm font-bold">/</span>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">ABOUT ME</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Title & Bio */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              I've been developing scalable applications & AI workflows
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Final-year Computer Science undergraduate at ABES Engineering College (8.23 CGPA). Secured Digital Specialist Engineer (DSE) role at Infosys through HackWithInfy 2026.
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Passionate about backend architecture, real-time bidirectional messaging, and integrating LLMs into user-facing web applications.
            </p>

            <div className="pt-2">
              <a 
                href="/resume.pdf" 
                download
                className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#0066ff] underline underline-offset-8 decoration-[#0066ff] transition-colors"
              >
                More about me <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: Key Stats & Summary */}
          <div className="lg:col-span-6 space-y-8">
            <div className="grid grid-cols-2 gap-6">
              
              <div>
                <span className="text-5xl sm:text-6xl font-display font-black text-white block">
                  300+
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mt-2">
                  DSA Problems Solved
                </span>
                <p className="text-xs text-slate-400 mt-1">LeetCode & CodeChef (CodeVita Rank 3448)</p>
              </div>

              <div>
                <span className="text-5xl sm:text-6xl font-display font-black text-white block">
                  4+
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mt-2">
                  Production Builds
                </span>
                <p className="text-xs text-slate-400 mt-1">EventHub, StudyRoom, AI Simulator</p>
              </div>

            </div>

            <div className="p-6 rounded-2xl bg-[#10131a] border border-white/5 space-y-2">
              <h4 className="text-xs font-mono font-bold text-[#0066ff] uppercase tracking-wider">
                Current Technical Focus
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Building GenAI applications with LangChain & LangGraph, orchestrating agentic multi-agent systems, and refining object-oriented LLD designs.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Horizontal Tech Logos Strip */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap items-center justify-between gap-6">
          <span className="text-xs font-mono font-bold text-slate-400 tracking-widest uppercase">
            PRIMARY TECH STACK
          </span>

          <div className="flex flex-wrap items-center gap-8 sm:gap-12">
            {techLogos.map((item) => (
              <span key={item.name} className="text-sm font-mono font-bold text-slate-300 hover:text-[#0066ff] transition-colors">
                ✦ {item.label}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
