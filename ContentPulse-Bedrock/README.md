# 📖 ContentPulse Bedrock Agent - Complete Guide

Welcome! This is a **production-ready AI-powered content analytics platform** built with Express.js, React, and AWS Bedrock.

---

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js 14+ and npm
- AWS Bedrock credentials (Claude + Llama access)

### 1. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your AWS credentials
npm install
npm start
```

Backend runs on: **http://localhost:5001**

### 2. Frontend Setup (New Terminal)
```bash
cd frontend
npm install
npm start
```

Frontend runs on: **http://localhost:3001**

### 3. Open Dashboard
```bash
open http://localhost:3001
```

**That's it! The full system is running.** 🎉

---

## ✨ Features

### 📊 Dashboard
- Real-time analytics metrics
- Performance trend charts
- Top topics analysis
- Quick-action buttons

### 💬 Chat with Conversation Memory
- Multi-turn conversations with Claude
- **Full conversation context** maintained
- Personalized recommendations
- Natural, flowing dialogue

### 🔍 Insights Generation
- AI-powered content analysis
- Data-driven recommendations
- Strategic insights
- Performance optimization tips

### 📄 Reports
- Multiple report types (Summary, Executive, Detailed)
- Automated generation
- Professional formatting
- Actionable recommendations

---

## 🏗️ Architecture

### Backend (Express.js)
```
Node.js + Express
├── 7 REST Endpoints
├── AWS Bedrock Integration
│   ├── Claude (Analysis, Chat with memory, Reports)
│   └── Llama (Alternative conversations)
├── Mock Analytics (420 test articles)
└── Error Handling & Validation
```

### Frontend (React)
```
React 18
├── Dashboard Component
├── Chat Component (with context memory)
├── Insights Component
├── Reports Component
├── Sidebar Navigation
└── CSS Styling
```

### Data Flow
```
User Input → Frontend → Backend API
              ↓
           AWS Bedrock (Claude/Llama)
              ↓
           Response → Frontend Display
```

---

## 🔑 Key Technical Features

### Chat Memory Implementation
The chat feature maintains **full conversation context**:
- Frontend sends all previous messages to backend
- Backend includes history in Claude prompt
- Claude understands conversation flow
- Responses reference previous messages

### AWS Bedrock Integration
- Claude 4.5 Sonnet for analysis and chat
- Llama 3.1 8B for alternative responses
- Proper system parameter format (Array[Object])
- Error handling for all AWS scenarios

### Bug Fix Applied
- Fixed: "Unexpected field type 'array' for field 'system'"
- Status: ✅ Verified working
- No breaking changes

---

## 📁 Project Structure

```
ContentPulse-Bedrock/
├── backend/
│   ├── src/
│   │   ├── server.js           (Express server + endpoints)
│   │   ├── config.js           (AWS Bedrock config - FIXED)
│   │   ├── bedrockAgent.js     (Agent tools + chat memory)
│   │   └── mockData.js         (420 test articles)
│   ├── package.json
│   └── .env (configure here!)
├── frontend/
│   ├── src/
│   │   ├── App.js              (Main app)
│   │   ├── components/         (5+ React components)
│   │   └── styles/             (CSS stylesheets)
│   ├── package.json
│   └── public/
├── README.md (this file)
└── Documentation/ (90+ files)
    ├── CHAT_MEMORY_READY.md
    ├── DEBUGGING_GUIDE.md
    ├── DEPLOYMENT.md
    └── [80+ more guides]
```

---

## 📚 Available Endpoints

### Health & Analytics
- `GET /health` - Health check
- `GET /analytics/data` - Get all analytics data

### AI Features
- `POST /agent/chat` - Chat with memory support
- `POST /agent/insights` - Generate insights (Claude)
- `POST /agent/report` - Generate reports (Summary/Executive/Detailed)
- `POST /agent/request` - Complex multi-step requests
- `POST /agent/query` - Query with filters

---

## 🔧 Configuration

### Backend (.env file)
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
PORT=5001
```

### AWS Bedrock Models
```
Claude: arn:aws:bedrock:us-east-1:911167923180:inference-profile/us.anthropic.claude-sonnet-4-5-20250929-v1:0
Llama:  arn:aws:bedrock:us-east-1:911167923180:inference-profile/us.meta.llama3-1-8b-instruct-v1:0
```

---

## 🧪 Testing

### Test Curl Endpoints
```bash
# Health check
curl http://localhost:5001/health

# Chat with context
curl -X POST http://localhost:5001/agent/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello", "context":""}'

# Generate insights
curl -X POST http://localhost:5001/agent/insights \
  -H "Content-Type: application/json" \
  -d '{"query":"Analyze my content"}'

# Generate report
curl -X POST http://localhost:5001/agent/report \
  -H "Content-Type: application/json" \
  -d '{"reportType":"summary"}'
```

---

## 📖 Documentation

Comprehensive guides included:

| Document | Purpose |
|----------|---------|
| `CHAT_MEMORY_READY.md` | Chat memory feature guide |
| `DEBUGGING_GUIDE.md` | Troubleshooting (20+ scenarios) |
| `DEPLOYMENT.md` | Production deployment |
| `GITHUB_AUTH_SETUP.md` | Push to GitHub guide |
| `STEP_BY_STEP_PUSH.md` | Visual push instructions |
| And 80+ more | Architecture, features, setup |

---

## 🚀 Deployment

### Production Build
```bash
# Backend
cd backend
npm install --production
NODE_ENV=production npm start

# Frontend
cd frontend
npm run build
# Serves optimized build from build/ directory
```

### Docker (Optional)
```bash
docker-compose up
```

See `DEPLOYMENT.md` for full instructions.

---

## 🐛 Troubleshooting

### Backend Issues
See `DEBUGGING_GUIDE.md` for:
- Module not found errors
- Port already in use
- AWS credential errors
- Claude timeout issues
- And 16+ other scenarios

### Frontend Issues
- Clear cache: `rm -rf node_modules/.cache`
- Restart: `npm start`
- Check backend is running on 5001
- Open http://localhost:3001

### Chat Not Remembering Context
- Check `CHAT_MEMORY_READY.md`
- Verify backend is using Claude
- Check conversation history is being sent

---

## ✅ Verified Features

- ✅ Backend starts and responds on port 5001
- ✅ Claude AI generates comprehensive insights
- ✅ Chat maintains full conversation memory
- ✅ Frontend compiles and runs on port 3001
- ✅ All 7 API endpoints functional
- ✅ End-to-end integration working
- ✅ Bug fix verified (no module errors)
- ✅ AWS Bedrock integration stable

---

## 📊 Performance

| Operation | Time |
|-----------|------|
| Backend startup | 3-5 sec |
| Claude API call | 10-15 sec |
| Frontend load | 2-3 sec |
| Dashboard render | 1-2 sec |
| Chat response | 5-10 sec |

---

## 🔐 Security

- AWS credentials in `.env` (not in code)
- CORS enabled for local development
- Input validation on all endpoints
- Error messages sanitized
- No sensitive data in logs

---

## 🤝 Contributing

1. Fork the repo
2. Create feature branch
3. Make changes
4. Test locally
5. Submit pull request

---

## 📝 License

MIT License - Feel free to use for personal or commercial projects

---

## 💡 Next Steps

1. ✅ Backend running on 5001
2. ✅ Frontend running on 3001
3. 📖 Read CHAT_MEMORY_READY.md
4. 🧪 Test chat with multi-turn conversation
5. 📊 Try insights and reports
6. 🚀 Deploy to production (see DEPLOYMENT.md)

---

## 🎯 Features You Can Extend

- Add database persistence
- Implement user authentication
- Add content scheduling
- Build analytics export features
- Create custom report templates
- Add team collaboration
- Integrate with content platforms

---

## 📞 Support

For detailed help, see documentation files:
- Questions about setup? → `GITHUB_AUTH_SETUP.md`
- Technical issues? → `DEBUGGING_GUIDE.md`
- Want to deploy? → `DEPLOYMENT.md`
- Chat not working? → `CHAT_MEMORY_READY.md`
- 80+ more guides available

---

**Built with ❤️ using Express.js, React, and AWS Bedrock**

**Enjoy your AI-powered analytics platform!** 🚀
