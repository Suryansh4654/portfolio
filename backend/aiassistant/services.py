import json
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from .context import ResumeContextLoader
from django.conf import settings

class AIAssistantService:
    def __init__(self):
        self.context = ResumeContextLoader.load_all_context()
        self.llm = None
        self.is_configured = False
        
        gemini_key = getattr(settings, 'GEMINI_API_KEY', '')
        anthropic_key = getattr(settings, 'ANTHROPIC_API_KEY', '')
        
        # 1. Try initializing Google Gemini (Free Tier API)
        if gemini_key and gemini_key.strip() and gemini_key != 'your-gemini-key-here':
            try:
                from langchain_google_genai import ChatGoogleGenerativeAI
                self.llm = ChatGoogleGenerativeAI(
                    model='gemini-1.5-flash',
                    google_api_key=gemini_key,
                    temperature=0.2,
                )
                self.is_configured = True
                print("AIAssistantService: Successfully configured with Google Gemini API.")
            except Exception as e:
                print(f"AIAssistantService: Failed to load Gemini client: {e}")
        
        # 2. Try initializing Anthropic Claude (Paid API) if Gemini wasn't configured
        if not self.is_configured and anthropic_key and anthropic_key.strip() and anthropic_key != 'sk-ant-your-key-here':
            try:
                from langchain_anthropic import ChatAnthropic
                self.llm = ChatAnthropic(
                    model='claude-3-5-sonnet-20241022',
                    api_key=anthropic_key,
                    temperature=0.2,
                )
                self.is_configured = True
                print("AIAssistantService: Successfully configured with Anthropic Claude API.")
            except Exception as e:
                print(f"AIAssistantService: Failed to load Anthropic client: {e}")

    def _build_system_prompt(self):
        return """You are an AI assistant for Suryansh Pandey's portfolio website. You answer questions about Suryansh's skills, projects, experience, education, achievements, and career goals. Use ONLY the following verified context to answer. Be professional, concise, and helpful. If you don't know something from the context, say so honestly. Never make up information.
        
CONTEXT:
{context}"""

    def _format_history(self, history):
        formatted = []
        if not history:
            return formatted
        for msg in history[-10:]:
            if msg.get('role') == 'user':
                formatted.append(HumanMessage(content=msg.get('content', '')))
            elif msg.get('role') == 'assistant':
                formatted.append(AIMessage(content=msg.get('content', '')))
        return formatted

    def _generate_fallback_response(self, text):
        query = (text or '').lower().strip()
        
        if any(k in query for k in ['hi', 'hello', 'hey', 'yo', 'who are you', 'what is this']):
            return "Hello! I am Suryansh's AI portfolio assistant. Ask me about his full-stack projects (StudyRoom, AI Simulator), DSA progress, skill set, or education at ABES College!"
        
        if any(k in query for k in ['work', 'working', 'currently', 'building', 'now', 'recent']):
            return ("Suryansh is currently working on and building:\n\n"
                    "1. **B.Tech Major AI Project**: Multi-Dataset Heart Disease Risk Prediction using Explainable AI (SHAP interpretability) & class-imbalance algorithms.\n"
                    "2. **StudyRoom** (https://studyroom-px8m.onrender.com) — Real-time collaborative co-working platform using React, Django, WebSockets, and PostgreSQL.\n"
                    "3. **AI & Agentic Learning**: Building Generative AI pipelines with LangChain and orchestrating multi-agent workflows with LangGraph.")

        if any(k in query for k in ['framework', 'backend', 'django', 'python', 'skill', 'tech', 'stack', 'language', 'database']):
            return ("Suryansh's technical arsenal includes:\n\n"
                    "• **Backend**: Python (primary language), Django, Django REST Framework (DRF), RESTful APIs, JWT Authentication, WebSockets\n"
                    "• **AI & LLM**: LangChain, LangGraph, RAG (Retrieval-Augmented Generation), Prompt Engineering, Gemini/OpenAI API integration\n"
                    "• **Databases**: PostgreSQL, MySQL\n"
                    "• **Languages & Tools**: C++, Java, SQL, Git, GitHub, Docker, Postman, VS Code")
        
        if any(k in query for k in ['project', 'studyroom', 'laundry', 'interview', 'app', 'build']):
            return ("Suryansh has built several full-stack applications:\n\n"
                    "1. **StudyRoom** — Real-time collaborative co-working platform using React, Django, WebSockets, and PostgreSQL.\n"
                    "2. **AI Interview Simulator** — Full-stack interview preparation app with Hugging Face models for dynamic question generation.\n"
                    "3. **Digital Laundry System** — Workflow automation platform for hostel laundry with role-based access control.\n"
                    "4. **B.Tech Major Project** — Multi-Dataset Heart Disease Risk Prediction using Explainable AI (SHAP) and class-imbalance algorithms.")
        
        if any(k in query for k in ['achievement', 'rank', 'codevita', 'tcs', 'dsa', 'leetcode', 'codechef']):
            return ("Suryansh's competitive coding highlights:\n\n"
                    "• **TCS CodeVita Season 13**: Achieved Global Rank **3448** among 100,000+ competitors.\n"
                    "• **DSA Problem Solving**: 300+ problems solved across LeetCode & CodeChef.\n"
                    "• **Infosys DSE**: Secured Digital Specialist Engineer role via HackWithInfy 2026.")
        
        if any(k in query for k in ['education', 'college', 'aktu', 'grade', 'cgpa', 'degree', 'abes']):
            return ("Suryansh is a final-year B.Tech CSE student at **ABES Engineering College** (AKTU):\n\n"
                    "• **B.Tech CGPA**: 8.23 / 10\n"
                    "• **Class XII (CBSE)**: 82.83%\n"
                    "• **Class X (CBSE)**: 87.33%")
        
        if any(k in query for k in ['contact', 'email', 'phone', 'linkedin', 'github', 'reach']):
            return ("Direct contact details for Suryansh Pandey:\n\n"
                    "• **Email**: su12345pandey@gmail.com\n"
                    "• **Phone**: +91-9580361022\n"
                    "• **LinkedIn**: https://www.linkedin.com/in/backend-suryansh-pandey/\n"
                    "• **GitHub**: https://github.com/Suryansh4654")
        
        return ("Suryansh is an AI Engineer and Full-Stack Developer specializing in Python, Django, React, WebSockets, and LLM integrations. "
                "Feel free to ask about his projects (StudyRoom, Laundry System), skills, DSA metrics, or education!")

    def stream_response(self, user_message, history):
        if not self.is_configured or self.llm is None:
            yield self._generate_fallback_response(user_message)
            return
            
        try:
            prompt = ChatPromptTemplate.from_messages([
                ("system", self._build_system_prompt()),
                MessagesPlaceholder("history"),
                ("human", "{user_message}")
            ])
            
            formatted_history = self._format_history(history)
            chain = prompt | self.llm
            
            for chunk in chain.stream({
                "context": self.context,
                "history": formatted_history,
                "user_message": user_message
            }):
                if chunk.content:
                    content = chunk.content
                    if isinstance(content, list):
                        text_parts = []
                        for part in content:
                            if isinstance(part, dict) and part.get('type') == 'text':
                                text_parts.append(part.get('text', ''))
                            elif isinstance(part, str):
                                text_parts.append(part)
                        yield "".join(text_parts)
                    elif isinstance(content, str):
                        yield content
        except Exception as e:
            import sys
            print(f"LLM streaming error: {e}, serving grounded fallback.", file=sys.stderr, flush=True)
            yield self._generate_fallback_response(user_message)
