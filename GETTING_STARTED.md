# Getting Started with ContentPulse

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (version 16.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** for cloning the repository
- **AWS Account** with Bedrock API access enabled
- **AWS CLI** configured (optional, for credential management)

### Verify Prerequisites

```bash
# Check Node.js version (should be 16.0+)
node --version

# Check npm version
npm --version

# Verify git is installed
git --version
```

---

## Step-by-Step Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/ContentPulse.git
cd ContentPulse
```

### Step 2: Configure Environment Variables

Copy the example environment file and configure your AWS credentials:

```bash
cp .env.example .env
```

Edit `.env` file with your AWS credentials:

```env
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here

# Model Configuration
CLAUDE_MODEL=claude-3-5-sonnet-20241022
LLAMA_MODEL=llama3.1-8b-instruct

# Server Configuration
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**⚠️ Important Security Note:** Never commit the `.env` file to version control. It's already in `.gitignore`.

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
```

Expected output: Should install ~127 packages with 0 vulnerabilities.

### Step 4: Start the Backend Server

```bash
npm start
# or for development with auto-reload:
npm run dev
```

You should see:
```
Express server running on http://localhost:3001
Database cache initialized
Ready to accept requests
```

Leave this terminal running.

### Step 5: Install Frontend Dependencies (New Terminal)

Open a **new terminal** and navigate to the frontend:

```bash
cd frontend
npm install
```

Expected output: Should install ~1,301 packages (some vulnerabilities from react-scripts are expected).

### Step 6: Start the Frontend Development Server

```bash
npm start
```

The React app will automatically open in your browser at `http://localhost:3000`.

---

## Verifying Your Setup

### 1. Check Backend Health

Open a new terminal and run:

```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 2. Check Analytics Data

```bash
curl http://localhost:3001/analytics/summary
```

Expected response should include:
```json
{
  "summary": {
    "totalArticles": 420,
    "avgEngagementRate": 8.6,
    "totalConversions": 310
  }
}
```

### 3. Test Chat Endpoint

```bash
curl -X POST http://localhost:3001/agent/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is your name?",
    "sessionId": "test-session"
  }'
```

Expected response:
```json
{
  "response": "I'm Claude, your content analytics assistant...",
  "sessionId": "test-session",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 4. Verify Frontend Loads

Navigate to `http://localhost:3000` in your browser. You should see:
- ContentPulse dashboard with sidebar navigation
- Metrics cards showing 420 articles
- Performance trend chart
- Top topics list

---

## Testing All Endpoints with cURL

### Analytics Endpoints

**Get Full Analytics Data:**
```bash
curl http://localhost:3001/analytics/data
```

**Get Analytics Summary:**
```bash
curl http://localhost:3001/analytics/summary
```

**Get 14-Day Trends:**
```bash
curl http://localhost:3001/analytics/trends
```

### Agent Endpoints

**Chat with Llama (Conversational):**
```bash
curl -X POST http://localhost:3001/agent/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What'\''s our top performing topic?",
    "sessionId": "session-1"
  }'
```

**Generate Insights with Claude:**
```bash
curl -X POST http://localhost:3001/agent/insights \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Analyze our content performance and identify key trends"
  }'
```

**Generate Report with Claude:**
```bash
curl -X POST http://localhost:3001/agent/report \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Query Analytics:**
```bash
curl -X POST http://localhost:3001/agent/query \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "AI",
    "minEngagement": 5
  }'
```

---

## Sample Queries to Test the Agent

### Chat Queries (Llama 3.1)

Test these conversational queries in the Dashboard Chat panel:

1. **"What is our top performing topic?"**
   - Expected: Returns topic with highest engagement rate

2. **"How many articles were published this month?"**
   - Expected: Returns count and date range

3. **"Which authors produce the best converting content?"**
   - Expected: Lists top authors by conversion rate

4. **"Generate a summary of our AI content performance"**
   - Expected: Detailed analysis of AI topic metrics

5. **"What trends do you see in our data?"**
   - Expected: Identifies patterns and anomalies

### Insights Queries (Claude 3.5 Sonnet)

Test these analytical queries in the Insights panel:

1. **"Generate comprehensive insights about our content performance"**
   - Expected: Multi-paragraph analysis with recommendations

2. **"Which topics should we focus on?"**
   - Expected: Strategic recommendations based on data

3. **"Identify underperforming content areas"**
   - Expected: Analysis with improvement suggestions

### Report Generation

1. Click **"Generate Biweekly Report"** in the Reports panel
   - Expected: Professional report with metrics, analysis, and recommendations

---

## Troubleshooting

### Backend Won't Start

**Problem:** `Error: listen EADDRINUSE :::3001`

**Solution:** Port 3001 is already in use. Either:
- Stop the process using port 3001: `lsof -ti:3001 | xargs kill -9`
- Or change PORT in `.env` to a different port

---

### Missing AWS Credentials

**Problem:** `Error: The AWS Access Key ID provided does not exist`

**Solution:**
1. Verify your AWS credentials are correct in `.env`
2. Ensure your AWS account has Bedrock API access
3. Check that your IAM user has `bedrock:InvokeModel` permission

---

### Frontend Can't Connect to Backend

**Problem:** CORS error or blank dashboard

**Solution:**
1. Verify backend is running on port 3001: `curl http://localhost:3001/health`
2. Check browser console for error messages
3. Ensure CORS_ORIGIN in `.env` matches your frontend URL
4. Clear browser cache and hard refresh (Ctrl+Shift+R)

---

### Mock Data Not Loading

**Problem:** Dashboard shows 0 articles or empty metrics

**Solution:**
1. Backend must be running to generate mock data
2. Refresh the dashboard page: F5
3. Check browser console for API errors
4. Verify `/analytics/data` endpoint works with curl

---

## Next Steps

1. **Explore the Dashboard**
   - Navigate through all tabs (Overview, Performance, Insights, Reports)
   - Test data filtering and sorting

2. **Test the Chat Interface**
   - Ask various questions
   - Observe conversation history persistence
   - Try suggested quick questions

3. **Generate Insights**
   - Create custom insights queries
   - Compare Claude's analysis with your expectations

4. **Review Documentation**
   - Read FEATURES.md for detailed feature descriptions
   - Review ARCHITECTURE.md for system design
   - Check DEPLOYMENT.md for production deployment

5. **Deploy to Production** (When Ready)
   - Follow DEPLOYMENT.md for Docker or AWS deployment
   - Configure real AWS credentials
   - Set up monitoring and logging

---

## Development Tips

### Hot Reload

Both backend and frontend support hot reload:
- **Backend:** Automatically restarts on file changes (via nodemon)
- **Frontend:** React automatically refreshes on file changes

### Debugging

**Browser Console:**
- Open DevTools (F12) to see frontend errors
- Check Network tab for API calls

**Server Logs:**
- Backend logs appear in the terminal where you ran `npm start`
- Use `console.log()` for debugging agent responses

### Testing Workflow

```bash
# Terminal 1: Backend
cd backend && npm start

# Terminal 2: Frontend
cd frontend && npm start

# Terminal 3: Test endpoints
curl http://localhost:3001/health
```

---

## System Requirements Summary

| Component | Requirement |
|-----------|-------------|
| Node.js | 16.0+ |
| npm | 7.0+ |
| RAM | 2GB+ (1GB backend, 1GB frontend) |
| Disk Space | 500MB+ (node_modules) |
| AWS Account | Required for Bedrock API |
| OS | macOS, Linux, or Windows |

---

## Support & Resources

- **Issues?** Check the troubleshooting section above
- **More details?** See ARCHITECTURE.md for system design
- **Deployment?** See DEPLOYMENT.md for production setup
- **Features?** See FEATURES.md for complete feature list

---

**You're all set! 🚀 Start exploring ContentPulse at http://localhost:3000**
