import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#10131a]/95 backdrop-blur-md py-4 border-b border-white/10 shadow-2xl' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-16 flex justify-between items-center">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-[#0066ff] text-xl font-mono font-extrabold">&lt;/&gt;</span>
          <span className="text-xl font-display font-bold tracking-tight text-white group-hover:text-slate-200 transition-colors">
            Suryansh <span className="font-light text-slate-400">Pandey</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6 text-slate-300 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-[#0066ff] transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <a 
            href="/resume.pdf" 
            download
            className="px-5 py-2.5 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-mono font-bold transition-all shadow-md hover:shadow-[0_0_20px_rgba(0,102,255,0.4)] inline-flex items-center gap-1.5"
          >
            <FileText size={14} /> RESUME
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white p-2"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#10131a] z-50 flex flex-col p-8 font-sans"
          >
            <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/10">
              <span className="text-[#0066ff] font-mono font-bold text-sm">&lt;/&gt; SURYANSH</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
                <X size={24} />
              </button>
            </div>
            
            <ul className="flex flex-col space-y-6">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-bold text-white hover:text-[#0066ff] transition-colors block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <a 
                  href="/resume.pdf" 
                  download
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0066ff] text-white font-bold text-sm"
                >
                  <FileText size={16} /> DOWNLOAD RESUME
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
