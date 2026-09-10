import AnimatedSection from '../ui/AnimatedSection';
import SectionHeading from '../ui/SectionHeading';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export default function CurrentlyBuilding() {
  const { data } = usePortfolioData();
  const learning = data?.learning || [];
  const narrative = data?.career_narrative || {};
  
  // Find primary focus major project
  const projects = data?.projects || [];
  const activeProject = narrative.major_project || projects.find(p => p.in_progress) || projects[0];

  return (
    <AnimatedSection id="currently-building" className="container mx-auto px-6 lg:px-12">
      <div className="flex flex-col items-center mb-16">
        <div className="flex items-center gap-2 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-500 font-medium tracking-wide uppercase text-sm">Active</span>
        </div>
        <SectionHeading title="Currently Building & Learning" subtitle="What I'm focused on right now." />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Major Project Card */}
        <div className="lg:col-span-2 glass rounded-3xl p-8 md:p-10 border-2 border-emerald-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 transition-transform group-hover:scale-150 duration-700"></div>
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <span className="inline-block px-4 py-1.5 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-bold mb-6">
                {activeProject?.type || "Primary Focus"}
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-[var(--color-text-primary)] mb-4">
                {activeProject?.title}
              </h3>
              <p className="text-base md:text-lg text-[var(--color-text-secondary)] mb-8 max-w-xl leading-relaxed">
                {activeProject?.description}
              </p>
            </div>
            
            <div className="flex items-center gap-6 mt-auto">
              <div>
                <p className="text-xs text-[var(--color-text-secondary)] mb-1">Status</p>
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{activeProject?.status || "In Development"}</p>
              </div>
              {activeProject?.team_size && (
                <div>
                  <p className="text-xs text-[var(--color-text-secondary)] mb-1">Team</p>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">{activeProject.team_size} Members</p>
                </div>
              )}
              {activeProject?.demonstrates && (
                <div>
                  <p className="text-xs text-[var(--color-text-secondary)] mb-1">Focus Area</p>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">{activeProject.demonstrates}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Direction Card */}
        <div className="bg-[var(--color-bg-card)] rounded-3xl p-8 border border-[var(--color-border)] flex flex-col">
          <h3 className="text-xl font-bold font-display text-[var(--color-text-primary)] mb-6">Career Direction</h3>
          <p className="text-[var(--color-text-secondary)] mb-6 flex-grow leading-relaxed">
            {narrative.target_role?.focus || narrative.current_focus || "Application-building/product side — integrating LLMs, RAG, agentic workflows into real software."} Aiming to transition into roles like <span className="font-medium text-[var(--color-text-primary)]">{typeof narrative.target_role === 'object' ? narrative.target_role?.title : (narrative.target_role || "AI Engineer")}</span>.
          </p>
          <div className="p-4 bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)]">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">Upcoming</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">Focusing on generative AI workflows, scaling REST endpoints, and deep diving into system design (LLD).</p>
          </div>
        </div>

        {/* Learning Cards */}
        {learning.map((item, index) => (
          <div key={index} className="bg-[var(--color-bg-card)] p-6 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors group">
            <h4 className="text-lg font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">{item.topic}</h4>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4 h-10">{item.detail}</p>
            
            <div className="w-full bg-[var(--color-bg-secondary)] rounded-full h-2 mb-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] h-2 rounded-full"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs font-semibold text-[var(--color-text-secondary)]">
              <span>Progress</span>
              <span className="text-[var(--color-text-primary)]">{item.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
