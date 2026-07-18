# ContentPulse - Bedrock Agent

A production-ready content analytics platform powered by AWS Bedrock AI agents. ContentPulse combines Claude 3.5 Sonnet for deep analytics and insights with Llama 3.1 for conversational chat.

## 🚀 Features

- **AI-Powered Dashboard**: Real-time analytics with 420+ mock articles
- **Hybrid AI Models**: Claude 3.5 Sonnet + Llama 3.1 for optimal performance
- **Three Agent Tools**:
  - Query Analytics: Filter and explore content data
  - Generate Insights: AI-powered content analysis
  - Generate Reports: Executive, detailed, and summary reports
- **Interactive Chat**: Conversational AI interface for data exploration
- **Performance Trends**: 14-day trend analysis with Chart.js
- **Topic Breakdown**: Top performing topics with engagement metrics
- **React Frontend**: Full dashboard matching Figma wireframe
- **Express Backend**: RESTful API with Bedrock integration

## 📋 Project Structure

```
ContentPulse-Bedrock/
├── backend/
│   ├── package.json
│   ├── src/
│   │   ├── config.js          # AWS Bedrock configuration
│   │   ├── server.js          # Express server setup
│   │   ├── bedrockAgent.js    # Agent tools and request handling
│   │   └── mockData.js        # 420 articles with analytics data
│   └── .env                   # AWS credentials
│
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js             # Main app component
│       ├── index.js           # React entry point
│       ├── components/
│       │   ├── Sidebar.js
│       │   ├── Dashboard.js
│       │   ├── MetricsCards.js
│       │   ├── PerformanceTrend.js
│       │   ├── TopTopics.js
│       │   ├── InsightsPanel.js
│       │   ├── ChatPanel.js
│       │   └── ReportsPanel.js
│       └── styles/
│           ├── App.css
│           ├── Sidebar.css
│           ├── Dashboard.css
│           ├── MetricsCards.css
│           ├── PerformanceTrend.css
│           ├── TopTopics.css
│           ├── InsightsPanel.css
│           ├── ChatPanel.css
│           └── ReportsPanel.css
│
├── .env.example
└── README.md
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 16+ and npm
- AWS Account with Bedrock access
- AWS credentials configured

### Backend Setup

1. Navigate to backend directory:
```bash
cd ContentPulse-Bedrock/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp ../.env.example .env
```

4. Add your AWS credentials to `.env`:
```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
PORT=5000
```

5. Start the backend:
```bash
npm start
```

Backend runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd ContentPulse-Bedrock/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Frontend runs on `http://localhost:3000`

## 📡 API Endpoints

### Health & Data
- `GET /health` - Health check
- `GET /analytics/data` - Get all analytics data

### Agent Actions
- `POST /agent/chat` - Conversational chat with Llama 3.1
- `POST /agent/insights` - Generate AI insights with Claude 3.5
- `POST /agent/report` - Generate reports (summary/detailed/executive)
- `POST /agent/query` - Query analytics with filters
- `POST /agent/request` - Complex multi-step requests

### Request Examples

**Chat**
```bash
curl -X POST http://localhost:5000/agent/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What are my top topics?"}'
```

**Generate Insights**
```bash
curl -X POST http://localhost:5000/agent/insights \
  -H "Content-Type: application/json" \
  -d '{"query":"Analyze content performance"}'
```

**Generate Report**
```bash
curl -X POST http://localhost:5000/agent/report \
  -H "Content-Type: application/json" \
  -d '{"reportType":"executive"}'
```

**Query Analytics**
```bash
curl -X POST http://localhost:5000/agent/query \
  -H "Content-Type: application/json" \
  -d '{"filters":{"topic":"AI","minViews":10000}}'
```

## 🤖 AI Models

- **Claude 3.5 Sonnet** (`claude-3-5-sonnet-20241022`): Analysis, insights, and reports
- **Llama 3.1 8B** (`llama3.1-8b-instruct`): Conversational chat

## 📊 Mock Data

The system includes 420 realistic mock articles with:
- Topics: AI, Marketing, Finance, Cybersecurity, Productivity
- Metrics: Views, Engagement Rate, Conversions
- Daily trend data for 14 days
- Topic breakdown statistics

## 🎨 Frontend Components

- **Sidebar**: Navigation with 6 main sections
- **Dashboard**: Metrics overview, trend chart, top topics, AI insights
- **Chat Panel**: Real-time conversation with Llama 3.1
- **Reports Panel**: Generate and view AI-powered reports
- **Metrics Cards**: Key KPIs visualization
- **Performance Trend**: 14-day analytics chart
- **Topics Panel**: Top performing content topics
- **Insights Panel**: AI-generated content insights

## 🧪 Testing

### Backend Health Check
```bash
curl http://localhost:5000/health
```

### Frontend Components
All components are fully functional and tested:
- Sidebar navigation works
- Dashboard displays all metrics
- Chat accepts messages and gets responses
- Reports generate in 3 formats
- Charts render with real data

## 🚀 Deployment

### Backend (e.g., AWS Lambda, EC2)
```bash
npm install
export AWS_REGION=us-east-1
export AWS_ACCESS_KEY_ID=***
export AWS_SECRET_ACCESS_KEY=***
npm start
```

### Frontend (e.g., AWS S3 + CloudFront, Vercel)
```bash
npm run build
# Deploy the build/ directory to your hosting
```

## 📝 Environment Variables

```
# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret

# Server
PORT=5000
NODE_ENV=production

# Frontend
REACT_APP_API_URL=https://your-api.com
```

## 🔧 Development

### Run Backend with Watch
```bash
cd backend
npm run dev
```

### Run Frontend in Development
```bash
cd frontend
npm start
```

## 📦 Dependencies

### Backend
- `@aws-sdk/client-bedrock-runtime` - AWS Bedrock client
- `express` - Web framework
- `cors` - CORS middleware
- `dotenv` - Environment management
- `uuid` - ID generation

### Frontend
- `react` - UI library
- `react-dom` - React DOM
- `axios` - HTTP client
- `chart.js` - Charting library
- `react-chartjs-2` - React Chart.js wrapper

## 🤝 Contributing

This is a demonstration project. To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🎯 Next Steps

- [ ] Add user authentication
- [ ] Implement database persistence
- [ ] Add more visualization options
- [ ] Create mobile app
- [ ] Add export to PDF/Excel
- [ ] Implement alert system
- [ ] Add collaborative features

## 🆘 Troubleshooting

**Backend won't start:**
- Check AWS credentials in `.env`
- Ensure AWS Bedrock is available in your region
- Verify Node.js is installed: `node --version`

**Frontend can't connect to backend:**
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend
- Check browser console for CORS errors

**AI responses are slow:**
- Bedrock API may have latency
- Check your AWS region
- Verify network connection

## 📞 Support

For issues or questions:
1. Check the README
2. Review API documentation
3. Check CloudWatch logs
4. Verify AWS Bedrock setup

---

Built with ❤️ using AWS Bedrock, Claude, Llama, React, and Express
