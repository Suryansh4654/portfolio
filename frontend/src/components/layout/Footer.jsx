import { Github, Linkedin, Code, Mail } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { data } = usePortfolioData();
  const profile = data?.profile || {};

  return (
    <footer className="bg-[#080c16] border-t border-[#1e293b] py-12 relative">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col items-center">
        
        <div className="flex space-x-5 mb-6">
          <a 
            href={profile.github_url || "https://github.com/Suryansh4654"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 bg-[#111827] border border-[#1e293b] rounded-full flex items-center justify-center text-slate-300 hover:text-[#ccff00] hover:border-[#ccff00] transition-all" 
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a 
            href={profile.linkedin_url || "https://www.linkedin.com/in/backend-suryansh-pandey/"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 bg-[#111827] border border-[#1e293b] rounded-full flex items-center justify-center text-slate-300 hover:text-[#ccff00] hover:border-[#ccff00] transition-all" 
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a 
            href={profile.leetcode_url || "https://leetcode.com/u/suryansh_4654/"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 bg-[#111827] border border-[#1e293b] rounded-full flex items-center justify-center text-slate-300 hover:text-[#ccff00] hover:border-[#ccff00] transition-all" 
            aria-label="LeetCode"
          >
            <Code size={18} />
          </a>
          <a 
            href={`mailto:${profile.email || "su12345pandey@gmail.com"}`} 
            className="w-10 h-10 bg-[#111827] border border-[#1e293b] rounded-full flex items-center justify-center text-slate-300 hover:text-[#ccff00] hover:border-[#ccff00] transition-all" 
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
        
        <p className="text-xs font-mono text-slate-400 mb-2">
          Designed & Built by Suryansh Pandey
        </p>
        
        <p className="text-[11px] font-mono text-slate-500">
          &copy; {currentYear} Suryansh Pandey. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
