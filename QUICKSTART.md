# ContentPulse - Quick Start Guide

## Installation & Setup

### Step 1: Configure Environment
```bash
cp .env.example .env
# Edit .env with your AWS credentials:
# - AWS_REGION
# - AWS_ACCESS_KEY_ID  
# - AWS_SECRET_ACCESS_KEY
```

### Step 2: Start Backend
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:3001
```

### Step 3: Start Frontend (new terminal)
```bash
cd frontend
npm install
npm start
# App opens at http://localhost:3000
```

## Quick Test

1. **Dashboard**: View metrics and trends (auto-loads mock data)
2. **Chat**: Ask "What's our top performing topic?"
3. **Insights**: Click "Generate Insights with Claude"
4. **Reports**: Generate biweekly report with recommendations

## API Endpoints

- `POST /agent/chat` - Llama chat (conversational)
- `POST /agent/insights` - Claude insights (deep analysis)
- `POST /agent/report` - Claude report (biweekly)
- `GET /analytics/data` - Mock data (420 articles)

## Features

✅ React Dashboard with Figma-matching design
✅ Real-time metrics (420 articles, 8 topics)
✅ 14-day performance trends
✅ Claude 3.5 Sonnet AI insights & reports
✅ Llama 3.1 conversational chat
✅ Responsive UI with animations
✅ Mock data generation
✅ Session-based chat history

## File Locations

**Backend**: `/backend/src/`, `/backend/data/`
**Frontend**: `/frontend/src/components/`, `/frontend/src/styles/`
**Config**: `/.env.example`

See README.md for detailed documentation.
