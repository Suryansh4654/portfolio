import json
import re
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
        return """You are Suryansh's AI Portfolio Assistant on his portfolio website. You answer questions about Suryansh's skills, projects, experience, education, achievements, and career goals.

RULES & STRICT ANTI-HALLUCINATION BOUNDARIES:
1. Only answer using the supplied portfolio context data.
2. Never invent: projects, companies, technologies, achievements, work experience, or qualifications.
3. Never exaggerate Suryansh's expertise beyond what is stated in the context.
4. Do not infer proficiency beyond the provided information.
5. If the requested information is unavailable in the context, clearly state: "I don't have that information."
6. Clearly distinguish between proven skills, completed projects, competitive achievements, and current learning areas.
7. Default contact channels are Email and LinkedIn. Only mention phone number if explicitly requested.

CONTEXT DATA:
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
        tokens = set(re.findall(r'\b\w+\b', query))
        
        # Greetings
        if any(w in tokens for w in ['hi', 'hello', 'hey', 'greetings', 'yo']):
            return ("Hello! 👋 I am Suryansh's AI Portfolio Assistant.\n\n"
                    "Feel free to ask me about:\n"
                    "• **Strongest Skills**: Python, Django REST, React, WebSockets, PostgreSQL, LangChain & RAG\n"
                    "• **Featured Projects**: EventHub, StudyRoom, AI Interview Simulator, AI-Powered Portfolio\n"
                    "• **Achievements**: TCS CodeVita Global Rank 3448, Infosys DSE Offer, 300+ DSA Solved\n"
                    "• **Education**: B.Tech CSE at ABES College (8.23 CGPA)")

        # EventHub
        if 'eventhub' in query:
            return ("🎉 **EventHub — Full-Stack Event Management & Ticket Booking Platform**\n\n"
                    "• **Problem/Solution**: Full-stack platform for creating events, managing attendees, and handling ticket registrations with role-based access control.\n"
                    "• **Tech Stack**: React, Django, DRF, PostgreSQL, JWT\n"
                    "• **Key Highlights**: Role-based authentication, event creation & management, attendee registration, ticket management, REST APIs, responsive React frontend.\n"
                    "• **Live Demo**: [https://eventhub-live.vercel.app/](https://eventhub-live.vercel.app/)\n"
                    "• **GitHub**: [https://github.com/Suryansh4654/eventhub](https://github.com/Suryansh4654/eventhub)")

        # StudyRoom
        if 'studyroom' in query or 'coworking' in query:
            return ("🚀 **StudyRoom — Real-Time Collaborative Co-Working Platform**\n\n"
                    "• **Problem/Solution**: Real-time collaborative co-working platform that allows users to create/join rooms and communicate through WebSockets.\n"
                    "• **Tech Stack**: React, Django, WebSockets, PostgreSQL\n"
                    "• **Key Highlights**: Real-time communication, room creation/joining, WebSocket-based updates, user authentication, collaborative workspace.\n"
                    "• **Live Demo**: [https://studyroom-px8m.onrender.com](https://studyroom-px8m.onrender.com)\n"
                    "• **GitHub**: [https://github.com/Suryansh4654/studyroom](https://github.com/Suryansh4654/studyroom)")

        # AI Interview Simulator
        if 'interview' in query or 'simulator' in query:
            return ("🤖 **AI Interview Simulator (Team Project)**\n\n"
                    "• **Problem/Solution**: Full-stack interview prep platform integrating Hugging Face APIs for automated question generation and evaluation.\n"
                    "• **My Contribution**: Backend / API / AI Integration\n"
                    "• **Tech Stack**: Python, Django, React, Hugging Face APIs\n"
                    "• **Key Highlights**: Automated question generation, Q&A flow evaluation engine, performance scoring, Streamlit dashboard.\n"
                    "• **GitHub**: [https://github.com/yash5749/interview-sim](https://github.com/yash5749/interview-sim)")

        # Strongest Skills / Django
        if any(w in tokens for w in ['skills', 'skill', 'django', 'backend', 'python', 'technologies', 'stack', 'hire']):
            return ("🛠️ **Suryansh's Core Skills & Technical Arsenal**:\n\n"
                    "• **Languages**: Python, Java, C++, JavaScript, SQL\n"
                    "• **Backend**: Django, Django REST Framework (DRF), REST APIs, WebSockets, JWT Authentication\n"
                    "• **AI / GenAI**: LangChain, LangGraph, RAG (Retrieval-Augmented Generation), Prompt Engineering, Gemini API\n"
                    "• **Frontend**: React, HTML, CSS, Tailwind CSS\n"
                    "• **Database & Tools**: PostgreSQL, MySQL, Docker, Git/GitHub, Postman")

        # Achievements / CodeVita / Infosys / DSA
        if any(w in tokens for w in ['achievement', 'achievements', 'codevita', 'rank', 'infosys', 'dse', 'dsa', 'leetcode', 'codechef']):
            return ("🏆 **Key Achievements & Recognitions**:\n\n"
                    "• **TCS CodeVita Season 13**: Global Rank **3448** among 100,000+ competitors.\n"
                    "• **Infosys DSE Offer**: Qualified for Digital Specialist Engineer role via HackWithInfy 2026.\n"
                    "• **DSA Problem Solving**: 300+ problems solved across LeetCode & CodeChef.\n"
                    "• **B.Tech CSE**: 8.23 CGPA at ABES Engineering College.")

        # Education
        if any(w in tokens for w in ['education', 'college', 'cgpa', 'degree', 'aktu', 'abes']):
            return ("🎓 **Education Summary**:\n\n"
                    "• **B.Tech in Computer Science & Engineering**: ABES Engineering College (AKTU) — **CGPA: 8.23**\n"
                    "• **Class XII (CBSE)**: 82.83%\n"
                    "• **Class X (CBSE)**: 87.33%")

        # Contact / Reach
        if any(w in tokens for w in ['contact', 'email', 'reach', 'linkedin', 'github', 'phone', 'number']):
            if 'phone' in query or 'number' in query or 'call' in query:
                return ("You can reach Suryansh by phone at +91-9580361022 or via email at su12345pandey@gmail.com.")
            return ("📫 **You can connect with Suryansh through**:\n\n"
                    "• **Email**: su12345pandey@gmail.com\n"
                    "• **LinkedIn**: [https://www.linkedin.com/in/backend-suryansh-pandey/](https://www.linkedin.com/in/backend-suryansh-pandey/)\n"
                    "• **GitHub**: [https://github.com/Suryansh4654](https://github.com/Suryansh4654)\n"
                    "• **LeetCode**: [https://leetcode.com/u/suryansh_4654/](https://leetcode.com/u/suryansh_4654/)")

        return ("Suryansh Pandey is an AI Engineer and Backend-Focused Full-Stack Developer specializing in Python, Django REST, React, WebSockets, and LLM RAG pipelines.\n\n"
                "Feel free to ask about his projects (EventHub, StudyRoom), skills, CodeVita rank, or education!")

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
