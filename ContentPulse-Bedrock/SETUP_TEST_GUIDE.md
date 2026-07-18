# ContentPulse Bedrock Agent - Setup & Test Guide

## Current Status
✅ Backend code: Configured for AWS Bedrock
✅ Frontend code: Ready with React dashboard
✅ Mock data: 420 articles with analytics
✅ Models: Claude 4.5 Sonnet + Llama 3.1 8B configured
✅ AWS credentials: Added to `.env`

## Next Steps to Complete Setup

### Step 1: Restart Backend (BLOCKING - AWAITING YOUR EXECUTION)

**In your first terminal:**
```bash
cd ContentPulse-Bedrock/backend
Ctrl + C  # Stop current backend
npm start
```

**Expected Output:**
```
🚀 ContentPulse Bedrock Agent Backend running on http://localhost:5001
📊 Health check: GET /health
📈 Analytics data: GET /analytics/data
💬 Chat: POST /agent/chat
🔍 Insights: POST /agent/insights
📄 Report: POST /agent/report
🤖 Complex request: POST /agent/request
🔎 Query analytics: POST /agent/query
```

### Step 2: Test Backend (BLOCKING - AWAITING YOUR EXECUTION)

**In your second terminal:**
```bash
cd ContentPulse-Bedrock/backend
bash test_agent.sh
```

Or run individual tests:

**Test 1: Health Check**
```bash
curl http://localhost:5001/health
```

**Test 2: Analytics Data**
```bash
curl http://localhost:5001/analytics/data | head -c 500
```

**Test 3: Chat with Llama (wait 10-15 seconds)**
```bash
curl -X POST http://localhost:5001/agent/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What are my top performing topics?"}'
```

**Test 4: Claude Insights (wait 10-15 seconds)**
```bash
curl -X POST http://localhost:5001/agent/insights \
  -H "Content-Type: application/json" \
  -d '{"query":"Analyze my content performance"}'
```

Expected response format:
```json
{
  "success": true,
  "insights": "Claude's analysis here...",
  "timestamp": "2026-07-18T..."
}
```

### Step 3: Start Frontend (After Backend Tests Pass)

**In your third terminal:**
```bash
cd ContentPulse-Bedrock/frontend
npm install
npm start
```

Frontend will open at: `http://localhost:3000`

### Step 4: Verify Frontend

The dashboard should show:
- ✅ 4 metric cards (Total Articles, Engagement Rate, Conversions, Views)
- ✅ 14-day performance trend chart
- ✅ Top 5 topics list
- ✅ Chat panel on the right
- ✅ Insights and Reports tabs

## Troubleshooting

**If backend doesn't start:**
- Check `.env` file has correct AWS credentials
- Ensure port 5001 is not in use: `lsof -i :5001`
- Check Node version: `node --version` (need v18+)

**If curl tests fail with "Unexpected field type":**
- Backend has been restarted with new code
- Models are properly configured
- AWS credentials are valid

**If frontend won't connect to backend:**
- Check API_BASE_URL is set to `http://localhost:5001` in App.js
- Backend must be running first
- Check browser console for CORS errors

## What's Included

- **Backend**: Express.js server with Bedrock integration
- **Frontend**: React dashboard with chat, analytics, and reports
- **Models**: Claude 4.5 Sonnet for analysis, Llama 3.1 8B for chat
- **Data**: 420 mock articles with realistic metrics
- **API Endpoints**: 7 endpoints for all agent operations

## Ready to Test!

**YOU MUST EXECUTE:**
1. Restart backend with `npm start`
2. Run the test script: `bash test_agent.sh`
3. Share the complete output here

⏳ **I am waiting for your terminal output to verify the fixes work.** ⏳
