# Suryansh Pandey — AI-Powered Portfolio 🚀

Production-grade full-stack developer portfolio built with React and Django, featuring an AI assistant grounded in structured portfolio context via Retrieval-Augmented Generation (RAG) principles.

[🌐 Live Demo](https://suryanshpandey-dev.vercel.app) | [⚡ Backend API](https://portfolio-backend-13rc.onrender.com)

---

## 🤖 AI Assistant (`Portfolio AI Assistant`)
Integrated streaming AI assistant trained and grounded strictly on verified portfolio context (`resume_context/`):
* **Model**: Google Gemini API (`gemini-3.6-flash` / `gemini-2.5-flash`) via LangChain
* **Anti-Hallucination**: Strict prompt rules enforcing factual boundaries
* **Fallback System**: Instant intent recognition engine for rapid answers

---

## ✨ Features
* **Developer X Dark Minimalist UI**: High-contrast, recruiter-ready design layout.
* **Featured Projects Showcase**: Live project integration (EventHub, StudyRoom AI, AI Interview Simulator).
* **Competitive Milestones**: TCS CodeVita Global Rank 3448, Infosys DSE Offer, 300+ DSA Solved.
* **Production API & Security**: Django REST Framework, JWT Auth, CORS headers, rate-limiting throttle protection.

---

## 🛠 Tech Stack

### Frontend
* **Framework**: React 18, Vite
* **Styling**: Tailwind CSS
* **Icons & Motion**: Lucide React, Framer Motion

### Backend
* **Framework**: Python 3.12, Django 5.1, Django REST Framework
* **AI & LLM**: LangChain, LangChain Google GenAI, Gemini API
* **Database**: PostgreSQL / SQLite3
* **Production Server**: Uvicorn / Gunicorn, Docker

---

## 🏗 Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend (Vite)                    │
│             https://suryanshpandey-dev.vercel.app           │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JSON API Calls
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Django REST Backend (Render)                │
│            https://portfolio-backend-13rc.onrender.com      │
│  ┌────────────────────────┐     ┌────────────────────────┐  │
│  │ Portfolio & Contact    │     │  LangChain AI Engine   │  │
│  │ REST Endpoints         │     │  Google Gemini API     │  │
│  └────────────────────────┘     └────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```text
portfolio/
├── frontend/             # Vite + React 18 Frontend
│   ├── src/
│   │   ├── components/   # Layout, Sections & Chat Widget
│   │   ├── data/         # Fallback data
│   │   ├── hooks/        # Custom React hooks (useChat, etc.)
│   │   └── services/     # API service configuration
│   └── package.json
├── backend/              # Django 5.1 REST Backend
│   ├── aiassistant/      # Gemini LangChain RAG Service
│   ├── contact/          # Contact Form API
│   ├── portfolio/        # Profile & Project Data API
│   ├── resume_context/   # Verified single source of truth JSONs
│   ├── config/           # Django settings & URL routing
│   └── Dockerfile
└── README.md
```

---

## 🚀 Getting Started

### Local Development

#### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
DEBUG=True
SECRET_KEY=your-django-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1
GEMINI_API_KEY=your-google-gemini-api-key
```

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
