import { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function Projects() {
  const projectsList = [
    {
      title: "EventHub",
      slug: "eventhub",
      description: "Full-stack event management and ticket booking platform for creating events, managing attendees and handling registrations with role-based access.",
      tech_stack: ["React", "Django", "DRF", "PostgreSQL", "JWT"],
      highlights: [
        "Role-based authentication",
        "Event creation & management",
        "Attendee registration",
        "Ticket management",
        "REST APIs",
        "Responsive React frontend"
      ],
      github_url: "https://github.com/Suryansh4654/eventhub",
      live_url: "https://eventhub-live.vercel.app/",
      badge: "Featured Build"
    },
    {
      title: "StudyRoom",
      slug: "studyroom",
      description: "Real-time collaborative co-working platform that allows users to create/join rooms and communicate through WebSockets.",
      tech_stack: ["React", "Django", "WebSockets", "PostgreSQL"],
      highlights: [
        "Real-time communication",
        "Room creation/joining",
        "WebSocket-based updates",
        "User authentication",
        "Collaborative workspace"
      ],
      github_url: "https://github.com/Suryansh4654/studyroom",
      live_url: "https://studyroom-px8m.onrender.com",
      badge: "Real-Time Systems"
    },
    {
      title: "AI Interview Simulator",
      slug: "ai-interview-simulator",
      description: "Full-stack interview prep platform integrating Hugging Face APIs for automated question generation and evaluation.",
      tech_stack: ["Python", "Django", "React", "Hugging Face APIs"],
      contribution: "Backend / API / AI Integration",
      is_team: true,
      highlights: [
        "Automated question generation",
        "Q&A flow evaluation engine",
        "Performance scoring & feedback",
        "Streamlit dashboard integration"
      ],
      github_url: "https://github.com/yash5749/interview-sim",
      live_url: "",
      badge: "Team Project"
    },
    {
      title: "AI-Powered Portfolio",
      slug: "ai-portfolio",
      description: "Production-style full-stack developer portfolio built with React and Django, featuring an AI assistant grounded in structured portfolio data.",
      tech_stack: ["React", "Django", "DRF", "PostgreSQL", "LangChain", "Gemini", "Docker"],
      highlights: [
        "AI portfolio assistant",
        "Streaming responses",
        "Structured AI context",
        "REST API & Rate limiting",
        "Dockerized architecture"
      ],
      github_url: "https://github.com/Suryansh4654/portfolio",
      live_url: "https://suryanshpandey-dev.vercel.app",
      badge: "Full-Stack System"
    }
  ];

  return (
    <section id="projects" className="py-24 bg-[#161922] border-t border-b border-white/5">
      <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#0066ff] font-mono text-sm font-bold">/</span>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">FEATURED WORKS</span>
        </div>

        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Production Engineering Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsList.map((project) => (
            <div 
              key={project.title}
              className="dev-card p-8 rounded-3xl flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                {/* Header Badge */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono font-bold text-[#0066ff] bg-[#0066ff]/10 px-3 py-1 rounded-full border border-[#0066ff]/20">
                    {project.badge}
                  </span>
                  {project.is_team && (
                    <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                      TEAM PROJECT
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-display font-extrabold text-white mb-2 group-hover:text-[#0066ff] transition-colors">
                  {project.title}
                </h3>

                {/* Contribution note if team project */}
                {project.contribution && (
                  <p className="text-xs font-mono font-bold text-amber-400 mb-3">
                    My Contribution: <span className="text-slate-200 font-normal">{project.contribution}</span>
                  </p>
                )}

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech_stack.map(tech => (
                    <span key={tech} className="text-xs font-mono font-semibold text-slate-300 bg-[#10131a] px-3 py-1 rounded-lg border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Key Feature Bullet Points */}
                <div className="mb-6 space-y-2 bg-[#10131a] p-4 rounded-xl border border-white/5">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    KEY HIGHLIGHTS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-slate-300">
                    {project.highlights.map((feat, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-[#0066ff] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                {project.github_url && (
                  <a 
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300 hover:text-white transition-colors"
                  >
                    <Github size={15} /> GITHUB REPO
                  </a>
                )}

                {project.live_url && (
                  <a 
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white bg-[#0066ff] hover:bg-[#0052cc] px-4 py-2 rounded-full transition-all shadow-md"
                  >
                    LIVE DEMO <ArrowUpRight size={14} />
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
