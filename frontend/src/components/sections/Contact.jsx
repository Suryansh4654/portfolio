import { useState } from 'react';
import { Send, Mail, Linkedin, Github } from 'lucide-react';
import { api } from '../../services/api';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export default function Contact() {
  const { data } = usePortfolioData();
  const profile = data?.profile || {};

  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Portfolio Inquiry', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await api.post('/api/contact/', formData);
      setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
      setFormData({ name: '', email: '', subject: 'Portfolio Inquiry', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please email me directly at su12345pandey@gmail.com' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#10131a]">
      <div className="container mx-auto px-6 lg:px-16 max-w-5xl">
        
        {/* Tag Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#0066ff] font-mono text-sm font-bold">/</span>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">CONTACT</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight mb-12">
          Let's work together
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 dev-card p-8 rounded-3xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 mb-2 uppercase">YOUR NAME</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full bg-[#10131a] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#0066ff] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 mb-2 uppercase">EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full bg-[#10131a] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#0066ff] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 mb-2 uppercase">YOUR MESSAGE</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full bg-[#10131a] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#0066ff] transition-colors resize-none"
                ></textarea>
              </div>

              {status.message && (
                <div className={`p-4 rounded-xl text-xs font-mono ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                  {status.message}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold font-mono text-xs tracking-wider uppercase rounded-xl transition-all shadow-lg hover:shadow-[0_0_25px_rgba(0,102,255,0.4)] flex justify-center items-center gap-2"
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'} <Send size={16} />
              </button>
            </form>
          </div>

          {/* Right Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8 lg:pt-4">
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">GET IN TOUCH</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Open for off-campus AI Engineer roles, full-stack software development opportunities, and high-impact technical collaborations.
              </p>
            </div>

            <div className="space-y-4">
              <a href={`mailto:${profile.email || "su12345pandey@gmail.com"}`} className="flex items-center gap-4 p-4 rounded-2xl dev-card group">
                <div className="w-10 h-10 rounded-xl bg-[#0066ff]/10 text-[#0066ff] flex items-center justify-center group-hover:bg-[#0066ff] group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Email</span>
                  <span className="text-xs font-bold text-white group-hover:text-[#0066ff] transition-colors">{profile.email || "su12345pandey@gmail.com"}</span>
                </div>
              </a>

              <a href={profile.linkedin_url || "https://www.linkedin.com/in/backend-suryansh-pandey/"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl dev-card group">
                <div className="w-10 h-10 rounded-xl bg-[#0066ff]/10 text-[#0066ff] flex items-center justify-center group-hover:bg-[#0066ff] group-hover:text-white transition-all">
                  <Linkedin size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">LinkedIn</span>
                  <span className="text-xs font-bold text-white group-hover:text-[#0066ff] transition-colors">Connect on LinkedIn</span>
                </div>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
