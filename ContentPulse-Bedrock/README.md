# 🚀 ContentPulse: AI-Powered Content Analytics Agent

**Status: Ready for Live Deployment ✅**

ContentPulse is a full-stack AI agent that transforms content teams' analytics into actionable insights in seconds, not hours.

---

## 📋 Quick Links

| Document | Purpose |
|----------|---------|
| **[DEPLOYMENT_COMPLETE.md](./DEPLOYMENT_COMPLETE.md)** | Final readiness summary & deployment overview |
| **[EXECUTE_DEPLOYMENT_NOW.md](./EXECUTE_DEPLOYMENT_NOW.md)** | Step-by-step deployment instructions (START HERE) |
| **[LIVE_DEPLOYMENT_CHECKLIST.md](./LIVE_DEPLOYMENT_CHECKLIST.md)** | Detailed checklist with all configurations |
| **[DEMO_SCRIPT.md](./DEMO_SCRIPT.md)** | Live demo walkthrough & talking points |

---

## 🎯 What Is ContentPulse?

### **The Problem**
Content teams spend 5+ hours per week on manual reporting and analysis.

### **The Solution**
An AI agent that converses naturally with content teams, instantly analyzing 420+ articles to identify trends, opportunities, and actionable recommendations.

### **Key Features**
- 💬 **Conversational Analytics** — Chat in plain English, no dashboard training needed
- 🤖 **AI-Powered Insights** — Claude 3.5 analyzes patterns and generates recommendations
- 📊 **Automated Reports** — Bi-weekly reports with executive summaries and next steps
- ⚡ **Real-time Results** — Insights in 2 seconds instead of 4 hours

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js, responsive CSS |
| **Backend** | Express.js, Node.js |
| **AI Models** | AWS Bedrock (Claude 3.5 + Llama 3.1) |
| **Data** | Mock analytics (Phase 2: real DB) |
| **Deployment** | Vercel (frontend) + Render (backend) |

---

## 📁 Project Structure

```
ContentPulse-Bedrock/
├── frontend/                    # React app
│   ├── public/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── vercel.json             # Vercel config
│   └── .vercelignore
│
├── backend/                     # Express server
│   ├── src/
│   │   ├── server.js           # Express app
│   │   └── bedrockAgent.js      # AI integration
│   ├── data/
│   │   └── mockData.js         # Analytics data
│   ├── package.json
│   ├── .env                    # Environment variables
│   └── .renderignore
│
├── render.yaml                  # Render deployment config
├── EXECUTE_DEPLOYMENT_NOW.md   # START HERE for deployment
├── DEPLOYMENT_COMPLETE.md      # Full readiness summary
└── verify-deployment-ready.sh   # Verification script
```

---

## 🚀 Quick Start (Local Development)

### **Backend**
```bash
cd backend

# Create .env with your AWS credentials
cat > .env << EOF
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key_here
AWS_SECRET_ACCESS_KEY=your_secret_here
CLAUDE_MODEL=claude-3-5-sonnet-20241022
LLAMA_MODEL=llama3.1-8b-instruct
PORT=5001
NODE_ENV=development
EOF

npm install
npm start
# Server runs on http://localhost:5001
```

### **Frontend**
```bash
cd frontend

npm install
npm start
# App opens on http://localhost:3001
```

---

## 🌐 Live Deployment (25 minutes)

### **One-Line Summary:**
1. Create Vercel account → Deploy frontend
2. Create Render account → Deploy backend (with AWS credentials)
3. Connect them together
4. Share your URL with judges

### **Detailed Instructions:**
👉 **See [EXECUTE_DEPLOYMENT_NOW.md](./EXECUTE_DEPLOYMENT_NOW.md)**

### **After Deployment:**
- Frontend URL: `https://contentpulse-bedrock.vercel.app`
- Backend URL: `https://contentpulse-bedrock-backend.onrender.com`
- Share only the frontend URL with judges (no setup needed!)

---

## 🧪 Testing the Agent

### **Local Testing**
```bash
# Terminal 1: Start backend
cd backend && npm start

# Terminal 2: Start frontend
cd frontend && npm start

# Browser: http://localhost:3001
# Chat: "What's our top performing topic?"
```

### **Live Testing**
```
Visit: https://contentpulse-bedrock.vercel.app
Chat: "What's our top performing topic?"
Response: AI analyzes 420 articles and gives insights
```

---

## 📊 Demo Walkthrough (5 minutes)

1. **Dashboard** (30 sec)
   - Show analytics cards: 420 articles, 145K views, 7.8% engagement
   - Show 14-day trend chart

2. **Chat** (1 min)
   - Ask: "What's our top performing topic?"
   - AI responds with insights in 2 seconds

3. **Insights** (1 min)
   - Ask: "Generate insights on AI content performance"
   - AI provides opportunities and recommendations

4. **Backend** (30 sec)
   - Show Terminal logs proving real API calls

See [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) for full talking points.

---

## 🔐 Security & Credentials

### **AWS Credentials**
- ✅ Stored only in Render environment variables
- ✅ Never exposed to frontend
- ✅ Never committed to GitHub
- ✅ Users don't need credentials (backend is intermediary)

### **How It Works**
```
User → Frontend (Vercel) → Backend (Render, has credentials) → AWS Bedrock
```

### **Cost**
- Vercel: FREE
- Render: FREE (or $7/mo starter)
- AWS Bedrock: ~$0.01-0.05 per query (pay-as-you-go)

---

## 📈 Roadmap

| Phase | Timeline | Focus |
|-------|----------|-------|
| **1** | ✅ Done | MVP with mock data, conversational AI |
| **2** | 3 months | Real data (HubSpot, GA), user auth, database |
| **3** | 6 months | Slack integration, scheduled reports, Zapier |
| **4** | 9-12 mo | Custom model training, predictive analytics |

---

## 💡 Key Insights

### **Why This Works**
- ✅ Solves real pain (5 hrs/week saved per person)
- ✅ Uses cutting-edge AI (Claude 3.5, AWS Bedrock)
- ✅ Production-ready architecture (horizontally scalable)
- ✅ MVP validates concept before major investment

### **Competitive Advantages**
- Conversational (vs. static dashboards)
- Content-specific (vs. generic AI tools)
- Easy integration (vs. complex platforms)
- Real-time insights (vs. scheduled reports)

---

## 📞 Support

### **Deployment Issues?**
1. Check [EXECUTE_DEPLOYMENT_NOW.md](./EXECUTE_DEPLOYMENT_NOW.md)
2. See troubleshooting section in [LIVE_DEPLOYMENT_CHECKLIST.md](./LIVE_DEPLOYMENT_CHECKLIST.md)

### **Local Development Issues?**
1. Verify Node.js v18+: `node --version`
2. Check AWS credentials: `echo $AWS_ACCESS_KEY_ID`
3. Verify ports (3001, 5001) not in use: `lsof -i :3001`

---

## 📄 License

MIT

---

## 🎯 Ready to Deploy?

**Next Step:** Open [EXECUTE_DEPLOYMENT_NOW.md](./EXECUTE_DEPLOYMENT_NOW.md)

**Expected Time:** 25 minutes

**Result:** A live, shareable agent URL ready for judges! 🚀

---

**Built with ❤️ for the Codebenders Hackathon**
