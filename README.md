# Suryansh Pandey — Portfolio Website

A production-grade, full-stack personal portfolio with an AI-powered "Ask My Portfolio" chat widget.

**Live AI Feature**: Recruiters and visitors can ask natural-language questions about my skills, projects, and career — powered by Claude (Anthropic) with LangChain for prompt/context orchestration.

## Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Django 5.1 + Django REST Framework |
| **Frontend** | React 19 + Vite + Tailwind CSS v4 + Framer Motion |
| **Database** | PostgreSQL 16 |
| **AI** | LangChain + Anthropic Claude API (streaming SSE) |
| **Auth** | JWT (djangorestframework-simplejwt) |
| **Containerization** | Docker + Docker Compose |

## Quick Start

### Prerequisites
- Docker & Docker Compose
- An Anthropic API key (for AI chat) — [Get one here](https://console.anthropic.com/)

### 1. Clone & Configure

```bash
git clone <repo-url>
cd portfolio

# Backend env
cp backend/.env.example backend/.env
# Edit backend/.env and add your ANTHROPIC_API_KEY

# Frontend env
cp frontend/.env.example frontend/.env
```

### 2. Run with Docker (Recommended)

```bash
docker-compose up --build
```

This starts 3 containers:
- **PostgreSQL** on port `5432`
- **Django API** on port `8000` (Uvicorn ASGI)
- **React Frontend** on port `5173` (Vite dev server)

Visit: [http://localhost:5173](http://localhost:5173)

### 3. Run Without Docker

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Update DATABASE_URL in .env to point to your local Postgres
python manage.py migrate
python manage.py seed_data
uvicorn config.asgi:application --reload --port 8000
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Required |
|---|---|---|
| `SECRET_KEY` | Django secret key | Yes |
| `DEBUG` | Debug mode (True/False) | Yes |
| `DATABASE_URL` | PostgreSQL connection URL | Yes |
| `ANTHROPIC_API_KEY` | Anthropic API key for Claude | Yes (for AI chat) |
| `ALLOWED_HOSTS` | Comma-separated allowed hosts | Yes |
| `CORS_ALLOWED_ORIGINS` | Comma-separated CORS origins | Yes |
| `EMAIL_BACKEND` | Django email backend class | No (defaults to console) |
| `DEFAULT_FROM_EMAIL` | Sender email address | No |
| `PORTFOLIO_ADMIN_EMAIL` | Email to receive contact messages | No |

### Frontend (`frontend/.env`)

| Variable | Description | Required |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | Yes |

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/portfolio/profile/` | GET | Profile, bio, education |
| `/api/portfolio/skills/` | GET | Grouped skills with icons |
| `/api/portfolio/projects/` | GET | All projects with details |
| `/api/portfolio/achievements/` | GET | Achievements & certifications |
| `/api/portfolio/career-narrative/` | GET | Currently building / learning |
| `/api/ai-chat/` | POST | AI chat (streaming SSE response) |
| `/api/contact/` | POST | Contact form submission |

## AI Chat Feature

The "Ask My Portfolio" widget uses:
- **LangChain** to structure the prompt pipeline (system prompt + grounded context + conversation history)
- **Anthropic Claude** as the LLM provider
- **Server-Sent Events (SSE)** for token-by-token streaming
- **Rate limiting** (10 requests/minute per IP) to prevent abuse

### Swapping AI Providers

The AI service is in `backend/aiassistant/services.py`. To use a different provider:

1. Install the LangChain provider package (e.g., `langchain-openai`)
2. Update `AIAssistantService.__init__()` to use the new model class
3. Update the API key environment variable in `.env`

### Updating Portfolio Content

All AI context is stored as structured JSON in `backend/resume_context/`:
- `profile.json` — Bio, positioning, education, links
- `skills.json` — Technical skills grouped by category
- `projects.json` — Project details with descriptions and features
- `achievements.json` — Achievements and certifications
- `career_narrative.json` — Target role, current learning, in-progress work

Edit any JSON file to update what the AI knows. No code changes needed.

## Deployment

### Backend + Database → Render

1. Create a **PostgreSQL** database on Render
2. Create a **Web Service** from the `backend/` directory
3. Set environment variables (DATABASE_URL from Render Postgres, ANTHROPIC_API_KEY, etc.)
4. Build command: `pip install -r requirements.txt && python manage.py migrate && python manage.py seed_data && python manage.py collectstatic --noinput`
5. Start command: `uvicorn config.asgi:application --host 0.0.0.0 --port $PORT`

### Frontend → Vercel

1. Connect repo, set root directory to `frontend/`
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set `VITE_API_URL` to your Render backend URL

## Project Structure

```
portfolio/
├── docker-compose.yml          # 3-service Docker setup
├── backend/
│   ├── config/                 # Django project settings
│   ├── portfolio/              # Portfolio content app (models, API)
│   ├── contact/                # Contact form app
│   ├── aiassistant/            # AI chat endpoint (LangChain + Claude)
│   ├── resume_context/         # Structured JSON data for AI context
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/         # React components (sections, chat, ui, layout)
│   │   ├── hooks/              # Custom hooks (useTheme, useChat, usePortfolioData)
│   │   ├── services/           # API service layer
│   │   └── data/               # Fallback data
│   ├── Dockerfile
│   └── package.json
└── README.md
```

## Built By

**Suryansh Pandey** — AI Engineer & Full-Stack Developer

Built with Django + DRF + React + Claude API to demonstrate the very AI engineering stack described within.
