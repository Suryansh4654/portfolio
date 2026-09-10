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
            from langchain_google_genai import ChatGoogleGenerativeAI
            models_to_try = ['gemini-3.6-flash', 'gemini-2.5-flash', 'gemini-1.5-flash-latest', 'gemini-1.5-flash']
            
            for model_name in models_to_try:
                try:
                    self.llm = ChatGoogleGenerativeAI(
                        model=model_name,
                        google_api_key=gemini_key,
                        temperature=0.2,
                    )
                    self.is_configured = True
                    print(f"AIAssistantService: Successfully configured with Google Gemini API ({model_name}).")
                    break
                except Exception as e:
                    print(f"AIAssistantService: Failed to load Gemini client ({model_name}): {e}")
        
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
        return """You are Suryansh Pandey's personal AI Assistant on his portfolio website. You speak warmly, professionally, and authoritatively about Suryansh's full-stack & AI engineering skills, projects, achievements, and career goals.

Context Data:
{context}

Guidelines:
- Give clear, structured, well-formatted markdown responses.
- Highlight key facts like TCS CodeVita Rank 3448 (Top 3.5% globally), Infosys DSE offer, 300+ DSA problems solved, and B.Tech 8.23 CGPA.
- For project queries, mention EventHub (https://eventhub-live.vercel.app/), StudyRoom AI (https://studyroom-px8m.onrender.com), and AI Interview Simulator.
- Be concise, smart, and enthusiastic about Suryansh's engineering capabilities!"""

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
        
        if any(k in query for k in ['hi', 'hello', 'hey', 'yo', 'who are you', 'what is this', 'greet']):
            return ("Hello! 👋 I am Suryansh's AI Portfolio Assistant.\n\n"
                    "Feel free to ask me anything about:\n"
                    "• **Featured Builds**: EventHub, StudyRoom AI, AI Interview Simulator\n"
                    "• **Technical Skills**: Python, Django REST, ReactJS, WebSockets, PostgreSQL, LangChain & RAG\n"
                    "• **Milestones**: TCS CodeVita Rank 3448, Infosys DSE Offer, 300+ DSA Solved\n"
                    "• **Contact & Education**: B.Tech CSE (8.23 CGPA), Email, LinkedIn & Resume!")

        if any(k in query for k in ['eventhub', 'event']):
            return ("🎉 **EventHub — Full-Stack Event Management & Ticketing Platform**\n\n"
                    "• **Summary**: Full-stack event management and real-time ticketing platform supporting dynamic event creation, attendee registration, and role-based access control.\n"
                    "• **Tech Stack**: ReactJS, Python, Django REST Framework, PostgreSQL, Tailwind CSS\n"
                    "• **Live Preview**: [https://eventhub-live.vercel.app/](https://eventhub-live.vercel.app/)\n"
                    "• **Source Code**: [GitHub Repo](https://github.com/Suryansh4654/eventhub)")

        if any(k in query for k in ['studyroom', 'co-working', 'socket', 'chat']):
            return ("🚀 **StudyRoom — Real-Time Collaborative Co-Working Platform**\n\n"
                    "• **Summary**: Real-time collaborative co-working platform enabling multi-user sessions, live chat, shared task checklists, and synchronized study timers.\n"
                    "• **Tech Stack**: ReactJS, Python, Django, WebSockets, PostgreSQL\n"
                    "• **Live App**: [https://studyroom-px8m.onrender.com](https://studyroom-px8m.onrender.com)\n"
                    "• **Source Code**: [GitHub Repo](https://github.com/Suryansh4654/studyroom)")

        if any(k in query for k in ['interview', 'simulator', 'hugging', 'ai simulator']):
            return ("🤖 **AI Interview Simulator**\n\n"
                    "• **Summary**: Full-stack interview prep platform integrating Hugging Face models for automated question generation and candidate evaluation.\n"
                    "• **Tech Stack**: Python, Django REST, ReactJS, Hugging Face APIs, Streamlit\n"
                    "• **Source Code**: [GitHub Repo](https://github.com/yash5749/interview-sim)")

        if any(k in query for k in ['work', 'working', 'currently', 'building', 'now', 'recent', 'focus']):
            return ("⚡ **Suryansh's Current Engineering Focus**:\n\n"
                    "1. **B.Tech Major AI Capstone**: Multi-Dataset Heart Disease Risk Prediction using Explainable AI (SHAP interpretability) & class-imbalance algorithms.\n"
                    "2. **Production Systems**: Building scalable Django REST APIs, WebSockets microservices, and high-contrast web UIs.\n"
                    "3. **GenAI & Agentic AI**: Orchestrating multi-agent RAG workflows using LangChain and LangGraph.")

        if any(k in query for k in ['framework', 'backend', 'django', 'python', 'skill', 'tech', 'stack', 'language', 'database', 'react']):
            return ("🛠️ **Suryansh's Technical Arsenal**:\n\n"
                    "• **Backend**: Python (Primary), Django, Django REST Framework (DRF), RESTful APIs, JWT Auth, WebSockets\n"
                    "• **AI & GenAI**: LangChain, LangGraph, RAG (Retrieval-Augmented Generation), Prompt Engineering, Gemini API\n"
                    "• **Frontend**: ReactJS, HTML5, CSS3, Tailwind CSS, JavaScript (ES6+)\n"
                    "• **Databases & Tools**: PostgreSQL, MySQL, Docker, Git, GitHub, Postman, C++, Java")

        if any(k in query for k in ['achievement', 'rank', 'codevita', 'tcs', 'dsa', 'leetcode', 'codechef', 'infosys', 'dse', 'award', 'offer']):
            return ("🏆 **Competitive Coding & Placement Milestones**:\n\n"
                    "1. **TCS CodeVita Season 13**: Achieved **Global Rank 3448** (Top 3.5% globally among 100,000+ competitors).\n"
                    "2. **Infosys Digital Specialist Engineer (DSE) Offer**: Qualified for top-tier DSE role through HackWithInfy 2026.\n"
                    "3. **300+ DSA Problems Solved**: Active problem solver on LeetCode & CodeChef across Arrays, Graphs, DP, and Trees.")

        if any(k in query for k in ['education', 'college', 'aktu', 'grade', 'cgpa', 'degree', 'abes', 'school']):
            return ("🎓 **Academic Background**:\n\n"
                    "• **B.Tech (Computer Science & Engineering)**: ABES Engineering College, AKTU (2023 - Present) — **CGPA: 8.23**\n"
                    "• **Class XII (CBSE Science)**: St. Joseph's School — **82.83%**\n"
                    "• **Class X (CBSE)**: St. Joseph's School — **87.33%**")

        if any(k in query for k in ['contact', 'email', 'phone', 'linkedin', 'github', 'reach', 'hire', 'mail']):
            return ("📬 **Direct Contact Info for Suryansh Pandey**:\n\n"
                    "• **Email**: su12345pandey@gmail.com\n"
                    "• **Phone**: +91-9580361022\n"
                    "• **LinkedIn**: [linkedin.com/in/backend-suryansh-pandey](https://www.linkedin.com/in/backend-suryansh-pandey/)\n"
                    "• **GitHub**: [github.com/Suryansh4654](https://github.com/Suryansh4654)\n"
                    "• **LeetCode**: [leetcode.com/u/suryansh_4654](https://leetcode.com/u/suryansh_4654/)")

        return ("Suryansh Pandey is an AI Engineer & Full-Stack Developer specializing in Python, Django REST, React, WebSockets, and LLM RAG pipelines.\n\n"
                "Ask me about his live projects (**EventHub**, **StudyRoom AI**), DSA achievements (TCS CodeVita Rank 3448), or technical skill set!")

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
            
            has_emitted = False
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
                            elif hasattr(part, 'text'):
                                text_parts.append(getattr(part, 'text', ''))
                        text = "".join(text_parts)
                    else:
                        text = str(content)
                        
                    if text:
                        has_emitted = True
                        yield text

            if not has_emitted:
                yield self._generate_fallback_response(user_message)

        except Exception as e:
            print(f"AIAssistantService streaming error: {e}")
            yield self._generate_fallback_response(user_message)
