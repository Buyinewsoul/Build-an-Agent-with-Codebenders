# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Setup Environment

```bash
# Copy environment template
cp .env.example backend/.env

# Edit backend/.env with your AWS credentials
nano backend/.env
# OR
code backend/.env  # If using VS Code
```

Add your AWS credentials:
```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key_here
AWS_SECRET_ACCESS_KEY=your_secret_here
PORT=5000
```

### 2. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in another terminal)
cd frontend
npm install
```

Or use the setup script:
```bash
chmod +x setup.sh
./setup.sh
```

### 3. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

Output should show:
```
🚀 ContentPulse Bedrock Agent Backend running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Output should show:
```
Compiled successfully!
You can now view contentpulse-bedrock-frontend in the browser.
  Local:            http://localhost:3000
```

### 4. Test the Application

Open your browser and visit:
- **Dashboard**: http://localhost:3000
- **Backend Health**: http://localhost:5000/health

### 5. Try the Features

**In the UI:**
- View dashboard metrics and trends
- Click "💡 Insights Panel" to generate AI insights
- Click "💬 Chat" to talk with the AI
- Click report buttons to generate PDF reports

**Via API (using curl):**

```bash
# Test backend health
curl http://localhost:5000/health

# Get analytics data
curl http://localhost:5000/analytics/data

# Chat with AI
curl -X POST http://localhost:5000/agent/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What are my top performing topics?"}'

# Generate insights
curl -X POST http://localhost:5000/agent/insights \
  -H "Content-Type: application/json" \
  -d '{"query":"Analyze my content performance"}'

# Generate report
curl -X POST http://localhost:5000/agent/report \
  -H "Content-Type: application/json" \
  -d '{"reportType":"executive"}'
```

## 📊 What's Included

- ✅ 420 mock articles with realistic metrics
- ✅ Dashboard with 4 key metrics
- ✅ 14-day performance trend chart
- ✅ Top 5 performing topics
- ✅ AI-powered insights panel
- ✅ Conversational chat interface
- ✅ 3 report formats (summary, detailed, executive)
- ✅ Responsive design (desktop, tablet, mobile)

## 🔧 Troubleshooting

### Backend won't start
```
Error: Cannot find module '@aws-sdk/client-bedrock-runtime'
```
**Solution:** Run `npm install` in backend directory

### Frontend can't connect to backend
```
Error: Failed to load analytics data
```
**Solutions:**
- Check backend is running on port 5000
- Check `REACT_APP_API_URL` is set to `http://localhost:5000`
- Check browser console for CORS errors

### AWS credentials error
```
Error: Missing credentials in configuration
```
**Solution:** 
- Check `.env` file exists in backend directory
- Verify AWS credentials are correct
- Ensure AWS Bedrock is available in your region (us-east-1, us-west-2, eu-central-1)

## 🎯 Next Steps

1. **Customize Mock Data**: Edit `backend/src/mockData.js` to use your own data
2. **Add Authentication**: Implement user login
3. **Connect Real Database**: Replace mock data with actual database
4. **Deploy**: Push to AWS, Vercel, Heroku, etc.
5. **Add Features**: Custom metrics, alerts, webhooks, etc.

## 📚 Documentation

- Full docs: See `README.md`
- API docs: See endpoint descriptions in `backend/src/server.js`
- Component docs: See component files in `frontend/src/components/`

## 🤝 Getting Help

1. Check terminal error messages
2. Review `README.md` troubleshooting section
3. Check AWS Bedrock documentation
4. Verify environment variables

---

Happy analyzing with ContentPulse! 🚀📊
