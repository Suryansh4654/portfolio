import { useState, useRef, useCallback } from 'react';

const getSimulatedResponse = (text) => {
  const query = (text || '').toLowerCase().trim();
  const words = query.split(/[\s,?.!]+/);
  
  if (!query) return "How can I assist you with Suryansh's profile?";

  // 1. Why Hire / Strengths (Check FIRST so "hire" doesn't trigger "hi")
  if (['why', 'hire', 'strength', 'strengths', 'good', 'best', 'special'].some(k => words.includes(k) || query.includes(k))) {
    return "Why hire Suryansh Pandey?\n\n" +
           "1. **Strong Backend Architecture**: Hands-on experience with Python, Django, REST APIs, WebSockets, and silent JWT authentication flows.\n" +
           "2. **AI & LLM Integration**: Practical knowledge of LangChain RAG pipelines, LangGraph multi-agent workflows, and explainable AI.\n" +
           "3. **Solid Problem Solving**: 300+ DSA problems solved across LeetCode & CodeChef and Global Rank 3448 in TCS CodeVita S13.\n" +
           "4. **Proven Track Record**: Selected for Infosys Digital Specialist Engineer (DSE) role and built multiple production-grade web applications.";
  }

  // 2. Location & Contact Info
  if (['contact', 'email', 'phone', 'call', 'message', 'reach', 'linkedin', 'github', 'address', 'location', 'located', 'where', 'based', 'city'].some(k => words.includes(k) || query.includes(k))) {
    return "Location & Contact Information for Suryansh Pandey:\n\n" +
           "• **Current Location**: Ghaziabad / Delhi NCR, India (Open for relocation & remote work)\n" +
           "• **Email**: su12345pandey@gmail.com\n" +
           "• **Phone**: +91-9580361022\n" +
           "• **LinkedIn**: https://www.linkedin.com/in/backend-suryansh-pandey/\n" +
           "• **GitHub**: https://github.com/Suryansh4654";
  }

  // 3. Greetings & Capabilities (Strict word boundaries to prevent 'hi' in 'hire')
  if (words.includes('hi') || words.includes('hello') || words.includes('hey') || words.includes('yo') || query === 'hi' || query === 'hello' || query === 'hey' || query.startsWith('hello') || query.startsWith('hi ')) {
    return "Hello! I'm Suryansh's AI Portfolio Assistant. Ask me anything about his full-stack engineering skills, AI/LLM experience, TCS CodeVita rank (3448), production projects (EventHub, StudyRoom, AI Simulator), or education at ABES College!";
  }

  // 4. Currently Building / Active Focus / Recent Work
  if (['work', 'working', 'currently', 'now', 'recent', 'building', 'doing'].some(k => words.includes(k) || query.includes(k))) {
    return "Suryansh is currently focused on:\n\n" +
           "1. **EventHub**: Full-stack event management and real-time ticketing platform built with React, Django REST, and PostgreSQL.\n" +
           "2. **B.Tech Major AI Project**: Multi-Dataset Heart Disease Risk Prediction using Explainable AI (SHAP interpretability) and class-imbalance ML algorithms.\n" +
           "3. **StudyRoom** (https://studyroom-px8m.onrender.com) — Real-time collaborative co-working hub with React, Django & WebSockets.\n" +
           "4. **Generative AI & Agents**: Building RAG pipelines using LangChain and agentic orchestration workflows with LangGraph.";
  }

  // 5. EventHub Project
  if (query.includes('eventhub') || query.includes('event hub') || query.includes('event')) {
    return "**EventHub** (Live: https://eventhub-live.vercel.app/ | Code: https://github.com/Suryansh4654/eventhub) is Suryansh's full-stack event management platform:\n\n" +
           "• **Tech Stack**: ReactJS, Tailwind CSS, Python, Django REST Framework, PostgreSQL.\n" +
           "• **Features**: Full-stack event management & scheduling platform, dynamic ticket booking, real-time attendee tracking, and role-based admin dashboard control.";
  }

  // 6. B.Tech Major AI Project / Heart Disease / ML / SHAP
  if (['major', 'heart', 'shap', 'machine learning', 'ml', 'explainable', 'ai project'].some(k => words.includes(k) || query.includes(k))) {
    return "Suryansh's B.Tech Major AI Project focuses on **Explainable Heart Disease Risk Prediction**:\n\n" +
           "• **Core Objective**: Predicts cardiovascular risk across multi-source clinical datasets.\n" +
           "• **Explainable AI (SHAP)**: Uses SHAP (SHapley Additive exPlanations) to provide feature importance and transparent clinical rationales for each prediction.\n" +
           "• **Class Imbalance**: Implements SMOTE and custom sampling algorithms to handle imbalanced medical data effectively.";
  }

  // 7. StudyRoom Project
  if (query.includes('studyroom') || query.includes('collaborative') || query.includes('coworking')) {
    return "**StudyRoom** (https://studyroom-px8m.onrender.com) is Suryansh's real-time co-working hub:\n\n" +
           "• **Tech Stack**: ReactJS, Tailwind CSS, Python, Django REST Framework, Django Channels (WebSockets), PostgreSQL.\n" +
           "• **Features**: Real-time room chat, task kanban boards, shared pomodoro timers, and silent JWT token refresh flow.";
  }

  // 8. Laundry System Project
  if (query.includes('laundry') || query.includes('hostel')) {
    return "**Digital Laundry Management System** (https://laundry-management-system-2nvc.onrender.com):\n\n" +
           "• **Tech Stack**: Python, Django, HTML5/CSS3, SQLite/PostgreSQL.\n" +
           "• **Features**: Automates hostel laundry order dispatching, status tracking, and billing workflows with role-based admin/student dashboards.";
  }

  // 9. AI Interview Simulator
  if (query.includes('interview') || query.includes('simulator') || query.includes('huggingface')) {
    return "**AI Interview Simulator** (https://github.com/yash5749/interview-sim):\n\n" +
           "• **Tech Stack**: React, Python, Django, Hugging Face Inference API.\n" +
           "• **Features**: Generates dynamic technical interview questions based on candidate resume and evaluates response accuracy in real time.";
  }

  // 10. General Projects
  if (['project', 'projects', 'app', 'build', 'application', 'portfolio', 'system'].some(k => words.includes(k) || query.includes(k))) {
    return "Suryansh has developed several end-to-end applications:\n\n" +
           "1. **EventHub** — Full-stack event management and real-time ticketing platform.\n" +
           "2. **StudyRoom** (https://studyroom-px8m.onrender.com) — Real-time co-working hub with WebSockets and Django.\n" +
           "3. **B.Tech Major AI Project** — Explainable Heart Disease Risk Prediction using ML and SHAP.\n" +
           "4. **AI Interview Simulator** — Dynamic interview evaluator powered by Hugging Face APIs.\n" +
           "5. **Hostel Laundry Management** — Role-based workflow automation platform.";
  }

  // 11. Backend / Django / Python Skills
  if (['backend', 'django', 'python', 'api', 'rest', 'jwt', 'websocket', 'websockets', 'database', 'sql', 'postgresql'].some(k => words.includes(k) || query.includes(k))) {
    return "Suryansh's backend engineering expertise:\n\n" +
           "• **Primary Language**: Python (3.x)\n" +
           "• **Frameworks**: Django, Django REST Framework (DRF)\n" +
           "• **Real-Time Engines**: Django Channels, WebSockets\n" +
           "• **Authentication**: JWT Auth, silent token refresh flow\n" +
           "• **Databases**: PostgreSQL, MySQL, SQLite\n" +
           "• **API Design**: RESTful APIs, Swagger/Postman documentation";
  }

  // 12. AI / LLM / LangChain / LangGraph / RAG
  if (['ai', 'llm', 'llms', 'langchain', 'langgraph', 'rag', 'agent', 'agents', 'prompt', 'gemini', 'gpt', 'generative'].some(k => words.includes(k) || query.includes(k))) {
    return "Suryansh's AI & Agentic Engineering stack:\n\n" +
           "• **Frameworks**: LangChain, LangGraph\n" +
           "• **RAG Pipelines**: Semantic vector retrieval, document context loading\n" +
           "• **Multi-Agent Orchestration**: Designing stateful agent graphs with LangGraph\n" +
           "• **Model APIs**: Google Gemini API, OpenAI API, Hugging Face Inference models";
  }

  // 13. Frontend / React / Web
  if (['frontend', 'react', 'reactjs', 'tailwind', 'css', 'javascript', 'html', 'ui', 'ux'].some(k => words.includes(k) || query.includes(k))) {
    return "Suryansh's frontend capabilities:\n\n" +
           "• **Framework**: ReactJS (Vite / Next.js patterns)\n" +
           "• **Styling**: Tailwind CSS, CSS3, Framer Motion animations\n" +
           "• **State & State Management**: Hooks (`useContext`, `useCallback`, `useRef`), SSE streaming integration";
  }

  // 14. All Skills / Tech Stack Overview
  if (['skill', 'skills', 'tech', 'stack', 'language', 'languages', 'tool', 'tools', 'experience', 'technology'].some(k => words.includes(k) || query.includes(k))) {
    return "Suryansh's technical stack:\n\n" +
           "• **Backend**: Python, Django, DRF, WebSockets, JWT, REST APIs\n" +
           "• **AI / LLMs**: LangChain, LangGraph, RAG, Prompt Engineering\n" +
           "• **Frontend**: ReactJS, Tailwind CSS, Framer Motion\n" +
           "• **Languages**: Python, C++, Java, SQL\n" +
           "• **Databases & Tools**: PostgreSQL, MySQL, Docker, Git, Postman";
  }

  // 15. DSA / Competitive Programming / TCS CodeVita
  if (['dsa', 'problem', 'problems', 'leetcode', 'codechef', 'codevita', 'tcs', 'rank', 'competitive', 'algo', 'data structure'].some(k => words.includes(k) || query.includes(k))) {
    return "Suryansh's problem-solving & competitive coding achievements:\n\n" +
           "• **TCS CodeVita Season 13**: Global Rank **3448** among 100,000+ competitive coders.\n" +
           "• **DSA Practice**: Solved **300+ problems** across LeetCode and CodeChef.\n" +
           "• **Strengths**: Arrays, Strings, Dynamic Programming, Graphs, Trees, and Object-Oriented Programming (C++ & Java).";
  }

  // 16. Placement / Infosys / Offer / Career
  if (['infosys', 'placement', 'dse', 'job', 'offer', 'role', 'intern', 'career'].some(k => words.includes(k) || query.includes(k))) {
    return "Suryansh's placement & career highlights:\n\n" +
           "• **Infosys Selection**: Selected as a **Digital Specialist Engineer (DSE)** via HackWithInfy 2026.\n" +
           "• **Target Roles**: AI Engineer, Backend Engineer, Full-Stack Developer, Software Development Engineer (SDE).\n" +
           "• **Availability**: Open for full-time opportunities (onsite / remote).";
  }

  // 17. Education / College / Grades / CGPA
  if (['education', 'college', 'school', 'university', 'aktu', 'abes', 'cgpa', 'grade', 'btech', 'degree', 'study', 'marks'].some(k => words.includes(k) || query.includes(k))) {
    return "Suryansh's academic background:\n\n" +
           "• **B.Tech in Computer Science & Engineering**: ABES Engineering College, Ghaziabad (AKTU) | **CGPA: 8.23 / 10**\n" +
           "• **Class XII (CBSE)**: 82.83%\n" +
           "• **Class X (CBSE)**: 87.33%";
  }

  // 18. Catch-all Intelligent Response
  return "Suryansh Pandey is an AI Engineer & Full-Stack Developer (B.Tech CSE, 8.23 CGPA). " +
         "He specializes in Python, Django REST Framework, WebSockets, and LangChain/LangGraph AI workflows. " +
         "He has solved 300+ DSA problems, achieved Global Rank 3448 in TCS CodeVita, and built production projects like EventHub, StudyRoom, and AI Interview Simulator. " +
         "What specific details about his work or background would you like to know?";
};

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef(null);

  const streamFastFallback = useCallback((text, aiMessageId) => {
    const simulatedText = getSimulatedResponse(text);
    let index = 0;
    
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === aiMessageId ? { ...msg, content: '' } : msg
      )
    );

    const interval = setInterval(() => {
      if (index < simulatedText.length) {
        const chunk = simulatedText.slice(index, index + 12);
        index += 12;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? { ...msg, content: msg.content + chunk }
              : msg
          )
        );
      } else {
        clearInterval(interval);
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    }, 6);
  }, []);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now(), role: 'user', content: text };
    const aiMessageId = Date.now() + 1;

    const currentHistory = [...messages, userMessage].map(m => ({
      role: m.role,
      content: m.content,
    }));

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: aiMessageId, role: 'assistant', content: '' },
    ]);

    setIsStreaming(true);
    abortControllerRef.current = new AbortController();

    const timeoutId = setTimeout(() => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    }, 800);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/ai-chat/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            history: currentHistory,
          }),
          signal: abortControllerRef.current.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error('Network response was not ok');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let done = false;
      let hasErrorContent = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split('\n\n');
          buffer = parts.pop() || '';

          for (const part of parts) {
            const trimmed = part.trim();
            if (!trimmed.startsWith('data: ')) continue;

            const dataStr = trimmed.substring(6);
            if (dataStr === '[DONE]') {
              done = true;
              break;
            }

            try {
              const data = JSON.parse(dataStr);
              if (data.content) {
                if (data.content.includes("I apologize, but I am having trouble")) {
                  hasErrorContent = true;
                  break;
                }
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === aiMessageId
                      ? { ...msg, content: msg.content + data.content }
                      : msg
                  )
                );
              }
              if (data.error) {
                hasErrorContent = true;
                break;
              }
            } catch (e) {
              // Incomplete JSON — skip
            }
          }

          if (hasErrorContent) break;
        }
      }

      if (hasErrorContent) {
        throw new Error('API returned fallback error');
      }

      setIsStreaming(false);
      abortControllerRef.current = null;
    } catch (error) {
      clearTimeout(timeoutId);
      streamFastFallback(text, aiMessageId);
    }
  }, [messages, streamFastFallback]);

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsStreaming(false);
    }
  }, []);

  return { messages, isStreaming, sendMessage, stopGeneration };
}
