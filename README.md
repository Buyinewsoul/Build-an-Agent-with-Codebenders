# ContentPulse - AI-Powered Content Analytics with AWS Bedrock

A complete full-stack application featuring a content analytics dashboard with AI-powered insights, powered by AWS Bedrock models (Claude 3.5 Sonnet and Llama 3.1).

## Overview

ContentPulse combines a beautiful React dashboard with a conversational AI chat interface to provide intelligent content analytics. The application features:

- **Dashboard**: Real-time content metrics, performance trends, and topic analysis
- **AI Insights**: Claude-powered deep analysis and recommendations
- **Biweekly Reports**: Automated report generation with actionable insights
- **Chat Interface**: Conversational queries via Llama 3.1

## Architecture

```
ContentPulse/
├── backend/
│   ├── src/
│   │   ├── server.js              # Express.js REST API
│   │   └── bedrockAgent.js        # Bedrock agent with tools
│   ├── data/
│   │   └── mockData.js            # Mock analytics data generator
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── Sidebar.js
│   │   │   ├── ChatPanel.js
│   │   │   ├── MetricsCards.js
│   │   │   ├── PerformanceTrend.js
│   │   │   ├── TopTopics.js
│   │   │   ├── InsightsPanel.js
│   │   │   └── ReportsPanel.js
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
├── .env.example
└── README.md
```

## Features

### 1. Dashboard (Overview Tab)
- **Metrics Cards**: Total articles (420), Total views, Avg engagement rate, Total conversions
- **Performance Trend**: 14-day chart showing views and engagement over time
- **Top Performing Topics**: Ranked list of content topics by performance

### 2. Performance Tab
- Detailed performance trend chart
- Article table with filtering capabilities
- Real-time metrics display

### 3. Insights Tab (Claude 3.5 Sonnet)
- Query-based insight generation
- AI-powered analysis of content performance
- Recommendations and trend identification

### 4. Reports Tab (Claude 3.5 Sonnet)
- Automated biweekly report generation
- Executive summary with key metrics
- Top performer analysis
- Actionable recommendations
- Report download as text file

### 5. Chat Interface (Llama 3.1)
- Conversational Q&A about content analytics
- Real-time response streaming
- Conversation history per session
- Suggested quick questions

## Setup Instructions

### Prerequisites

1. **AWS Account** with Bedrock access
2. **AWS CLI** configured with credentials
3. **Node.js** 14+ and npm/yarn
4. **Git**

### Environment Setup

1. Clone the repository and navigate to the root directory

2. **Copy and configure environment variables:**
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env` and add your AWS credentials:**
   ```
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your_access_key_here
   AWS_SECRET_ACCESS_KEY=your_secret_key_here
   CLAUDE_MODEL=claude-3-5-sonnet-20241022
   LLAMA_MODEL=llama3.1-8b-instruct
   PORT=3001
   ```

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. **In a new terminal, navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

The frontend will open at `http://localhost:3000`

## API Endpoints

### Analytics
- `GET /health` - Health check
- `GET /analytics/data` - Fetch all analytics data with mock articles
- `GET /analytics/summary` - Get quick summary metrics
- `GET /analytics/trends` - Get 14-day trend data

### Agent
- `POST /agent/chat` - Chat with Llama (conversational)
  ```json
  {
    "message": "What's our top performing topic?",
    "sessionId": "optional-session-id"
  }
  ```

- `POST /agent/insights` - Generate Claude insights
  ```json
  {
    "query": "Generate overall content performance insights"
  }
  ```

- `POST /agent/report` - Generate biweekly report
  ```json
  {}
  ```

- `POST /agent/query` - Query analytics with filters
  ```json
  {
    "topic": "AI",
    "dateRange": ["2024-01-01", "2024-12-31"],
    "metric": "views"
  }
  ```

## Mock Data

The application generates 420 articles with:
- **Topics**: AI, Marketing, Finance, Cybersecurity, Productivity, Cloud, DevOps, Web3
- **Metrics**: Views (1K-50K), Engagement Rate (2-17%), Conversions (calculated from engagement)
- **Dates**: Last 90 days from current date
- **Authors**: 20 different authors

The mock data is regenerated on each server start, ensuring fresh data for testing.

## Testing Sample Queries

### Chat (Llama)
1. "What's our top performing topic?"
2. "How's engagement trending this week?"
3. "Which topics need improvement?"
4. "Give me a quick performance summary"

### Insights (Claude)
1. "Generate overall content performance insights"
2. "Analyze AI content performance"
3. "What are our key success factors?"
4. "Identify content gaps and opportunities"

### Reports (Claude)
1. Generate biweekly report with all metrics and recommendations

## Key Technologies

### Backend
- **Express.js**: REST API framework
- **AWS SDK for JavaScript**: Bedrock integration
- **Node.js**: Runtime

### Frontend
- **React**: UI framework
- **CSS3**: Styling with gradients and animations
- **Fetch API**: HTTP client

### AI Models
- **Claude 3.5 Sonnet**: Deep analysis, insights, and reports
- **Llama 3.1 8B**: Conversational chat and real-time responses

## File Structure Summary

### Backend Files
- `backend/src/server.js` - Express server with routes
- `backend/src/bedrockAgent.js` - Bedrock integration and AI models
- `backend/data/mockData.js` - Mock data generation
- `backend/package.json` - Dependencies

### Frontend Components
- `frontend/src/App.js` - Main component
- `frontend/src/components/Dashboard.js` - Dashboard tabs
- `frontend/src/components/Sidebar.js` - Navigation sidebar
- `frontend/src/components/ChatPanel.js` - Chat interface
- `frontend/src/components/MetricsCards.js` - Metrics display
- `frontend/src/components/PerformanceTrend.js` - Trend chart
- `frontend/src/components/TopTopics.js` - Topic rankings
- `frontend/src/components/InsightsPanel.js` - AI insights
- `frontend/src/components/ReportsPanel.js` - Report generation

### Styles
- `frontend/src/styles/App.css` - Global styles
- `frontend/src/styles/Dashboard.css` - Dashboard styling
- `frontend/src/styles/ChatPanel.css` - Chat interface styling
- Individual component styles for each feature

## Troubleshooting

### Backend Won't Start
- Check AWS credentials in `.env`
- Ensure Bedrock models are available in your region
- Verify Node.js version is 14+

### Frontend Can't Connect to Backend
- Verify backend is running on port 3001
- Check CORS is enabled in Express
- Check browser console for specific errors

### No Response from Bedrock Models
- Verify AWS credentials have Bedrock permissions
- Check that Claude and Llama models are available
- Review CloudWatch logs for Bedrock errors

### Mock Data Not Generating
- Ensure `mockData.js` is in `backend/data/`
- Check Node.js version compatibility
- Verify all dependencies installed

## Performance Considerations

- Dashboard loads mock data on mount (420 articles)
- Chat history limited to 20 messages per session
- Bedrock API calls may take 2-5 seconds depending on load
- Frontend caches analytics data after initial load

## Security Notes

- Never commit `.env` file with real credentials
- Use IAM roles in production instead of access keys
- Implement authentication in production
- Rate limit API endpoints
- Validate all user inputs

## Future Enhancements

1. Database integration for real analytics data
2. User authentication and multi-tenant support
3. Advanced filtering and search
4. Export to PDF and Excel
5. Real-time WebSocket updates
6. Performance optimization with caching
7. Analytics data persistence
8. Custom date range selection
9. Advanced charting with ChartJS
10. Mobile-responsive improvements

## Support

For issues or questions:
1. Check CloudWatch logs for Bedrock errors
2. Verify AWS credentials and permissions
3. Review browser console for frontend errors
4. Check backend server logs for API issues

## License

MIT License - Feel free to use this project for learning and development.
