import { Hammer, BookOpen } from 'lucide-react';

export default function CurrentlyBuilding() {
  return (
    <section id="currently-building" className="py-20 bg-[#161922] border-t border-b border-white/5">
      <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#0066ff] font-mono text-sm font-bold">/</span>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">ACTIVE INITIATIVES</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mb-12">
          Currently Building & Learning
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Currently Building Card (7 cols) */}
          <div className="lg:col-span-7 dev-card p-8 rounded-3xl space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#0066ff] mb-2 font-mono text-xs font-bold uppercase tracking-wider">
                <Hammer size={16} /> CURRENTLY BUILDING
              </div>

              <h3 className="text-2xl font-display font-extrabold text-white mb-3">
                Multi-Dataset Heart Disease Risk Prediction with Explainable AI
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed font-sans">
                Building an ML system that combines multiple medical datasets and provides interpretable predictions using SHAP-style explainability and class-imbalance algorithms.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">STATUS: Model Evaluation & SHAP Integration</span>
              <span className="text-[#0066ff] font-bold">Python / Scikit-Learn / SHAP</span>
            </div>
          </div>

          {/* Currently Learning Card (5 cols) */}
          <div className="lg:col-span-5 dev-card p-8 rounded-3xl space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 mb-2 font-mono text-xs font-bold uppercase tracking-wider">
                <BookOpen size={16} /> CURRENTLY LEARNING
              </div>

              <h3 className="text-xl font-display font-extrabold text-white mb-3">
                Advanced AI & Engineering Focus
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed font-sans mb-6">
                Deepening knowledge in agentic AI architectures, multi-document RAG pipelines, and object-oriented Low-Level System Design (LLD).
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="px-3.5 py-1.5 rounded-xl bg-[#10131a] border border-white/10 text-xs font-mono font-bold text-emerald-400">
                  LangGraph
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-[#10131a] border border-white/10 text-xs font-mono font-bold text-emerald-400">
                  Agentic RAG
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-[#10131a] border border-white/10 text-xs font-mono font-bold text-emerald-400">
                  System Design (LLD)
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 text-xs font-mono text-slate-400">
              FOCUS: Production-Grade AI Systems
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
