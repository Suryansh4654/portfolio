import { Github, Linkedin, Code } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { data } = usePortfolioData();
  const profile = data?.profile || {};

  return (
    <footer className="bg-[#10131a] border-t border-white/5 py-8">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400">
        
        <p>© {currentYear} Suryansh Pandey. All rights reserved.</p>

        <div className="flex items-center space-x-6 text-slate-300">
          <a 
            href={profile.github_url || "https://github.com/Suryansh4654"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#0066ff] transition-colors inline-flex items-center gap-1.5" 
          >
            <Github size={14} /> GitHub
          </a>
          <span>·</span>
          <a 
            href={profile.linkedin_url || "https://www.linkedin.com/in/backend-suryansh-pandey/"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#0066ff] transition-colors inline-flex items-center gap-1.5" 
          >
            <Linkedin size={14} /> LinkedIn
          </a>
          <span>·</span>
          <a 
            href={profile.leetcode_url || "https://leetcode.com/u/suryansh_4654/"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#0066ff] transition-colors inline-flex items-center gap-1.5" 
          >
            <Code size={14} /> LeetCode
          </a>
        </div>

      </div>
    </footer>
  );
}
